import {readTable} from "../utils/helpers.js";

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
    const filiere = req.body;
}

// UPDATE
const updateFiliere = (req, res) => {

}

// DELETE
const deleteFiliere = (req, res) => {
    const id = req.params.id;
}


export default {
    getAllFilieres,
    getFiliereById,
    createFiliere,
    updateFiliere,
    deleteFiliere
};