import {generateId, readTable, writeTable} from "../utils/helpers.js";
import {validatePayload} from "../utils/validator.js";
import {baseController} from "./baseController.js";

// GET ALL, GET BY ID
const { getAll, getById, delete: remove } = baseController('niveaux');

// CREATE
const createNiveau = (req, res) => {
    try {
        const { libelle } = req.body;
        const result = validatePayload(req.body,["libelle"]);

        const niveaux = readTable('niveaux');
        const id = generateId('niveaux');

        const newNiveau = { id, libelle };
        niveaux.push(newNiveau);
        writeTable('niveaux', niveaux);

        res.status(201).json(newNiveau);
    } catch (e) {
        console.error("Erreur creation niveau :", e);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// UPDATE
const updateNiveau = (req, res) => {
    const niveaux = readTable('niveaux');
    const id = parseInt(req.params.id);
    const index = niveaux.findIndex(n => n.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Niveau non trouvé' });
    }
    const { libelle } = req.body;
    const result = validatePayload(req.body,["libelle"]);

    niveaux[index].libelle = libelle;
    writeTable('niveaux', niveaux);
    res.status(200).json(niveaux[index]);
}


export default {
    getAllNiveaux: getAll,
    getNiveauById: getById,
    createNiveau,
    updateNiveau,
    deleteNiveau: remove
}