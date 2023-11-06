import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import mongoose from 'mongoose';
import routerPeliculas from './routers/peliculas.router.js';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';

// ! Configuraciones
const PORT = process.env.PORT || 8888;
const app = express();

// Express Handlebars

app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join('.', path.sep, 'views'));

// ! Middlewars
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// ! Rutas
app.use('/api/peliculas', routerPeliculas);

// ! Conexión a BD
mongoose.connect(process.env.URI_DB_LOCAL)
    .then(() => {
        console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch((error) => {
        console.log(`Error al conectar a MongoDB: ${process.env.URI_DB_LOCAL}, ${error}`);
    });


// ! Arranca servidor
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});