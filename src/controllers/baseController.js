import pool from "../config/db.js";
import {validatePayload} from "../utils/validator.js";
import {getSingularName} from "../utils/helpers.js";

export function baseController(tableName, requiredFields = []) {
    return {
        // GET ALL
        getAll: async (request, response) => {
            const table = getSingularName(tableName)
            try {
                const result = await pool.query(`SELECT * FROM ${tableName}`);
                response.json(result.rows);
            } catch (error) {
                console.error(`Erreur getAll ${table}`, error);
                response.status(500).json({ message: "Erreur serveur" });
            }
        },

        // GET BY ID
        getById: async (request, response) => {
            const table = getSingularName(tableName)
            const id = parseInt(request.params.id);
            try {
                const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
                if (result.rows.length === 0) {
                    return response.status(404).json({ message: `${table} non trouvé(e)` });
                }
                response.json(result.rows[0]);
            } catch (error) {
                console.error(`Erreur getById ${table}`, error);
                response.status(500).json({ message: "Erreur serveur" });
            }
        },

        // CREATE
        create: async (request, response) => {
            const table = getSingularName(tableName)
            try {
                const validation = validatePayload(request.body, requiredFields);
                if (!validation.valid) {
                    return response.status(400).json({ message: validation.message });
                }

                const fields = requiredFields;
                const values = fields.map(f => request.body[f]);
                const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");
                const columns = fields.join(", ");

                const whereClause = fields.map((f, i) => `${f} = $${i + 1}`).join(" AND ");
                const checkQuery = `SELECT * FROM ${tableName} WHERE ${whereClause} LIMIT 1`;
                const checkResult = await pool.query(checkQuery, values);

                if (checkResult.rows.length > 0) {
                    return response.status(400).json({ message: `${table} existe déjà avec ces données.` });
                }

                const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
                const result = await pool.query(query, values);

                response.status(201).json(result.rows[0]);
            } catch (error) {
                response.status(500).json({ message: "Erreur serveur" });
            }
        },

        // UPDATE
        update: async (request, response) => {
            const table = getSingularName(tableName)
            const id = parseInt(request.params.id);

            try {
                const validation = validatePayload(request.body, requiredFields);
                if (!validation.valid) {
                    return response.status(400).json({ message: validation.message });
                }

                const fields = requiredFields;
                const values = fields.map(f => request.body[f]);
                const assignments = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

                const whereClause = fields.map((f, i) => `${f} = $${i + 1}`).join(" AND ");
                const checkQuery = `SELECT * FROM ${tableName} WHERE ${whereClause} LIMIT 1`;
                const checkResult = await pool.query(checkQuery, values);

                if (checkResult.rows.length > 0) {
                    return response.status(400).json({ message: `${table} existe déjà avec ces données.` });
                }

                const query = `UPDATE ${tableName} SET ${assignments} WHERE id = $${fields.length + 1} RETURNING *`;
                const result = await pool.query(query, [...values, id]);

                if (result.rowCount === 0) {
                    return response.status(404).json({ message: `${table} non trouvé(e)` });
                }

                response.status(200).json(result.rows[0]);
            } catch (error) {
                response.status(500).json({ message: "Erreur serveur" });
            }
        },

        // DELETE
        delete: async (request, response) => {
            const table = getSingularName(tableName)
            const id = parseInt(request.params.id);

            try {
                const result = await pool.query(`DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, [id]);

                if (result.rowCount === 0) {
                    return response.status(404).json({ message: `${table} non trouvé(e)` });
                }

                response.json({ message: `${table} supprimé(e)` });
            } catch (error) {
                console.error(`Erreur delete ${table}`, error);
                response.status(500).json({ message: "Erreur serveur" });
            }
        }
    }
}