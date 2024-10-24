import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/index.js';
import connectDB from './config/db.js';
import cors from 'cors';

// Conexión a MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas de la aplicación
app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`corriendo en el puerto ${port}`);
});
