import {ClasseModel} from "./classeModel";

export class EtudiantModel {
    constructor(id, nomComplet, matricule, adresse, login, password, classeId) {
        this.id = id;
        this.nomComplet = nomComplet;
        this.matricule = matricule;
        this.adresse = adresse;
        this.login = login;
        this.password = password;
        this.classeId = classeId;
    }
}