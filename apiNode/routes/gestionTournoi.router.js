import express from "express";
import {genereArbre,generationTournoi} from "../controllers/gestionTournoi.controller.js";

const router = express.Router();
router.get("/:idTournoi",genereArbre)

router.post("/:idTournoi",generationTournoi)

export default router;