import mongoose from "mongoose";

// ! Schema (estructura del modelo)
const peliculasSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        }
    }
);

// ! Model (a partir del Schema)
const Pelicula = mongoose.model('peliculas', peliculasSchema);

// ! Métodos de interacción a la BD

const obtenerTodasLasPeliculas = async () => {
    try {
        const peliculas = await Pelicula.find().lean();
        return peliculas;
    } catch (error) {
        console.error(`[obtenerTodasLasPeliculas]: Error de lectura ${error}`);
        return null;
    };
};

const obtenerPeliculaPorId = async (id) => {
    try {
        const pelicula = await Pelicula.findById(id).lean();
        return pelicula;
    } catch (error) {
        console.error(`[obtenerPeliculaPorId]: Error al buscar película por id ${error}`);
        return null;
    };
};

const actualizarPelicula = async (id, peliculaEditada) => {
    try {
        const pelicula = await Pelicula.findByIdAndUpdate(id, peliculaEditada);
        return pelicula;
    } catch (error) {
        console.error(`[actualizarPelicula]: Error al actualizar película ${error}`);
        return null;
    };
};

const eliminarPelicula = async (id) => {
    try {
        const pelicula = await Pelicula.findByIdAndDelete(id);
        return pelicula;
    } catch (error) {
        console.error(`[actualizarPelicula]: Error al actualizar película ${error}`);
        return null;
    };
};

const guardarPelicula = async (nuevaPelicula) => {
    try {
        let pelicula = new Pelicula(nuevaPelicula);
        pelicula = await pelicula.save();
        return pelicula;
    } catch (error) {
        console.error(`[guardarPelicula]: Error al guardar película ${error}`);
        return null;
    };
};


export default {
    obtenerTodasLasPeliculas,
    obtenerPeliculaPorId,
    actualizarPelicula,
    guardarPelicula,
    eliminarPelicula
}