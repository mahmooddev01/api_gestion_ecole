// GET ALL
import {generateId, readTable, writeTable} from "../utils/helpers.js";
import {validatePayload} from "../utils/validator.js";
import {baseController} from "./baseController.js";

// GET ALL, GET BY ID
const { getAll, getById, delete: remove } = baseController('modules');

// CREATE
const createModule = (req, res) => {
    try {
        const {libelle} = req.body;
        const result = validatePayload(req.body,["libelle"]);

        const modules = readTable('modules');
        const id = generateId('modules');
        const newModule = {id, libelle};
        modules.push(newModule);
        writeTable('modules', modules);

        res.status(201).json(newModule);
    } catch (e) {
        console.error("Erreur creation module :", e);
        res.status(500).json({message: 'Erreur serveur'});
    }
}

// UPDATE
const updateModule = (req, res) => {
    const modules = readTable('modules');
    const idM = parseInt(req.params.id);
    const index = modules.findIndex(m => m.id === idM);
    if (index === -1) {
        res.status(404).json({message: 'Module non trouvé'});
    }
    const {libelle} = req.body;
    const result = validatePayload(req.body,["libelle"]);

    modules[index].libelle = libelle;
    writeTable('modules', modules);
    res.status(200).json(modules[index]);
}



export default {
    getAllModules: getAll,
    getModuleById: getById,
    createModule,
    updateModule,
    deleteModule: remove
}