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

export function readTable(table) {
    const db = readData();
    return db[table] || [];
}

export function writeData(tab) {
    fs.writeFileSync(dataPath, JSON.stringify(tab, null, 2));
}
