import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recréer __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utiliser le chemin vers le fichier JSON
export const dataPath = path.join(__dirname, '../data/db.json');

export function readData() {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
}

export function writeData(tab) {
    fs.writeFileSync(dataPath, JSON.stringify(tab, null, 2));
}

export function readTable(table) {
    const db = readData();
    return db[table] || [];
}

export function writeTable(tab, updatedtab) {
    const db = readData();
    db[tab] = updatedtab;
    writeData(db);
}

export const keyExist = (table, id) => {
    const list = readTable(table);
    return list.some(item => item.id === id);
};

export const generateId = (tableName) => {
    const data = readTable(tableName);
    return data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
};
