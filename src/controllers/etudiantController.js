import {readTable, writeTable} from "../utils/helpers.js";
import {validateAndCheckForeignKeys} from "../utils/validator.js";
import {baseController} from "./baseController.js";


// GET ALL, GET BY ID, DELETE
const { getAll, getById, delete: remove } = baseController('etudiants');

// CREATE
const createEtudiant = (req, res) => {
    try {
        const { nomComplet, matricule, adresse, login, password, classeId } = req.body;

        const result = validateAndCheckForeignKeys(req.body,
            ["nomComplet", "matricule", "adresse", "login", "password", "classeId"],
            [
                { table: 'classes', id: classeId, label: 'Classe' }
                ]
        )

        if (!result.valid) {
            return res.status(400).json({ message: result.message });
        }

        const etudiants = readTable('etudiants');

        // Vérifier doublons matricule ou login
        const doublon = etudiants.find(e => e.matricule === matricule || e.login === login);
        if (doublon) {
            return res.status(400).json({ message: "Matricule ou login déjà utilisé." });
        }

        const id = etudiants.length > 0 ? Math.max(...etudiants.map(etu => etu.id)) + 1 : 1;

        const newEtudiant = {id, nomComplet, matricule, adresse, login, password, classeId};
        etudiants.push(newEtudiant);
        writeTable('etudiants', etudiants);

        res.status(200).json(newEtudiant);
    } catch (e) {
        console.error("Erreur creation etudiant :", e);
        res.status(500).json({message: 'Erreur serveur'});
    }
}

// UPDATE
const updateEtudiant = (req, res) => {
    const etudiants = readTable('etudiants');
    const id = parseInt(req.params.id);
    const index = etudiants.findIndex(etu => etu.id === id);

    if (index === -1) {
        return res.status(400).json({message: 'Etudiant non trouvé'});
    }

    const {nomComplet, matricule, adresse, login, password, classeId} = req.body;

    const result = validateAndCheckForeignKeys(req.body,
        ["nomComplet", "matricule", "adresse", "login", "password", "classeId"],
        [
            { table: 'classes', id: classeId, label: 'Classe' }
            ]
    )

    if (!result.valid) {
        return res.status(400).json({ message: result.message });
    }

    // 🔒 Vérifie qu'aucun autre étudiant n'a ce matricule ou login
    const doublon = etudiants.find(e =>
        e.id !== id && (e.matricule === matricule || e.login === login)
    );
    if (doublon) {
        return res.status(400).json({ message: "Matricule ou login déjà utilisé par un autre étudiant." });
    }

    etudiants[index] = {id, nomComplet, matricule, adresse, login, password, classeId};
    writeTable('etudiants', etudiants);
    res.status(200).json(etudiants[index]);
}


export default {
    getAllEtudiants: getAll,
    getEtudiantById: getById,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant: remove,
}