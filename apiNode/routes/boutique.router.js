import express from "express";
import boutiqueController from "../controllers/boutique.controller.js";

const router = express.Router();
router.get("/:idStand", boutiqueController.getBoutiqueByIdStand);


export default router;