import express from "express";


import { getMessage, sendMessage } from "../controller/messageController.js";
import { verifyToken } from "../middlewear/authMiddlewear.js";
const routes = express.Router();

routes.post("/messagesend/:id",verifyToken, sendMessage);
routes.get("/getmessage/:id",verifyToken, getMessage);


export default routes;
