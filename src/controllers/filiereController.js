import {generateId, readTable, writeTable} from "../utils/helpers.js";
import {validatePayload} from "../utils/validator.js";

// GET ALL
const getAllFilieres = (req, res) => {
    const filieres = readTable('filieres');
    res.status(200).json(filieres);
}

// GET BY ID
const getFiliereById = (req, res) => {
    const filieres = readTable('filieres');
    const idF = parseInt(req.params.id);
    const filiere = filieres.find(f => f.id === idF);

    if (!filiere) {
        return res.status(404).json({ message: 'Filière non trouvée' });
    }

    res.status(200).json(filiere);
};

// CREATE
const createFiliere = (req, res) => {
    try {
        const { libelle } = req.body;
        const result = validatePayload(req.body,["libelle"])

        const filieres = readTable('filieres');
        const id = generateId('filieres');

        const newFiliere = { id, libelle };
        filieres.push(newFiliere);
        writeTable('filieres', filieres);

        res.status(201).json(newFiliere);
    } catch (e) {
        console.error("Erreur creation filiere :", e);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// UPDATE
const updateFiliere = (req, res) => {
    const filieres = readTable('filieres');
    const id = parseInt(req.params.id);
    const index = filieres.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Filière non trouvée' });
    }

    const { libelle } = req.body;
    const result = validatePayload(req.body,["libelle"])

    filieres[index].libelle = libelle;
    writeTable('filieres', filieres);
    res.status(200).json(filieres[index]);
}

// DELETE
const deleteFiliere = (req, res) => {
    const filieres = readTable('filieres');
    const id = parseInt(req.params.id);
    const index = filieres.findIndex(f => f.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Filière non trouvée' });
    }
    const removedFiliere = filieres.splice(index, 1);
    writeTable('filieres', filieres);

    res.status(200).json({
        message: 'Filière supprimée',
        filiere: removedFiliere
    });
}


export default {
    getAllFilieres,
    getFiliereById,
    createFiliere,
    updateFiliere,
    deleteFiliere
};