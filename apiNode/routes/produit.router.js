// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import produitC from "../controllers/produit.controller.js";

var router = express.Router()
router.get("/listTypeProduit",produitC.listTypeProduit)

router.get("/",produitC.list)
router.get("/:id",produitC.getProduitById)
router.post("/",produitC.newProduit)
router.put("/",produitC.modifProduit)
router.delete("/:id",produitC.deleteProduit)

export default router;