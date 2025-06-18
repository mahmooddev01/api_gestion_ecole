import express from 'express';
import classeController from "../controllers/classeController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gestion des classes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Classe:
 *       type: object
 *       required:
 *         - libelle
 *         - niveauId
 *         - filiereId
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la classe
 *         libelle:
 *           type: string
 *           description: Nom ou libellé de la classe
 *         niveauId:
 *           type: integer
 *           description: Identifiant du niveau associé
 *         filiereId:
 *           type: integer
 *           description: Identifiant de la filière associée
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Liste toutes les classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Liste des classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Classe'
 */
router.get('/', classeController.getAllClasses);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Crée une nouvelle classe
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Classe'
 *     responses:
 *       201:
 *         description: Classe créée
 */
router.post('/', classeController.createClasse);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Récupère une classe par son ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la classe
 *     responses:
 *       200:
 *         description: Une classe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classe'
 *       404:
 *         description: Classe non trouvée
 */
router.get('/:id', classeController.getClassById);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Met à jour une classe
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la classe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Classe'
 *     responses:
 *       200:
 *         description: Classe mise à jour
 *       404:
 *         description: Classe non trouvée
 */
router.put('/:id', classeController.updateClasse);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Supprime une classe
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la classe
 *     responses:
 *       200:
 *         description: Classe supprimée
 *       404:
 *         description: Classe non trouvée
 */
router.delete('/:id', classeController.deleteClasse);

export default router;
