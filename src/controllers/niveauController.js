import {readTable, writeTable} from "../utils/helpers.js";

// GET ALL
const getAllNiveaux = (req, res) => {
    const niveaux = readTable('niveaux');
    res.status(200).json(niveaux);
}

// GET BY ID
const getNiveauById = (req, res) => {
    const niveaux = readTable('niveaux');
    const idN = parseInt(req.params.id);
    const niveau = niveaux.find(n => n.id === idN);
    if (!niveau) {
        return res.status(404).json({ message: 'Niveau non trouvé' });
    }
    res.status(200).json(niveau);
}

// CREATE
const createNiveau = (req, res) => {
    try {
        const { libelle } = req.body;
        if (!libelle) {
            return res.status(400).json({ message: 'Veuillez renseigner le libellé' });
        }
        const niveaux = readTable('niveaux');
        const id = niveaux.length > 0 ? Math.max(...niveaux.map(n => n.id)) + 1 : 1;

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
    if (!libelle) {
        return res.status(400).json({ message: 'Veuillez renseigner le libellé' });
    }
    niveaux[index].libelle = libelle;
    writeTable('niveaux', niveaux);
    res.status(200).json(niveaux[index]);
}

// DELETE
const deleteNiveau = (req, res) => {
    const niveaux = readTable('niveaux');
    const id = parseInt(req.params.id);
    const index = niveaux.findIndex(n => n.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Niveau non trouvé' });
    }
    const removedNiveau = niveaux.splice(index, 1);
    writeTable('niveaux', niveaux);
    res.status(200).json({
        message: 'Niveau supprimé',
        niveau: removedNiveau
    })
}

export default {
    getAllNiveaux,
    getNiveauById,
    createNiveau,
    updateNiveau,
    deleteNiveau
}