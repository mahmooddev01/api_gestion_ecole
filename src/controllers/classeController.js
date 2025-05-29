import {generateId, keyExist, readTable, writeTable} from "../utils/helpers.js";
import {checkForeignKeysExist, validateAndCheckForeignKeys, validatePayload} from "../utils/validator.js";
import {baseController} from "./baseController.js";

// GET ALL, GET BY ID
const { getAll, getById, delete: remove } = baseController('classes');

// CREATE
const createClasse = (req, res) => {
    try {
        const { libelle, niveauId, filiereId } = req.body;
        // Vérification de la validité des champs et de leur existence
        const result = validateAndCheckForeignKeys(req.body,
            ["libelle", "niveauId", "filiereId"],
            [
                { table: 'filieres', id: filiereId, label: 'Filière' },
                { table: 'niveaux', id: niveauId, label: 'Niveau' }
            ]
        );

        const classes = readTable('classes');
        const id = generateId('classes');

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

    const { libelle, niveauId, filiereId } = req.body;
    // Vérification de la validité des champs et de leur existence
    const result = validateAndCheckForeignKeys(req.body,
        ["libelle", "niveauId", "filiereId"],
        [
            { table: 'filieres', id: filiereId, label: 'Filière' },
            { table: 'niveaux', id: niveauId, label: 'Niveau' }
        ]
    );

    classes[index] = {id, libelle, niveauId, filiereId};
    writeTable('classes', classes);
    res.status(200).json(classes[index]);
}


export default {
    getAllClasses: getAll,
    getClassById: getById,
    createClasse,
    updateClasse,
    deleteClasse: remove
};
