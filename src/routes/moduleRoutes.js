import express from 'express';
import moduleController from "../controllers/moduleController.js";

const router = express.Router();

router.get('/', moduleController.getAllModules)
router.get('/:id', moduleController.getModuleById)
router.post('/', moduleController.createModule)
router.put('/:id', moduleController.updateModule)
router.delete('/:id', moduleController.deleteModule)

export default router;