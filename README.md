
# 📘 API Gestion École

Cette API a pour objectif de gérer les différentes entités académiques d'un établissement scolaire : **classes**, **filières**, **niveaux**, **modules**, et **cours**. Elle est construite avec **Node.js**, **Express** et utilise un fichier `db.json` comme base de données (stockage local).

## ✅ Fonctionnalités déjà implémentées

### 🔹 Classes
- [x] Liste de toutes les classes
- [x] Afficher une classe par ID
- [x] Ajouter une classe
- [x] Modifier une classe
- [x] Supprimer une classe

### 🔹 Filières
- [x] Liste des filières
- [x] Ajouter, modifier et supprimer une filière

### 🔹 Niveaux
- [x] Liste des niveaux
- [x] Ajouter, modifier et supprimer un niveau

### 🔹 Modules
- [x] Liste des modules
- [x] Ajouter, modifier et supprimer un module

### 🔹 Cours
- [x] Ajouter un cours
- [x] Lister tous les cours
- [x] Lier un cours à une classe, un module et un niveau

---

## 🛠️ Technologies utilisées

- Node.js
- Express
- ES Modules
- JSON File (via `fs`) pour simuler une base de données
- Nodemon (en développement)

---

## 📁 Structure du projet

```
.
├── app.js
├── /src
│   ├── controllers/   # Logique métier pour chaque entité
│   ├── routes/        # Définition des routes Express
│   ├── utils/         # Fonctions utilitaires (lecture/écriture DB)
│   └── data/db.json   # Base de données locale
```

---

## 🚀 Lancer le projet

```bash
npm install
npm start   # ou npx nodemon app.js
```

Le serveur sera accessible à l’adresse :  
📍 `http://localhost:8080`

---

## 🧪 Exemples de requêtes HTTP

### ▶️ Ajouter une classe

```http
POST http://localhost:8080/api/classes
Content-Type: application/json

{
  "libelle": "L2 DWM",
  "filiereId": 1,
  "niveauId": 2
}
```

### 🔄 Modifier une classe

```http
PUT http://localhost:8080/api/classes/4
Content-Type: application/json

{
  "libelle": "L1 DN",
  "filiereId": 3,
  "niveauId": 1
}
```

---

## 📌 Routes principales

| Ressource | Méthode | URL                          | Description                   |
|-----------|---------|------------------------------|-------------------------------|
| Classes   | GET     | `/api/classes`               | Lister toutes les classes     |
| Classes   | GET     | `/api/classes/:id`           | Obtenir une classe            |
| Classes   | POST    | `/api/classes`               | Créer une classe              |
| Classes   | PUT     | `/api/classes/:id`           | Modifier une classe           |
| Classes   | DELETE  | `/api/classes/:id`           | Supprimer une classe          |
| Filières  | idem    | `/api/filieres...`           | Même principe                 |
| Niveaux   | idem    | `/api/niveaux...`            | Même principe                     |
| Modules   | idem    | `/api/modules...`            | Même principe                              |
| Cours     | en cours| `/api/cours...`              | Même principe                         |

---

## ✍️ Auteur

Développé par **Mahmood_dev01** – Étudiant L3 passionné par le développement d'API backend et la structuration des données académiques.

---

## 📄 Licence

Ce projet est open-source – libre à toi de le réutiliser et l'améliorer !
