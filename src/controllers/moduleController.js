// GET ALL
import {readTable} from "../utils/helpers.js";

const getAllModules = (req, res) => {
    const modules = readTable('modules');
    res.status(200).json(modules);
}

// GET BY ID
const getModuleById = (req, res) => {
    const modules = readTable('modules');
    const idM = parseInt(req.params.id);
    const module = modules.find(m => m.id === modules);

    if (!module) {
        res.status(404).json({message: 'Module non trouvé'});
    }

    res.status(200).json(module);
}

// CREATE
const createModule = (req, res) => {

}

// UPDATE
const updateModule = (req, res) => {

}

// DELETE
const deleteModule = (req, res) => {

}

export default {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
}