import express from 'express';
import filiereRoutes from "./src/routes/filiereRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Bienvenue sur l'API de Gestion Ecole"})
});

app.use('/api/filieres', filiereRoutes);

app.listen(port, () => {
    console.log(`Serveur en cours d'execution sur http://localhost:${port}`);
});