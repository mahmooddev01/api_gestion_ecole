
# 📘 API Gestion École

Cette API a pour objectif de gérer les différentes entités académiques d'un établissement scolaire : **classes**, **filières**, **niveaux**, **modules**, et **cours**. Elle est construite avec **Node.js**, **Express** et utilise un fichier `db.json` comme base de données (stockage local).

## ✅ Fonctionnalités déjà implémentées

### 📘 Classes
- [x] Lister toutes les classes
- [x] Obtenir une classe par ID
- [x] Ajouter une classe (avec vérification de doublon et des clés étrangères)
- [x] Modifier une classe
- [x] Supprimer une classe

### 🧩 Filières
- [x] CRUD complet

### 🧱 Niveaux
- [x] CRUD complet

### 📚 Modules
- [x] CRUD complet (avec détection de doublons)

### 👨‍🎓 Étudiants
- [x] Ajouter un étudiant avec vérification FK + doublon (matricule/login)
- [x] Modifier un étudiant
- [x] Supprimer un étudiant
- [x] Lister tous les étudiants

### 📅 Cours
- [x] CRUD complet avec validation de la date et des clés étrangères
- [x] Vérification de l’unicité d’un cours (classe/module/date)

---

## 🛠️ Technologies utilisées

- **Node.js**
- **Express**
- **ES Modules**
- **PostgreSQL** via `pg`
- **Nodemon** pour le développement

---

## 🧠 Logique de validation

- 🔒 `validatePayload`: vérifie que tous les champs requis sont présents
- 🔗 `checkForeignKeysExist`: valide l’existence des relations (`classeId`, `moduleId`, etc.)
- ⚠️ Vérification de **doublons** avant insert ou update

---

## 📁 Structure du projet

```
.
├── app.js
├── /src
│   ├── config/             # Connexion à la base de données PostgreSQL
│   ├── controllers/        # Logique métier (par entité)
│   ├── routes/             # Définition des endpoints Express
│   ├── utils/              # Fonctions génériques : validations, helpers
│   └── baseController.js   # Générateur CRUD dynamique
├── swagger.js              # Configuration Swagger
```

---

## 🚀 Lancer le projet

```bash
npm install
npm start   # ou npx nodemon app.js
```

Le serveur sera accessible à l’adresse :  
📍 `http://localhost:4000`

---

## 🧪 Exemples de requêtes HTTP

### ▶️ Ajouter une classe

```http
POST /api/classes
Content-Type: application/json

{
  "libelle": "L2 DWM",
  "filiereId": 1,
  "niveauId": 2
}
```

### 🔄 Modifier une classe

```http
PUT /api/classes/4
Content-Type: application/json

{
  "libelle": "L1 DN",
  "filiereId": 3,
  "niveauId": 1
}
```

---

## 📌 Routes principales

| Ressource | Méthode | URL                 | Description                   |
|-----------|---------|---------------------|-------------------------------|
| Classes   | GET     | `/api/classes`      | Lister toutes les classes     |
| Classes   | GET     | `/api/classes/:id`  | Obtenir une classe            |
| Classes   | POST    | `/api/classes`      | Créer une classe              |
| Classes   | PUT     | `/api/classes/:id`  | Modifier une classe           |
| Classes   | DELETE  | `/api/classes/:id`  | Supprimer une classe          |
| Filières  | idem    | `/api/filieres...`  | Même principe                 |
| Niveaux   | idem    | `/api/niveaux...`   | Même principe                 |
| Modules   | idem    | `/api/modules...`   | Même principe                 |
| Etudiants | idem    | `/api/etudiants...` | Même principe                 |
| Cours     | idem    | `/api/cours...`     | Même principe                 |

---

## ✍️ Auteur

Développé par **Mahmood_dev01** – Étudiant L3 passionné par le développement d'API backend et la structuration des données académiques.

---

## 📄 Licence

Ce projet est open-source – libre à toi de le réutiliser et l'améliorer !
