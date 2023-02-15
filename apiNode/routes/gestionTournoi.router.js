import express from "express";
import {add,deleteUser,genereArbre, generationTournoi, majTourTounois,listById} from "../controllers/gestionTournoi.controller.js";

const router = express.Router();
router.get("/:idTournoi",genereArbre)

router.post("/:idTournoi",generationTournoi)

router.get("/maj/:idTour", majTourTounois)

router.get("/getById/:id", listById)

router.post("/", add)

router.delete("/:idTournoi/:idUser", deleteUser)

export default router;