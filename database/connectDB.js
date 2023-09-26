import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('connect DB OK')
} catch (error) {
    console.log('Error de conexión a mongo db' + error)
}