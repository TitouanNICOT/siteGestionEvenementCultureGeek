// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import usersC from "../controllers/user.controller.js";

var router = express.Router()

router.get("/",usersC.list)
router.get("/:id",usersC.getUser)
router.post("/",usersC.newUser)
router.put("/",usersC.modifUser)
router.delete("/:id",usersC.deleteUser)

export default router;