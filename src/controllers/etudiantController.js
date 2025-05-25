import {readTable} from "../utils/helpers.js";


// GET ALL
const getAllEtudiants = (req, res) => {
    const etudiants = readTable('etudiants');
    res.status(200).json(etudiants);
}

// GET BY ID
const getEtudiantById = (req, res) => {
    const etudiants = readTable('etudiants');
    const idE = parseInt(req.params.id);
    const etudiant = etudiants.find(etu => etu.id === idE)
}


// CREATE
const createEtudiant = (req, res) => {

}

// UPDATE
const updateEtudiant = (req, res) => {

}

// DELETE
const deleteEtudiant = (req, res) => {

}