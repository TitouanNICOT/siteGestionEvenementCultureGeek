import express from "express";
import {genereArbre} from "../controllers/gestionTournoi.controller.js";

const router = express.Router();
router.get("/",genereArbre)

export default router;