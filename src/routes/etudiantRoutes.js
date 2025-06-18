import express from "express";
import etudiantController from "../controllers/etudiantController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Etudiants
 *   description: Gestion des étudiants
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Etudiant:
 *       type: object
 *       required:
 *         - nomComplet
 *         - matricule
 *         - adresse
 *         - login
 *         - password
 *         - classeId
 *       properties:
 *         id:
 *           type: integer
 *         nomComplet:
 *           type: string
 *         matricule:
 *           type: string
 *         adresse:
 *           type: string
 *         login:
 *           type: string
 *         password:
 *           type: string
 *         classeId:
 *           type: integer
 */

/**
 * @swagger
 * /etudiants:
 *   get:
 *     summary: Liste tous les étudiants
 *     tags: [Etudiants]
 *     responses:
 *       200:
 *         description: Liste des étudiants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Etudiant'
 */
router.get("/", etudiantController.getAllEtudiants);

/**
 * @swagger
 * /etudiants/{id}:
 *   get:
 *     summary: Récupère un étudiant par son ID
 *     tags: [Etudiants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails d'un étudiant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Etudiant'
 */
router.get("/:id", etudiantController.getEtudiantById);

/**
 * @swagger
 * /etudiants:
 *   post:
 *     summary: Crée un nouvel étudiant
 *     tags: [Etudiants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Etudiant'
 *     responses:
 *       201:
 *         description: Étudiant créé avec succès
 */
router.post("/", etudiantController.createEtudiant);

/**
 * @swagger
 * /etudiants/{id}:
 *   put:
 *     summary: Met à jour un étudiant
 *     tags: [Etudiants]
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
 *             $ref: '#/components/schemas/Etudiant'
 *     responses:
 *       200:
 *         description: Étudiant mis à jour
 */
router.put("/:id", etudiantController.updateEtudiant);

/**
 * @swagger
 * /etudiants/{id}:
 *   delete:
 *     summary: Supprime un étudiant
 *     tags: [Etudiants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Étudiant supprimé
 */
router.delete("/:id", etudiantController.deleteEtudiant);

export default router;
