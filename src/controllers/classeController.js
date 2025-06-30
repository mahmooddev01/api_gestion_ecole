import {checkForeignKeysExist, validatePayload} from "../utils/validator.js";
import {baseController} from "./baseController.js";
import pool from "../config/db.js";

// GET ALL, GET BY ID
const { getAll, getById, delete: remove } = baseController('classes');

// CREATE
const createClasse = async (req, res) => {
    try {
        const { libelle, niveauId, filiereId } = req.body;
        // Vérification de la validité des champs
        const result = validatePayload(req.body, ["libelle", "niveauId", "filiereId"]);
        // Bloquer si invalide
        if(!result.valid) {
            return res.status(400).json({ message: result.message });
        }

        // Vérification des clés étrangères
        const checkFkeys = await checkForeignKeysExist([
            { table: "niveaux", id: niveauId, label: "Niveau" },
            { table: "filieres", id: filiereId,  label: "Filiere" },
        ]);
        if(!checkFkeys.valid) {
            return res.status(400).json({ message: checkFkeys.message });
        }

        // Vérification de doublon
        const doublonCheck = `
            SELECT * FROM classes
            WHERE libelle = $1 AND niveauId = $2 AND filiereId = $3
        `;
        const doublonResult = await pool.query(doublonCheck, [libelle, niveauId, filiereId]);

        if (doublonResult.rows.length > 0) {
            return res.status(400).json({ message: "Cette classe existe déjà." });
        }

        // Insertion dans la BD
        const insertQuery = `
            INSERT INTO classes (libelle, niveauId, filiereId)
            VALUES ($1, $2, $3)
            RETURNING *;`
        const values = [libelle,  niveauId, filiereId]
        const {rows} = await pool.query(insertQuery, values);

        res.status(201).json(rows[0]);
    } catch (e) {
        res.status(500).json({ message: "Erreur serveur" })
    }
}

// UPDATE
const updateClasse = async (req, res) => {
    const id = parseInt(req.params.id);
    const { libelle, niveauId, filiereId } = req.body;

    // Verification des champs requis
    const result = validatePayload(req.body, ["libelle", "niveauId", "filiereId"]);
    if (!result.valid) {
        return res.status(400).json({ message: result.message });
    }

    try {
        // Vérification des clés étrangères
        const checkFkeys = await checkForeignKeysExist([
            { table: "niveaux", id: niveauId, label: "Niveau" },
            { table: "filieres", id: filiereId,  label: "Filiere" },
        ]);
        if(!checkFkeys.valid) {
            return res.status(400).json({ message: checkFkeys.message });
        }

        // Vérification de doublon
        const doublonCheck = `
            SELECT * FROM classes
            WHERE libelle = $1 AND niveauId = $2 AND filiereId = $3 AND id != $4
        `;
        const doublonResult = await pool.query(doublonCheck, [libelle, niveauId, filiereId, id]);
        if (doublonResult.rowCount > 0) {
            return res.status(400).json({ message: "Une classe avec ce libellé existe déjà pour ce niveau et cette filière." });
        }

        // Mise à jour
        const updateQuery = `
            UPDATE classes
            SET libelle = $1, niveauId = $2, filiereId = $3
            WHERE id = $4
            RETURNING *
        `;
        const values = [libelle, niveauId, filiereId, id];
        const resultUpdate = await pool.query(updateQuery, values);

        if (resultUpdate.rowCount === 0) {
            return res.status(404).json({ message: "Classe non trouvée" });
        }

        res.status(200).json(resultUpdate.rows[0]);
    } catch (e) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};


export default {
    getAllClasses: getAll,
    getClassById: getById,
    createClasse,
    updateClasse,
    deleteClasse: remove
};
