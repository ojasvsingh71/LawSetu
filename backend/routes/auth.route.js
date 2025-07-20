import express from 'express'
import authController from "../controller/auth.controller.js";

const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/reset-password", authController.reset_pass);

export default route;