import express from "express";
import loginController from "../controllers/login.controller.js";

const router=express.Router();

router.post("/login",loginController.login)

export default router;