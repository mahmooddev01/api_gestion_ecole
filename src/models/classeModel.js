import {NiveauModel} from "./niveauModel";
import {FiliereModel} from "./filiereModel";

export class ClasseModel {
    constructor(id, libelle, niveauId, filiereId) {
        this.id = id;
        this.libelle = libelle;
        this.niveauId = niveauId;
        this.filiereId = filiereId;
    }
}