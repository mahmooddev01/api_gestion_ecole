import express from "express";
import niveauController from "../controllers/niveauController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Niveaux
 *   description: Gestion des niveaux
 */

/**
 * @swagger
 * components:
 *   schemas :
 *     Niveau :
 *       type : object
 *       required :
 *         - libelle
 *       properties :
 *         id :
 *           type : integer
 *           description : Identifiant unique du niveau
 *         libelle :
 *           type : string
 *           description : Libellé du niveau
 */

/**
 * @swagger
 * /niveaux:
 *   get:
 *     summary: Liste tous les niveaux
 *     tags: [Niveaux]
 *     responses:
 *       200:
 *         description: Liste des niveaux
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Niveau'
 */
router.get('/', niveauController.getAllNiveaux);

/**
 * @swagger
 * /niveaux/{id}:
 *   get:
 *     summary: Récupère un niveau par ID
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du niveau
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Niveau'
 */
router.get('/:id', niveauController.getNiveauById);

/**
 * @swagger
 * /niveaux:
 *   post:
 *     summary: Crée un nouveau niveau
 *     tags: [Niveaux]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Niveau'
 *     responses:
 *       201:
 *         description: Niveau créé avec succès
 */
router.post('/', niveauController.createNiveau);

/**
 * @swagger
 * /niveaux/{id}:
 *   put:
 *     summary: Met à jour un niveau existant
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Niveau'
 *     responses:
 *       200:
 *         description: Niveau mis à jour
 */
router.put('/:id', niveauController.updateNiveau);

/**
 * @swagger
 * /niveaux/{id}:
 *   delete:
 *     summary: Supprime un niveau
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Niveau supprimé
 */
router.delete('/:id', niveauController.deleteNiveau);

export default router;
