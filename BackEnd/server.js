import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./router/noteRouter.js";
import authUser from "./middleware/authUser.js";
import userRouter from "./router/userRoutes.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use(authUser);
app.use("/api/notes", notesRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
    process.exit(1);
  });
