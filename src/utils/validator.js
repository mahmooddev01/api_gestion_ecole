import {readTable} from "./helpers.js";

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
export const checkForeignKeysExist = (foreignKeys = []) => {
    for (const { table, id, label } of foreignKeys) {
        const data = readTable(table);
        const exists = data.some(item => item.id === id);
        if (!exists) {
            return {
                valid: false,
                message: `${label || table} inexistant(e)`,
            };
        }
    }
    return { valid: true };
};

export const validateAndCheckForeignKeys = (body, requiredFields, foreignKeys) => {
    const result = validatePayload(body, requiredFields);
    if (!result.valid) return result;

    const keysResult = checkForeignKeysExist(foreignKeys);
    if (!keysResult.valid) return keysResult;

    return { valid: true };
};
