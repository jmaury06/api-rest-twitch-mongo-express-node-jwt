import "dotenv/config";
import "./database/connectDB.js";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.use(express.json());
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("listening on port  http://localhost:" + PORT)
);
