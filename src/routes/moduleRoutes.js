import express from 'express';
import moduleController from "../controllers/moduleController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name : Modules
 *   description : Gestion des modules
 */

/**
 * @swagger
 * components:
 *   schemas :
 *     Module :
 *       type : object
 *       required :
 *         - libelle
 *       properties :
 *         id :
 *           type : integer
 *           description : Identifiant unique du module
 *         libelle :
 *           type : string
 *           description : Libellé du module
 */

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Liste tous les modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: Liste des modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Module'
 */
router.get('/', moduleController.getAllModules);

/**
 * @swagger
 * /modules/{id}:
 *   get:
 *     summary: Récupère un module par ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du module
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 */
router.get('/:id', moduleController.getModuleById);

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Crée un nouveau module
 *     tags: [Modules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       201:
 *         description: Module créé avec succès
 */
router.post('/', moduleController.createModule);

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Met à jour un module existant
 *     tags: [Modules]
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
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       200:
 *         description: Module mis à jour
 */
router.put('/:id', moduleController.updateModule);

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Supprime un module
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Module supprimé
 */
router.delete('/:id', moduleController.deleteModule);

export default router;
