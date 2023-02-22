import express from "express";
import mailC from "../controllers/mail.controller.js";

const router = express.Router();

router.post("/", mailC.sendEMail)

router.post("/notification", mailC.sendNotification)

export default router;
