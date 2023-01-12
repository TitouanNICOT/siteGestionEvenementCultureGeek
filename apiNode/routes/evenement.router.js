// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import evenementController from "../controllers/evenement.controller.js";

var router = express.Router()
router.get("/listTypeEvenement", evenementController.listTypeEvenement)
/**
 * @swagger
 * /evenements/listTypeEvenement/:
 *  get:
 *      description: Liste touts les types d'evenement
 *      tags:
 *          - Evenements
 *      responses:
 *          '200':
 *              description: type d'évenement retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des types d'evenements
 */

router.get("/", evenementController.list)
/**
 * @swagger
 * /evenements/:
 *  get:
 *      description: Liste touts les evenements
 *      tags:
 *          - Evenements
 *      responses:
 *          '200':
 *              description: Evenements retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des évenements
 */

router.get("/:id", evenementController.getEvenementById)
/**
 * @swagger
 * /evenements/{id}:
 *  get:
 *      description: Retourne l'evenement ayant l'id correspondant à celui du path
 *      tags:
 *          - Evenements
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Evenement retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi de l'evenement
 */

router.post("/", evenementController.newEvenement)
/**
 * @swagger
 * /evenements/:
 *  post:
 *      description: Ajoute un evenement dans la base de données
 *      tags:
 *          - Evenements
 *      parameters:
 *          - in: formData
 *            name: libelleEvenement
 *            type: string
 *            required: true
 *          - in: formData
 *            name: heureDebut
 *            description: format 'YYYY-MM-DD hh:mm:ss'
 *            type: string
 *            required: true
 *          - in: formData
 *            name: heureFin
 *            description: format 'YYYY-MM-DD hh:mm:ss'
 *            type: string
 *            required: true
 *          - in: formData
 *            name: idTypeEvenement
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: idStand
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Evenement ajouté avec succés
 *          '404':
 *              description: Erreur lors de l'ajout de l'evenement
 */

router.put("/", evenementController.modifEvenement)
/**
 * @swagger
 * /evenements/:
 *  put:
 *      description: Modifie les données d'un événement
 *      tags:
 *          - Evenements
 *      parameters:
 *          - in: formData
 *            name: id
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: libelleEvenement
 *            type: string
 *            required: true
 *          - in: formData
 *            name: heureDebut
 *            description: format 'YYYY-MM-DD hh:mm:ss'
 *            type: string
 *            required: true
 *          - in: formData
 *            name: heureFin
 *            description: format 'YYYY-MM-DD hh:mm:ss'
 *            type: string
 *            required: true
 *          - in: formData
 *            name: idTypeEvenement
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: idStand
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Evenement modifié avec succés
 *          '404':
 *              description: Erreur lors de la modification de l'evenement
 */

router.delete("/:id", evenementController.deleteEvenement)
/**
 * @swagger
 * /evenements/{id}:
 *  delete:
 *      description: Supprime un événement de la base de données
 *      tags:
 *          - Evenements
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Evenement supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression de l'evenement
 */

export default router;