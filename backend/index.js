import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config()

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));