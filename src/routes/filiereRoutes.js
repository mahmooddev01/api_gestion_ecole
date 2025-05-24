import express from 'express';
import filiereController from '../controllers/filiereController.js';


const router = express.Router();

router.get('/', filiereController.getAllFilieres)
router.get('/:id', filiereController.getFiliereById)

export default router;