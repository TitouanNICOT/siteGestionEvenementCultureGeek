import express from "express";
import {listAllParticipant,listParticipantById,deleteParticipant,addParticipant} from "../controllers/gestionParticipant.controller.js";

const router = express.Router();

router.all("/allParticipant", listAllParticipant);

router.get("/listParticipantById/:id", listParticipantById);

router.delete("/deleteParticipant/:idUser/:idTournoi", deleteParticipant);

router.post("/addParticipant", addParticipant);

export default router;