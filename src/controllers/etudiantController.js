import {checkForeignKeysExist, validatePayload} from "../utils/validator.js";
import {baseController} from "./baseController.js";
import pool from "../config/db.js";


// GET ALL, GET BY ID, DELETE
const { getAll, getById, delete: remove } = baseController('etudiants');

// CREATE
const createEtudiant = async (req, res) => {
    try {
        const { nomComplet, matricule, adresse, login, password, classeId } = req.body;
        // Validation des champs obligatoire
        const result = validatePayload(req.body,["nomComplet", "matricule", "adresse", "login", "password", "classeId"])
        // BLoquer si invalide
        if (!result.valid) {
            return res.status(400).json({ message: result.message });
        }

        // Vérification des clés étrangères
        const checkFkeys = await checkForeignKeysExist([
            { table: "classes", id: classeId, label: "Classe" }
        ])
        if (!checkFkeys.valid) {
            return res.status(400).json({ message: checkFkeys.message });
        }

        const values = [nomComplet, matricule, adresse, login, password, classeId];
        // Vérification de doublon
        const doublonCheck = `
            SELECT * FROM etudiants
            WHERE matricule = $1 OR login = $2
        `;
        const alreadyExists = await pool.query(doublonCheck, [matricule, login]);
        if (alreadyExists.rows.length > 0) {
            return res.status(400).json({ message: "Login ou matricule déjà utilisé" });
        }

        // Insertion dans la BD
        const insertQuery = `
            INSERT INTO etudiants (nomComplet, matricule, adresse, login, password, classeId)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const {rows} = await pool.query(insertQuery, values);

        res.status(201).json(rows[0]);
    } catch (e) {
        res.status(500).json({message: 'Erreur serveur'});
    }
}

// UPDATE
const updateEtudiant = async (req, res) => {
    const id = parseInt(req.params.id);
    const {nomComplet, matricule, adresse, login, password, classeId} = req.body;
    // Validation des champs requis
    const result = validatePayload(req.body,["nomComplet", "matricule", "adresse", "login", "password", "classeId"] )

    if (!result.valid) {
        return res.status(400).json({ message: result.message });
    }

    try {
        // Vérification des clés étrangères
        const checkFkeys = await checkForeignKeysExist([
            { table: "classes", id: classeId, label: "Classe" }
        ]);
        if (!checkFkeys.valid) {
            return res.status(400).json({ message: checkFkeys.message });
        }

        // Vérification du doublon
        const doublonCheck = `
            SELECT * FROM etudiants
            WHERE (matricule = $1 OR login = $2) AND id != $3
        `;
        const alreadyExists = await pool.query(doublonCheck, [matricule, login, id]);
        if (alreadyExists.rows.length > 0) {
            return res.status(400).json({ message: "Login ou matricule déjà utilisé" });
        }

        // Mise à jour
        const updateQuery = `
            UPDATE etudiants
            SET nomComplet = $1, matricule = $2, adresse = $3, login = $4, password = $5, classeId = $6
            WHERE id = $7
            RETURNING *
        `;
        const values = [nomComplet, matricule, adresse, login, password, classeId, id];
        const resultUpdate = await pool.query(updateQuery, values);

        if (resultUpdate.rowCount === 0) {
            return res.status(404).json({ message: "Etudiant non trouvé" });
        }

        res.status(200).json(resultUpdate.rows[0]);
    } catch (e) {
        res.status(500).json({ message: "Erreur serveur" });
    }
}


export default {
    getAllEtudiants: getAll,
    getEtudiantById: getById,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant: remove,
}