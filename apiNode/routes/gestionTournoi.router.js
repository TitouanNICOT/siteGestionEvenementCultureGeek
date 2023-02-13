import express from "express";
import {genereArbre, generationTournoi, majTourTounois} from "../controllers/gestionTournoi.controller.js";

const router = express.Router();
router.get("/:idTournoi",genereArbre)

router.post("/:idTournoi",generationTournoi)

router.get("/maj/:idTour", majTourTounois)

export default router;