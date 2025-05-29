import {getSingularName, readTable, writeTable} from "../utils/helpers.js";
import {request, response} from "express";

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
                const tabName = getSingularName(tableName);
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
        delete: (request, response) => {
            const id = parseInt(request.params.id);
            const data = readTable(tableName);
            const index = data.findIndex(t => t.id === id);
            const tabName = getSingularName(tableName);

            if (index === -1) {
                return response.status(404).json({ message: `${tabName} non trouvé(e)` });
            }

            const removedItem = data.splice(index, 1);
            writeTable(tableName, data);

            return response.status(200).json({
                message: `${tabName} supprimé(e)`,
                [tabName.toLowerCase()]: removedItem[0]
            });
        }

    }
}