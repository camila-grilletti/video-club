import express from 'express';
const routerPublic = express.Router();
import controller from '../controllers/peliculas.controller.js';

// Listado público
routerPublic.get('/', controller.listadoPublico);

export default routerPublic;