import {readTable, writeTable} from "../utils/helpers.js";

// GET ALL
const getAllCours = (req, res) => {
    const cours = readTable('cours');
    res.status(200).json(cours);
}

// GET BY ID
const getCoursById = (req, res) => {
    const cours = readTable('cours');
    const idC = parseInt(req.params.id);
    const cour = cours.find(c => c.id === idC);
    if (!cour) {
        return res.status(400).json({message: 'Cours non trouvé'});
    }

    res.status(200).json(cour);
}

// CREATE
const createCours = (req, res) => {
    try {
        let { dateCours, duree, classeId, moduleId } = req.body;

        if (!dateCours || !duree || !classeId || !moduleId) {
            return res.status(400).json({message: 'Veuillez renseigner tous les champs'});
        }

        dateCours = new Date(dateCours).toISOString();

        const cours = readTable('cours');
        const id = cours.length > 0 ? Math.max(...cours.map(c => c.id)) + 1 : 1;
        const newCours = { id, dateCours, duree, classeId, moduleId };
        cours.push(newCours);
        writeTable('cours', cours);

        res.status(200).json(newCours);
    } catch (e) {
        console.log("Erreur creation cours", e);
        res.status(500).json({message: 'Erreur serveur'});
    }
}

// UPDATE
const updateCours = (req, res) => {
    const cours = readTable('cours');
    const id = parseInt(req.params.id);
    const index = cours.findIndex(c => c.id === id);

    if (!index) {
        return res.status(400).json({message: 'Cours non trouvé'});
    }

    let { dateCours, duree, classeId, moduleId } = req.body;
    if (!dateCours || !duree || !classeId || !moduleId) {
        return res.status(400).json({message: 'Veuillez renseigner tous les champs'});
    }

    dateCours = new Date(dateCours).toISOString();

    cours[index] = {id, dateCours, duree, classeId, moduleId};
    writeTable('cours', cours);
    res.status(200).json(cours[index]);
}

// DELETE
const deleteCours = (req, res) => {
    const cours = readTable('cours');
    const id = parseInt(req.params.id);
    const index = cours.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(400).json({message: 'Cours non trouvé'});
    }
    const removedCours = cours.splice(index, 1);
    writeTable('cours', cours);
    res.status(200).json({
        message: 'Cours non trouvé',
        cours: removedCours
    });
}


export default {
    getAllCours,
    getCoursById,
    createCours,
    updateCours,
    deleteCours,
}