import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', allRoutes);

// error handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "internal server error"; 

    return res.status(status).json({ message, stack: err.stack});
});

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://shashwatpandeyy:ashleysexyback@todoapp.abl4tfl.mongodb.net/?retryWrites=true&w=majority");
        console.log("MongoDB connected");
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})