// GET ALL
import {readTable, writeTable} from "../utils/helpers.js";

const getAllModules = (req, res) => {
    const modules = readTable('modules');
    res.status(200).json(modules);
}

// GET BY ID
const getModuleById = (req, res) => {
    const modules = readTable('modules');
    const idM = parseInt(req.params.id);
    const module = modules.find(m => m.id === idM);

    if (!module) {
        return res.status(404).json({message: 'Module non trouvé'});
    }

    res.status(200).json(module);
}

// CREATE
const createModule = (req, res) => {
    try {
        const {libelle} = req.body;
        if (!libelle) {
            return res.status(400).json({message: 'Veuillez renseigner le libellé'});
        }
        const modules = readTable('modules');
        const id = modules.length > 0 ? Math.max(...modules.map(m => m.id)) + 1 : 1;
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
    if (!libelle) {
        return res.status(400).json({message: 'Veuillez renseigner le libellé'});
    }
    modules[index].libelle = libelle;
    writeTable('modules', modules);
    res.status(200).json(modules[index]);
}

// DELETE
const deleteModule = (req, res) => {
    const modules = readTable('modules');
    const idM = parseInt(req.params.id);
    const index = modules.findIndex(f => f.id === idM);
    if (index === -1) {
        return res.status(404).json({message: 'Module non trouvé'});
    }

    const removedModule = modules.splice(index, 1);
    writeTable('modules', modules);

    res.status(200).json({
        message: 'Module supprimé',
        module: removedModule
    })
}

export default {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
}