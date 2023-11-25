import express from 'express';
import controller from '../controllers/peliculas.controller.js';
import auth from '../middlewares/usuarios.middleware.js';
const routerPeliculas = express.Router();

// CRUD: GET ALL
routerPeliculas.get('', auth.isLogged, auth.isAuthenticated, controller.listarPeliculas);

// * Formulario de cración
routerPeliculas.get('/create', auth.isLogged, auth.isAuthenticated, controller.formularioCreacionPeliculas);

// CRUD: GET ONE
routerPeliculas.get('/:id', auth.isLogged, controller.obtenerPeliculaPorId);

// CRUD: POST ONE
routerPeliculas.post('', auth.isLogged, auth.isAuthenticated, controller.crearPelicula);

// * Formulario de edición
routerPeliculas.get('/edit/:id', auth.isLogged, auth.isAuthenticated, controller.formularioEdicionPelicula);

// CRUD: UPDATE ONE
routerPeliculas.put('/:id', auth.isLogged, auth.isAuthenticated, controller.actualizarPelicula);

// CRUD: DELETE ONE
routerPeliculas.delete('/:id', auth.isLogged, auth.isAuthenticated, controller.eliminarPelicula);

export default routerPeliculas;