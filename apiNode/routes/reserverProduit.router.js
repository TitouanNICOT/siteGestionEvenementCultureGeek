// const express = require("express")
// const usersC = require("../controllers/user.controller")
import express from "express";
import reserverProd from "../controllers/reserverProduit.controller.js";

var router = express.Router()
router.get("/",reserverProd.list)
/**
 * @swagger
 * /reservations/:
 *  get:
 *      description: Liste toutes les réservations de produits
 *      tags:
 *          - Reservation
 *      responses:
 *          '200':
 *              description: Réservations de produits retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des réservations de produits
 */

router.get("/:id",reserverProd.getReservationProduitById)
/**
 * @swagger
 * /reservations/{id}:
 *  get:
 *      description: Retourne la réservations de produits ayant l'id correspondant
 *      tags:
 *          - Reservation
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Réservation de produits retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi de la réservation de produits
 */

router.get('/user/:idUser',reserverProd.getReservationProduitByUser);
/**
 * @swagger
 * /reservations/user/{idUser}:
 *  get:
 *      description: Retourne toutes les réservations d'un utilisateur avec l'id correspondant
 *      tags:
 *          - Reservation
 *      parameters:
 *          - in: path
 *            name: idUser
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Réservation de produits concernant l'utilisateur retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi de la réservation de produits concernant l'utilisateur
 */

router.get("/prestataire/:idPresta",reserverProd.getReservationProduitByPrestataire)
/**
 * @swagger
 * /reservations/prestataire/{idPresta}:
 *  get:
 *    description: Retourne la liste des réservations de produits de tous les stands d'un prestataire
 *    tags:
 *      - Reservation
 *    parameters:
 *        - in: path
 *          name: idPresta
 *          type: integer
 *          required: true
 *    responses:
 *          '200':
 *              description: Réservation de produits concernant le produit retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi de la réservation de produits concernant le produit
 */

router.get('/produit/:idProduit',reserverProd.getReservationProduitByProduit);
/**
 * @swagger
 * /reservations/produit/{idProduit}:
 *  get:
 *      description: Retourne toutes les réservations du produit avec l'id correspondant
 *      summary: Route non triviale
 *      tags:
 *          - Reservation
 *      parameters:
 *          - in: path
 *            name: idProduit
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Réservation de produits concernant le produit retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi de la réservation de produits concernant le produit
 */

router.post("/",reserverProd.newReservationProduit)
/**
 * @swagger
 * /reservations/:
 *  post:
 *      description: Ajoute une réservation de produits dans la base de données
 *      tags:
 *          - Reservation
 *      parameters:
 *          - in: formData
 *            name: quantite
 *            type: int
 *            required: true
 *          - in: formData
 *            name: idUser
 *            type: int
 *            required: true
 *          - in: formData
 *            name: idProduit
 *            type: int
 *            required: true
 *      responses:
 *          '200':
 *              description: Réservation de produits ajouté avec succés
 *          '404':
 *              description: Erreur lors de l'ajout de la réservation de produits
 */

router.put("/",reserverProd.modifReservationProduit)
/**
 * @swagger
 * /reservations/:
 *  put:
 *      description: Modifie les données d'une réservation de produits
 *      tags:
 *          - Reservation
 *      parameters:
 *          - in: formData
 *            name: quantite
 *            type: int
 *            required: false
 *          - in: formData
 *            name: idUser
 *            type: int
 *            required: false
 *          - in: formData
 *            name: idProduit
 *            type: int
 *            required: false
 *          - in: formData
 *            name: id
 *            type: int
 *            required: false
 *      responses:
 *          '200':
 *              description: Réservation de produits modifié avec succés
 *          '404':
 *              description: Erreur lors de la modification de la réservation de produits
 */

router.delete("/:id",reserverProd.deleteReservationProduit)
/**
 * @swagger
 * /reservations/{id}:
 *  delete:
 *      description: Supprime une réservation de produits
 *      tags:
 *          - Reservation
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Réservation de produits supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression de la réservation de produits
 */

export default router;