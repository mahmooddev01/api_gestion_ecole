import express from 'express';
import filiereController from '../controllers/filiereController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name : Filières
 *   description : Gestion des filières
 */

/**
 * @swagger
 * components:
 *   schemas :
 *     Filiere :
 *       type : object
 *       required :
 *         - libelle
 *       properties :
 *         id :
 *           type : integer
 *           description : Identifiant unique de la filière
 *         libelle :
 *           type : string
 *           description : Libellé de la filière
 */

/**
 * @swagger
 * /filieres:
 *   get:
 *     summary: Liste toutes les filières
 *     tags: [Filières]
 *     responses:
 *       200:
 *         description: Liste des filières
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filiere'
 */
router.get('/', filiereController.getAllFilieres);

/**
 * @swagger
 * /filieres/{id}:
 *   get:
 *     summary: Récupère une filière par ID
 *     tags: [Filières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la filière
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filiere'
 */
router.get('/:id', filiereController.getFiliereById);

/**
 * @swagger
 * /filieres:
 *   post:
 *     summary: Crée une nouvelle filière
 *     tags: [Filières]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Filiere'
 *     responses:
 *       201:
 *         description: Filière créée avec succès
 */
router.post('/', filiereController.createFiliere);

/**
 * @swagger
 * /filieres/{id}:
 *   put:
 *     summary: Met à jour une filière existante
 *     tags: [Filières]
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
 *             $ref: '#/components/schemas/Filiere'
 *     responses:
 *       200:
 *         description: Filière mise à jour
 */
router.put('/:id', filiereController.updateFiliere);

/**
 * @swagger
 * /filieres/{id}:
 *   delete:
 *     summary: Supprime une filière
 *     tags: [Filières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filière supprimée
 */
router.delete('/:id', filiereController.deleteFiliere);

export default router;
