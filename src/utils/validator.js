import pool from "../config/db.js";

// Vérifier si le payload est valide
export const validatePayload = (body, requiredFields = []) => {
    for (const field of requiredFields) {
        if (!body[field]) {
            return {
                valid: false,
                message: `Le champ "${field}" est requis.`,
            };
        }
    }
    return { valid: true };
};

// Vérifier si les clés étrangères sont valides
export const checkForeignKeysExist = async (foreignKeys = []) => {
    for (const { table, id, label } of foreignKeys) {
        const query = `SELECT * FROM ${table} WHERE id = $1 LIMIT 1`;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return {
                valid: false,
                message: `${label || table} inexistant(e)`,
            };
        }
    }
    return { valid: true };
};

export const validateAndCheckForeignKeys = async (body, requiredFields, foreignKeys) => {
    const result = validatePayload(body, requiredFields);
    if (!result.valid) return result;

    const keysResult = await checkForeignKeysExist(foreignKeys);
    if (!keysResult.valid) return keysResult;

    return { valid: true };
};
