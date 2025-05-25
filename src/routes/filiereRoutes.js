import express from 'express';
import filiereController from '../controllers/filiereController.js';


const router = express.Router();

router.get('/', filiereController.getAllFilieres)
router.get('/:id', filiereController.getFiliereById)
router.post('/', filiereController.createFiliere)
router.put('/:id', filiereController.updateFiliere)
router.delete('/:id', filiereController.deleteFiliere)

export default router;