import {generateId, readTable, writeTable} from "../utils/helpers.js";
import {validateAndCheckForeignKeys} from "../utils/validator.js";
import {baseController} from "./baseController.js";

// GET ALL, GET BY ID, DELETE
const { getAll, getById, delete: remove } = baseController('cours');

// CREATE
const createCours = (req, res) => {
    try {
        let { dateCours, duree, classeId, moduleId } = req.body;

        const result = validateAndCheckForeignKeys(req.body,
            ["dateCours", "duree", "classeId", "moduleId"],
            [
                { table: 'classes', id: classeId, label: 'Classe' },
                { table: 'modules', id: moduleId, label: 'Module' }
                ]
        )

        dateCours = new Date(dateCours).toISOString();

        const cours = readTable('cours');
        const id = generateId('cours');
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
    const result = validateAndCheckForeignKeys(req.body,
        ["dateCours", "duree", "classeId", "moduleId"],
        [
            { table: 'classes', id: classeId, label: 'Classe' },
            { table: 'modules', id: moduleId, label: 'Module' }
            ]
    )

    dateCours = new Date(dateCours).toISOString();

    cours[index] = {id, dateCours, duree, classeId, moduleId};
    writeTable('cours', cours);
    res.status(200).json(cours[index]);
}


export default {
    getAllCours: getAll,
    getCoursById: getById,
    createCours,
    updateCours,
    deleteCours: remove
}