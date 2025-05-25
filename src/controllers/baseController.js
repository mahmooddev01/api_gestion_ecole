import {readTable} from "../utils/helpers.js";

export function baseController(tableName) {
    return {
        // GET ALL
        getAll: (request, response) => {
            const data = readTable(tableName);
            response.status(200).json(data);
        },
        // GET BY ID
        getById: (request, response) => {
            const data = readTable(tableName);
            const idI = parseInt(request.params.id);
            const item = data.find(t => t.id === idI);
            if (!item) {
                // Je récupère le nom de la table, je supprime le dernier caractère(s) et je met en majuscule le premier caractère
                let tabName = tableName.slice(0, -1);
                tabName = tabName.charAt(0).toUpperCase() + tabName.slice(1);

                return response.status(404).json({message: `${tabName} non trouvé(e)`});
            }
            response.status(200).json(item);
        },
        // CREATE
        create: () => {

        },

        // UPDATE
        update: () => {

        },

        // DELETE
        delete: () => {

        }
    }
}