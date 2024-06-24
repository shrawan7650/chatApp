import express from "express";
import { Login, Signup, getAllUsers, getProfile, logout } from "../controller/userController.js";
import { verifyToken } from "../middlewear/authMiddlewear.js";
const routes = express.Router();

routes.post("/signup", Signup);
routes.post("/login", Login);
routes.get("/profile", verifyToken, getProfile);
routes.get("/alluser",verifyToken, getAllUsers);
routes.post("/logout", logout);

export default routes;
