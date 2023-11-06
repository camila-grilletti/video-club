import express from 'express';
import controller from '../controllers/peliculas.controller.js';
const routerPeliculas = express.Router();

// CRUD: GET ALL
routerPeliculas.get('', controller.listarPeliculas);

// * Formulario de cración
routerPeliculas.get('/create', controller.formularioCreacionPeliculas);

// CRUD: GET ONE
routerPeliculas.get('/:id', controller.obtenerPeliculaPorId);

// CRUD: POST ONE
routerPeliculas.post('', controller.crearPelicula);

// * Formulario de edición
routerPeliculas.get('/edit/:id', controller.formularioEdicionPelicula);

// CRUD: UPDATE ONE
routerPeliculas.put('/:id', controller.actualizarPelicula);

// CRUD: DELETE ONE
routerPeliculas.delete('/:id', controller.eliminarPelicula);

export default routerPeliculas;