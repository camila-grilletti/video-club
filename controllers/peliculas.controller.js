import modelo from '../models/peliculas.model.js';

const listadoPublico = async (req, res) => {
    try {
        const peliculas = await modelo.obtenerTodasLasPeliculas();
        const data = { peliculas };
        res.status(200).render('public', data);
    } catch (error) {
        console.log(`[listadoPublico]: Error listando peliculas ${error}`);
        res.status(500).send({ mensaje: `[listadoPublico]: Error listando peliculas ${error}` });
    }
};

const listarPeliculas = async (req, res) => {

    const user = req.user?.name;
    const email = req.user?.email;

    try {
        const peliculas = await modelo.obtenerTodasLasPeliculas();
        const data = { peliculas, user, email };
        res.status(200).render('index', data);
    } catch (error) {
        console.log(`[listarPeliculas]: Error listando peliculas ${error}`);
        res.status(500).send({ mensaje: `[listarPeliculas]: Error listando peliculas ${error}` });
    }
};

const formularioCreacionPeliculas = (req, res) => {
    res.render('peliculas/create');
};

const obtenerPeliculaPorId = (req, res) => {
    res.send('READ ONE: GET ONE');
};

const crearPelicula = async (req, res) => {
    const nuevaPelicula = {
        title: req.body.title,
        year: req.body.year
    }

    const peliculaCreada = await modelo.guardarPelicula(nuevaPelicula);

    if (!peliculaCreada) {
        res.status(500).send({ mensaje: `[crearPelicula]: Error al crear pelicula ${error}` });
    }

    res.status(201).redirect('/api/peliculas');
};

const formularioEdicionPelicula = async (req, res) => {
    try {
        const pelicula = await modelo.obtenerPeliculaPorId(req.params.id);

        if (!pelicula) {
            return res.status(404).send({ mensaje: 'No se encontró la película' });
        }

        const { title, year, _id } = pelicula;
        res.status(200).render('peliculas/edit', { pelicula });
    } catch (error) {
        res.status(500).send({ mensaje: `[formularioEdicionPelicula]: Error ${error}` });
    }
};

const actualizarPelicula = async (req, res) => {
    const { id } = req.params;
    const pelicula = req.body;

    try {
        const peliculaEditada = await modelo.actualizarPelicula(id, pelicula);

        if (!peliculaEditada) {
            return res.status(404).send({ mensaje: 'No se encontró la película' });
        }
        res.redirect('/api/peliculas');
    } catch (error) {
        res.status(500).send({ mensaje: `[actualizarPelicula]: Error ${error}` });
    }
};

const eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    
    try {
        const pelicula = await modelo.eliminarPelicula(id);

        if (!pelicula) {
            return res.status(404).send({ mensaje: 'No se encontró la película' });
        }
        res.redirect('/api/peliculas');
    } catch (error) {
        res.status(500).send({ mensaje: `[eliminarPelicula]: Error ${error}` });
    }
};

export default {
    listarPeliculas,
    formularioCreacionPeliculas,
    obtenerPeliculaPorId,
    crearPelicula,
    formularioEdicionPelicula,
    actualizarPelicula,
    eliminarPelicula,
    listadoPublico
}