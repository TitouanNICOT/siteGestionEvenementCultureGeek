import express from "express";
import standController from "../controllers/stand.controller.js";
import evenementController from "../controllers/evenement.controller.js";

var router = express.Router()
router.get("/typeStand",standController.listeTypeStand)

router.get("/",standController.listStand)
router.post("/",standController.newStand)
router.delete("/:id",standController.deleteStand)

//route a faire avec swagger
//utilise aussi la table commantaire
router.get("/:id",standController.getStand)
router.post("/:id/commentaire",standController.newCommentaire)


export default router;