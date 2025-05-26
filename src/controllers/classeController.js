// GET ALL
import {readTable, writeTable} from "../utils/helpers.js";

const getAllClasses = (req, res) => {
    const classes = readTable('classes');
    res.status(200).json(classes);
}

// GET BY ID
const getClassById = (req, res) => {
    const classes = readTable('classes');
    const idC = parseInt(req.params.id);
    const classe = classes.find(c => c.id === idC)

    if (!classe) {
        return res.status(404).json({ message: "Classe non trouvée"});
    }

    res.status(200).json(classe);
}

// CREATE
const createClasse = (req, res) => {
    try {
        const { libelle, niveauId, filiereId } = req.body;

        if (!libelle || !niveauId || !filiereId) {
            return res.status(400).json({ message: "Veuillez renseigner tous les champs" });
        }

        const classes = readTable('classes');
        const id = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;

        const newClasse = {id, libelle, niveauId, filiereId};
        classes.push(newClasse);
        writeTable('classes', classes);

        res.status(200).json(newClasse);
    } catch (e) {
        console.log("Erreur creation classe", e);
        res.status(500).json({ message: "Erreur serveur" })
    }
}

// UPDATE
const updateClasse = (req, res) => {
    const classes = readTable('classes');
    const id = parseInt(req.params.id);
    const index = classes.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(400).json({ message: "Classe non trouvée" });
    }

    const {libelle, niveauId, filiereId} = req.body;
    if (!libelle || !niveauId || !filiereId) {
        return res.status(400).json({ message: "Veuillez renseigner tous les champs" });
    }
    classes[index] = {id, libelle, niveauId, filiereId};
    writeTable('classes', classes);
    res.status(200).json(classes[index]);
}

// DELETE
const deleteClasse = (req, res) => {
    const classes = readTable('classes');
    const id = parseInt(req.params.id);
    const index = classes.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(400).json({ message: "Classe non trouvée" });
    }

    const removedClasse = classes.splice(index, 1);
    writeTable('classes', classes);
    res.status(200).json({
        message: 'Classe supprimée',
        classe: removedClasse
    });
}

export default {
    getAllClasses,
    getClassById,
    createClasse,
    updateClasse,
    deleteClasse,
}