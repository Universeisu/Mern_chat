import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

server.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
  connectDB();
});
