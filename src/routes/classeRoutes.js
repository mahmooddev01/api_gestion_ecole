import express from 'express';
import classeController from "../controllers/classeController.js";
const router = express.Router();

router.get('/', classeController.getAllClasses);
router.get('/:id', classeController.getClassById);
router.post('/', classeController.createClasse);
router.put('/:id', classeController.updateClasse);
router.delete('/:id', classeController.deleteClasse);

export default router;