import {checkForeignKeysExist, validatePayload} from "../utils/validator.js";
import {baseController} from "./baseController.js";
import pool from "../config/db.js";

// GET ALL, GET BY ID, DELETE
const { getAll, getById, delete: remove } = baseController('cours');

// CREATE
const createCours = async (req, res) => {
    try {
        let { dateCours, duree, classeId, moduleId } = req.body;

        // Validation des champs obligatoire
        const result = validatePayload(req.body,["dateCours", "duree", "classeId", "moduleId"])
        // Bloquer si invalide
        if(!result.valid) {
            return res.status(400).json({ message: result.message });
        }

        // Vérification des clés étrangères
        const checkFkeys = await checkForeignKeysExist([
            { table: "classes", id: classeId, label: "Classe" },
            { table: "modules", id: moduleId, label: "Module" },
        ]);
        if(!checkFkeys.valid) {
            return res.status(400).json({ message: checkFkeys.message });
        }

        // Vérification du doublon
        const doublonCheck = `
            SELECT * FROM cours
            WHERE dateCours = $1 AND duree = $2 AND classeId = $3 AND moduleId = $4`;
        const alreadyExists = await pool.query(doublonCheck, [dateCours, duree, classeId, moduleId]);

        if (alreadyExists.rows.length > 0) {
            return res.status(400).json({ message: "Ce cours existe déjà pour cette classe, ce module et cette date." });
        }

        // Formatage de la date
        const f_dateCours = new Date(dateCours);
        if (isNaN(f_dateCours)) {
            return res.status(400).json({ message: "Date invalide" });
        }

        // Insertion dans la BD
        const insertQuery = `
            INSERT INTO cours (dateCours, duree, classeId, moduleId)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const values = [f_dateCours.toISOString(), duree, classeId, moduleId]
        const {rows} = await pool.query(insertQuery, values);

        res.status(201).json(rows[0])
    } catch (e) {
        res.status(500).json({message: 'Erreur serveur'});
    }
}

// UPDATE
const updateCours = async (req, res) => {
    const id = parseInt(req.params.id);
    let { dateCours, duree, classeId, moduleId } = req.body;

    // Vérification des champs requis
    const result = validatePayload(req.body,["dateCours", "duree", "classeId", "moduleId"])

    if (!result.valid) {
        return res.status(400).json({ message: result.message });
    }

    try {
        // Vérification des clés étrangères
        const checkFkeys = await checkForeignKeysExist([
            { table: "classes", id: classeId, label: "Classe" },
            { table: "modules", id: moduleId, label: "Module" },
        ])
        if(!checkFkeys.valid) {
            return res.status(400).json({ message: checkFkeys.message });
        }

        // Vérification de doublon
        const doublonCheck = `
            SELECT * FROM cours
            WHERE dateCours = $1 AND duree = $2  AND classeId = $3 AND moduleId = $4 AND id != $5
        `;
        const doublonResult = await pool.query(doublonCheck, [dateCours, duree, classeId, moduleId, id]);
        if (doublonResult.rowCount > 0) {
            return res.status(400).json({ message: "Un autre cours existe déjà avec cette combinaison date / classe / module." });
        }

        // Formatage de la date
        const f_dateCours = new Date(dateCours);
        if (isNaN(f_dateCours)) {
            return res.status(400).json({ message: "Date invalide" });
        }

        // Mise à jour
        const updateQuery = `
            UPDATE cours
            SET dateCours = $1, duree = $2, classeId = $3, moduleId = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [f_dateCours.toISOString(), duree, classeId, moduleId, id];
        const resultUpdate = await pool.query(updateQuery, values);

        if(resultUpdate.rowCount === 0) {
            return res.status(404).json({ message: "Cours non trouvé" });
        }

        res.status(200).json(result.rows[0])
    } catch (e) {
        res.status(500).json({message: 'Erreur serveur'});
    }
}


export default {
    getAllCours: getAll,
    getCoursById: getById,
    createCours,
    updateCours,
    deleteCours: remove
}