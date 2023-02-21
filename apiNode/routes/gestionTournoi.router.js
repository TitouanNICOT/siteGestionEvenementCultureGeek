import express from "express";
import {add,deleteTournoi,editTournoiInfos ,createTournoi, modifStatus,deleteUser,genereArbre, generationTournoi, majTourTounois,listById} from "../controllers/gestionTournoi.controller.js";


const router = express.Router();
router.get("/:idTournoi",genereArbre)

router.post("/:idTournoi",generationTournoi)

router.get("/maj/:idTour", majTourTounois)

router.get("/getById/:id", listById)

router.post("/", add)

router.post("/tournoi/create", createTournoi)

router.delete("/:idTournoi/:idUser", deleteUser)

router.patch("/:id/status", modifStatus)

router.delete("/:id", deleteTournoi)

router.patch("/:id", editTournoiInfos)

export default router;