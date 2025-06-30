import {baseController} from "./baseController.js";

// GET ALL, GET BY ID, CREATE, UPDATE
const { getAll, getById, create, update, delete: remove } = baseController('niveaux',  ['libelle']);


export default {
    getAllNiveaux: getAll,
    getNiveauById: getById,
    createNiveau: create,
    updateNiveau: update,
    deleteNiveau: remove
}