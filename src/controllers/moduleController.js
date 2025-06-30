import {baseController} from "./baseController.js";

// GET ALL, GET BY ID, CREATE, UPDATE, DELETE
const { getAll, getById, create, update, delete: remove } = baseController('modules', ['libelle']);


export default {
    getAllModules: getAll,
    getModuleById: getById,
    createModule: create,
    updateModule: update,
    deleteModule: remove
}