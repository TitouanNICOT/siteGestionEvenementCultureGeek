// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import usersC from "../controllers/user.controller.js";
import standController from "../controllers/stand.controller.js";

var router = express.Router()
router.get("/listRoles", usersC.listRole)
/**
 * @swagger
 * /users/listRoles/:
 *  get:
 *      description: Liste touts les rôles
 *      tags:
 *          - Rôles
 *      responses:
 *          '200':
 *              description: Rôles retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des rôles
 */

router.get("/", usersC.list)
/**
 * @swagger
 * /users/:
 *  get:
 *      description: Liste touts les utilisateurs
 *      tags:
 *          - Users
 *      responses:
 *          '200':
 *              description: Utilisateurs retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des utilisateurs
 */

router.get("/:id", usersC.getUserById)
/**
 * @swagger
 * /users/{id}:
 *  get:
 *      description: Retourne l'utilisateur ayant l'id correspondant à celui du path
 *      tags:
 *          - Users
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Utilisateur retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi de l'utilisateur
 */

router.get("/:id/commentaire", usersC.getAllCommentaire)
/**
 * @swagger
 * /users/{id}/commentaire:
 *  get:
 *     description: retourne tous les commentaires de tous les stands d'un prestataire
 *     summary: Route non triviale
 *     tags:
 *       - Users
 *     parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *     responses:
 *          '200':
 *              description: Utilisateur supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression de l'utilisateur
 *
 */

router.post("/", usersC.newUser)
/**
 * @swagger
 * /users/:
 *  post:
 *      description: Ajoute un utilisateur dans la base de données
 *      tags:
 *          - Users
 *      parameters:
 *          - in: formData
 *            name: nom
 *            type: string
 *            required: true
 *          - in: formData
 *            name: prenom
 *            type: string
 *            required: true
 *          - in: formData
 *            name: pseudo
 *            type: string
 *            required: true
 *          - in: formData
 *            name: password
 *            type: string
 *            required: true
 *          - in: formData
 *            name: email
 *            type: string
 *          - in: formData
 *            name: isNotif
 *            type: boolean
 *            value: true
 *            required: true
 *          - name: idRole
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Utilisateur ajouté avec succés
 *          '404':
 *              description: Erreur lors de l'ajout de l'utilisateur
 */

router.put("/", usersC.modifUser)
/**
 * @swagger
 * /users/:
 *  put:
 *      description: Modifie les données d'un utilisateur
 *      tags:
 *          - Users
 *      parameters:
 *          - in: formData
 *            name: id
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: nom
 *            type: string
 *            required: true
 *          - in: formData
 *            name: prenom
 *            type: string
 *            required: true
 *          - in: formData
 *            name: pseudo
 *            type: string
 *            required: true
 *          - in: formData
 *            name: password
 *            type: string
 *            required: true
 *          - in: formData
 *            name: email
 *            type: string
 *          - in: formData
 *            name: isNotif
 *            type: boolean
 *            required: true
 *          - in: formData
 *            name: idRole
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Utilisateur modifié avec succés
 *          '404':
 *              description: Erreur lors de la modification de l'utilisateur
 */

router.delete("/:id", usersC.deleteUser)
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      description: Supprime un utilisateur de la base de données
 *      tags:
 *          - Users
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Utilisateur supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression de l'utilisateur
 */


export default router;