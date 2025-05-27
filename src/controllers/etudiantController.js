import {readTable, writeTable} from "../utils/helpers.js";


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
    if (!etudiant) {
        return res.status(404).json({message: 'Etudiant non trouvé'});
    }

    res.status(200).json(etudiant);
}

// CREATE
const createEtudiant = (req, res) => {
    try {
        const { nomComplet, matricule, adresse, login, password, classeId } = req.body;

        if (!nomComplet || !matricule || !adresse || !login || !password || !classeId) {
            return res.status(400).json({message: 'Veuillez renseigner tous les champs'});
        }
        const etudiants = readTable('etudiants');
        const id = etudiants.length > 0 ? Math.max(...etudiants.map(etu => etu.id)) + 1 : 1;

        const newEtudiant = {id, nomComplet, matricule, adresse, login, password, classeId};
        etudiants.push(newEtudiant);
        writeTable('etudiants', etudiants);

        res.status(200).json(newEtudiant);
    } catch (e) {
        console.error("Erreur creation etudiant :", e);
        res.status(500).json({message: 'Erreur serveur'});
    }
}

// UPDATE
const updateEtudiant = (req, res) => {
    const etudiants = readTable('etudiants');
    const id = parseInt(req.params.id);
    const index = etudiants.findIndex(etu => etu.id === id);

    if (index === -1) {
        return res.status(400).json({message: 'Etudiant non trouvé'});
    }

    const {nomComplet, matricule, adresse, login, password, classeId} = req.body;
    if (!nomComplet || !matricule || !adresse || !login || !password || !classeId) {
        return res.status(400).json({message: 'Veuillez renseigner tous les champs'});
    }
    etudiants[index] = {id, nomComplet, matricule, adresse, login, password, classeId};
    writeTable('etudiants', etudiants);
    res.status(200).json(etudiants[index]);
}

// DELETE
const deleteEtudiant = (req, res) => {
    const etudiants = readTable('etudiants');
    const id = parseInt(req.params.id);
    const index = etudiants.findIndex(etu => etu.id === id);
    if (index === -1) {
        return res.status(400).json({message: 'Etudiant non trouvé'});
    }

    const removedEtudiant = etudiants.splice(index, 1);
    writeTable('etudiants', etudiants);
    res.status(200).json({
        message: 'Etudiant supprimé',
        etudiant: removedEtudiant
    })
}


export default {
    getAllEtudiants,
    getEtudiantById,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant,
}