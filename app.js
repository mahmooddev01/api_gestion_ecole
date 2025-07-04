import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger.js";

import filiereRoutes from "./src/routes/filiereRoutes.js";
import niveauRoutes from "./src/routes/niveauRoutes.js";
import moduleRoutes from "./src/routes/moduleRoutes.js";
import classeRoutes from "./src/routes/classeRoutes.js";
import etudiantRoutes from "./src/routes/etudiantRoutes.js";
import coursRoutes from "./src/routes/coursRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Bienvenue sur l'API de Gestion Ecole"})
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/filieres', filiereRoutes);
app.use('/api/niveaux', niveauRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/classes', classeRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/cours', coursRoutes);


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
    console.log(`Documentation Swagger : http://localhost:${port}/api-docs`);
});