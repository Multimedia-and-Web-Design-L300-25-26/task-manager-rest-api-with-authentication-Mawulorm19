import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.use("/api/auth", authRoutes);
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database connection failed", err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});