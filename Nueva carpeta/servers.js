// Importar las bibliotecas necesarias
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para permitir solicitudes desde tu frontend
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Ruta para manejar las solicitudes al modelo GPT
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Enviar la respuesta de OpenAI al frontend
        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        console.error('Error al conectar con OpenAI:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
