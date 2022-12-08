// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import evenementController from "../controllers/evenement.controller.js";

var router = express.Router()
router.get("/listTypeEvenement",evenementController.listTypeEvenement)

router.get("/",evenementController.list)
router.get("/:id",evenementController.getEvenementById)
router.post("/",evenementController.newEvenement)
router.put("/",evenementController.modifEvenement)
router.delete("/:id",evenementController.deleteEvenement)


export default router;