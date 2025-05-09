import express from "express";
import cors from "cors";
import db from "./database/db.js"; // Importa la conexión a la base de datos
import router from "./routes/routes.js"; // Importa las rutas
const app = express();

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Registrar las rutas
app.use('/api', router);


try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa');
} catch (error) {
    console.log('Error al conectarse a la base de datos:', error);
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Iniciar el servidor
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});