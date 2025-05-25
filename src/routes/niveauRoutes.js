import express from "express";
import niveauController from "../controllers/niveauController.js";

const router = express.Router();

router.get('/', niveauController.getAllNiveaux)
router.get('/:id', niveauController.getNiveauById)
router.post('/', niveauController.createNiveau)
router.put('/:id', niveauController.updateNiveau)
router.delete('/:id', niveauController.deleteNiveau)

export default router;