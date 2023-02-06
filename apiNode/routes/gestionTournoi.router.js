import express from "express";
import {genereArbre,generationTournoi} from "../controllers/gestionTournoi.controller.js";

const router = express.Router();
router.get("/",genereArbre)

router.post("/",generationTournoi)

export default router;