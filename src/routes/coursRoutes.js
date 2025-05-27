import express from 'express';
import coursController from "../controllers/coursController.js";
const router = express.Router();

router.get('/', coursController.getAllCours);
router.get('/:id', coursController.getCoursById);
router.post('/', coursController.createCours);
router.put('/:id', coursController.updateCours);
router.delete('/:id', coursController.deleteCours);

export default router;