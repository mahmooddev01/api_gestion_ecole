import express from 'express';
import coursController from "../controllers/coursController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cours
 *   description: Gestion des cours
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cours:
 *       type: object
 *       required:
 *         - dateCours
 *         - duree
 *         - classeId
 *         - moduleId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique du cours
 *         dateCours:
 *           type: string
 *           format: date-time
 *           description: Date et heure du cours
 *         duree:
 *           type: integer
 *           description: Durée du cours en minutes
 *         classeId:
 *           type: integer
 *           description: ID de la classe liée
 *         moduleId:
 *           type: integer
 *           description: ID du module lié
 */

/**
 * @swagger
 * /cours:
 *   get:
 *     summary: Récupère la liste de tous les cours
 *     tags: [Cours]
 *     responses:
 *       200:
 *         description: Liste des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 */
router.get('/', coursController.getAllCours);

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Crée un nouveau cours
 *     tags: [Cours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cours'
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 */
router.post('/', coursController.createCours);

/**
 * @swagger
 * /cours/{id}:
 *   get:
 *     summary: Récupère un cours par son ID
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Détails du cours
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cours'
 *       404:
 *         description: Cours non trouvé
 */
router.get('/:id', coursController.getCoursById);

/**
 * @swagger
 * /cours/{id}:
 *   put:
 *     summary: Met à jour un cours existant
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cours'
 *     responses:
 *       200:
 *         description: Cours mis à jour
 *       404:
 *         description: Cours non trouvé
 */
router.put('/:id', coursController.updateCours);

/**
 * @swagger
 * /cours/{id}:
 *   delete:
 *     summary: Supprime un cours par ID
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours supprimé
 *       404:
 *         description: Cours non trouvé
 */
router.delete('/:id', coursController.deleteCours);

export default router;
