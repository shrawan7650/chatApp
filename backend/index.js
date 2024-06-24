import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/DataBaseConnection.js";
import userroutes from "./route/userRoute.js";
import messageRoutes from './route/messageRoute.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
 import { app ,server} from "./SocketIo/server.js";
dotenv.config();
const port = process.env.PORT || 4000;

//routes declaration and middlewear

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin to your frontend URL

    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(morgan());
app.use("/api/user", userroutes);

app.use("/api/message", messageRoutes);

app.get("/", (req, res) => res.send("My First Chat Application"));
server.listen(port, () => console.log(`Example app listening on port ${port}!`));

connectDb();
