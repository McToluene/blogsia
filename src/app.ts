import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/users";
import authRouter from "./routes/auth";
import profileRoutes from "./routes/profile";
import postRoutes from "./routes/posts";
import categoryRoutes from "./routes/category";
import configPassport from "./config/passport";
import cors from "cors";

const app = express();

// SETTING PORT
const PORT: string | number = process.env.PORT || 5000;
app.set("port", PORT);

// ser cros origin
app.use(cors());

// CONNECT TO DB
connectDB();

// Init Middleware
app.use(express.json());

// Using passport
configPassport(app);

// APP ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);

export default app;
