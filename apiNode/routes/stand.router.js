import express from "express";
import standController from "../controllers/stand.controller.js";
// import {droitAdmin, verificationDroit} from "../middleware/authentification.js";
// import evenementController from "../controllers/evenement.controller.js";

const router = express.Router()
router.get("/typeStand", standController.listeTypeStand)
/**
 * @swagger
 * /stands/typeStand/:
 *  get:
 *      description: Liste touts les types de stands
 *      tags:
 *          - Stands
 *      responses:
 *          '200':
 *              description: type de stands retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des types de stands
 */

router.get("/", standController.listStand)
/**
 * @swagger
 * /stands/:
 *  get:
 *      description: Liste touts les stands
 *      tags:
 *          - Stands
 *      responses:
 *          '200':
 *              description: Stands retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des stands
 */

router.get("/withEvents", standController.getStandWithEvents)
/**
 * @swagger
 * /stands/withEvents:
 *  get:
 *      description: Retourne tous les stands avec leurs evenements
 *      tags:
 *          - Stands
 *      responses:
 *          '200':
 *              description: Stands retourné avec succés
 *          '404':
 *              description: Erreur lors de l'envoi des stands
 */

router.get("/:id", standController.getStand)
/**
 * @swagger
 * /stands/{id}:
 *  get:
 *      description: Retourne le stand avec l'id correspondant et tous ses commentaires
 *      summary: Route non triviale
 *      tags:
 *          - Stands
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Stand retourné comme une crèpe avec succés
 *          '404':
 *              description: Erreur lors de l'envoi du stand
 */

router.post("/:id/commentaire", standController.newCommentaire)
/**
 * @swagger
 * /stands/{id}/commentaire:
 *  post:
 *      description: Ajoute un commentaire à un stand
 *      tags:
 *          - Stands
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: commentaire
 *            type: string
 *            required: true
 *      responses:
 *          '200':
 *              description: Commentaire ajouté avec succés au stand
 *          '404':
 *              description: Erreur lors de l'ajout du commentare au stand
 */

router.get("/:id/commentaire", standController.getCommentaire)

//la suite des routes necessite une authentification de role prestataire
// router.use(verificationDroit,droitPresta)

router.patch("/:id", standController.updateStand)
/**
 * @swagger
 * /stands/:
 *  patch:
 *      description: modifie un stand
 *      tags:
 *          - Stands
 *      parameters:
 *          - in: path
 *            name: idStand
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: nomStand
 *            type: string
 *            required: true
 *          - in: formData
 *            name: descriptionStand
 *            type: string
 *            required: true
 *      responses:
 *          '200':
 *              description: stand mis a jour avec succès
 *          '404':
 *              description: Erreur lors de la mise a jour du stand
 */

//la suite des routes necessite une authentification de role admin
// router.use(verificationDroit,droitAdmin)

router.post("/", standController.newStand)
/**
 * @swagger
 * /stands/:
 *  post:
 *      description: Ajoute un stand dans la base de données
 *      tags:
 *          - Stands
 *      parameters:
 *          - in: formData
 *            name: idStand
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: descriptionStand
 *            type: string
 *            required: true
 *          - in: formData
 *            name: nomStand
 *            type: string
 *            required: true
 *          - in: formData
 *            name: idPrestataire
 *            type: integer
 *            required: true
 *          - in: formData
 *            name: idTypeStand
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Stand ajouté avec succés
 *          '404':
 *              description: Erreur lors de l'ajout du stand
 */

router.delete("/:id", standController.deleteStand)
/**
 * @swagger
 * /stands/{id}:
 *  delete:
 *      description: Supprime un stand de la base de données
 *      tags:
 *          - Stands
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Stand supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression du stand
 */

router.delete("/commentaire/:id", standController.deleteCommentaire)
/**
 * @swagger
 * /stands/{id}:
 *  delete:
 *      description: Supprime un commentaire de la base de données
 *      tags:
 *          - Stands
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Stand supprimé avec succés
 *          '404':
 *              description: Erreur lors de la suppression du stand
 */


export default router;
