// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Gestion École',
            version: '1.0.0',
            description: 'Documentation de l\'API de gestion académique',
        },
        servers: [
            {
                url: 'http://localhost:8080/api',
            },
        ],
    },
    apis: ['./src/routes/*js'], // Chemin vers les fichiers de routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
