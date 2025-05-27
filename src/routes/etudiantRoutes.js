import express from "express";
import etudiantController from "../controllers/etudiantController.js";
const router = express.Router();

router.get("/", etudiantController.getAllEtudiants);
router.get("/:id", etudiantController.getEtudiantById);
router.post("/", etudiantController.createEtudiant);
router.put("/:id", etudiantController.updateEtudiant);
router.delete("/:id", etudiantController.deleteEtudiant);

export default router;