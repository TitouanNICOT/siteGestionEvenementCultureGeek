import express from "express";
import standController from "../controllers/stand.controller.js";

var router = express.Router()
router.get("/",standController.listStand)
router.post("/",standController.newStand)


export default router;