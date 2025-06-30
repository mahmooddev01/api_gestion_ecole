import {baseController} from "./baseController.js";

// GET ALL, GET BY ID, CREATE, UPDATE, DELETE
const { getAll, getById, create, update, delete: remove } = baseController('filieres', ['libelle']);


export default {
    getAllFilieres: getAll,
    getFiliereById: getById,
    createFiliere: create,
    updateFiliere: update,
    deleteFiliere: remove
};
