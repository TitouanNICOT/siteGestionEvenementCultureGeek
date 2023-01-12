// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import produitC from "../controllers/produit.controller.js";

var router = express.Router()
router.get("/listTypeProduit", produitC.listTypeProduit)
/**
 * @swagger
 * /produits/listTypeProduit/:
 *  get:
 *      description: Liste touts les types de produits
 *      tags:
 *          - Produits
 *      responses:
 *          '200':
 *              description: Type de produits retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des types de produits
 */

router.get("/", produitC.list)
/**
 * @swagger
 * /produits/:
 *  get:
 *      description: Liste touts les produits
 *      tags:
 *          - Produits
 *      responses:
 *          '200':
 *              description: Produits retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des produits
 */

router.get("/:id", produitC.getProduitById)
/**
 * @swagger
 * /produits/{id}:
 *  get:
 *      description: Retourne le produit ayant l'id correspondant à celui du path
 *      tags:
 *          - Produits
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Produit retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi du produit
 */

router.post("/", produitC.newProduit)
/**
 * @swagger
 * /produits/:
 *  post:
 *      description: Ajoute un produit dans la base de données
 *      tags:
 *          - Produits
 *      parameters:
 *          - in: formData
 *            name: libelleProduit
 *            type: string
 *            required: true
 *          - in: formData
 *            name: descriptionProduit
 *            type: string
 *            required: true
 *          - in: formData
 *            name: prix
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: imageProduit
 *            type: string
 *            required: true
 *      responses:
 *          '200':
 *              description: Produit ajouté avec succés
 *          '404':
 *              description: Erreur lors de l'ajout du produit
 */

router.put("/", produitC.modifProduit)
/**
 * @swagger
 * /produits/:
 *  put:
 *      description: Modifie les données d'un produit
 *      tags:
 *          - Produits
 *      parameters:
 *          - in: formData
 *            name: id
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: libelleProduit
 *            type: string
 *            required: true
 *          - in: formData
 *            name: descriptionProduit
 *            type: string
 *            required: true
 *          - in: formData
 *            name: prix
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: imageProduit
 *            type: string
 *            required: true
 *      responses:
 *          '200':
 *              description: Produit modifié avec succés
 *          '404':
 *              description: Erreur lors de la modification du produit
 */

router.delete("/:id", produitC.deleteProduit)
/**
 * @swagger
 * /produits/{id}:
 *  delete:
 *      description: Supprime un produit de la base de données
 *      tags:
 *          - Produits
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Produits supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression du produit
 */

export default router;