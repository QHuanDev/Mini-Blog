import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import connectDB from "./src/config/connectDB.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.API_FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
