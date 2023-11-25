import express from 'express';
const routerPublic = express.Router();
import controller from '../controllers/peliculas.controller.js';
import auth from '../middlewares/usuarios.middleware.js';

// Listado público
routerPublic.get('/', auth.isLogged, controller.listadoPublico);

export default routerPublic;