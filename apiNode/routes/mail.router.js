// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import mailC from "../controllers/mail.controller.js";

var router = express.Router()

router.post("/", mailC.sendEMail)


export default router;