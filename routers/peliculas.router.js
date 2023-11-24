import express from 'express';
import controller from '../controllers/peliculas.controller.js';
import isAuthenticated from '../middlewares/usuarios.middleware.js';
const routerPeliculas = express.Router();

// CRUD: GET ALL
routerPeliculas.get('', controller.listarPeliculas);

// * Formulario de cración
routerPeliculas.get('/create', isAuthenticated, controller.formularioCreacionPeliculas);

// CRUD: GET ONE
routerPeliculas.get('/:id', controller.obtenerPeliculaPorId);

// CRUD: POST ONE
routerPeliculas.post('', isAuthenticated, controller.crearPelicula);

// * Formulario de edición
routerPeliculas.get('/edit/:id', isAuthenticated, controller.formularioEdicionPelicula);

// CRUD: UPDATE ONE
routerPeliculas.put('/:id', isAuthenticated, controller.actualizarPelicula);

// CRUD: DELETE ONE
routerPeliculas.delete('/:id', isAuthenticated, controller.eliminarPelicula);

export default routerPeliculas;