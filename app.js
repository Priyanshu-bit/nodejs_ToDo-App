import express from "express";
import userRouter from "./Routes/user.js";
import taskRouter from "./Routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});
app.use(express.json());
app.use(cookieParser());
let frontendURL = 'http://localhost:5173'; // Update this to your actual frontend URL

app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true // Enable sending cookies in the request (if needed)
  })
);


app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.cookie("testCookie", "This is a test cookie!", { maxAge: 900000, httpOnly: true });
  res.send("Nice working");
});

app.get("/set-test-cookie", (req, res) => {
  res.cookie("testCookie", "This is a test cookie!", { maxAge: 900000, httpOnly: true });
  res.send("Test cookie set successfully!");
});


app.use(errorMiddleware);
