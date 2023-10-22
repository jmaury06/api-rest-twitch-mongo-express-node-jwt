import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salta = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salta);
    next();
  } catch (err) {
    console.log(err);
    throw new Error("falló el hash de password");
  }
});

userSchema.methods.ComparePasswords = async function (currentPassword) {
  return await bcryptjs.compare(currentPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
