import express from 'express';
import 'dotenv/config';
import path from 'node:path';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import * as passportStrategy from './config/passport.js';

import routerUsuarios from './routers/usuarios.router.js';
import routerPeliculas from './routers/peliculas.router.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';
import routerPublic from './routers/public.router.js';
import auth from './middlewares/usuarios.middleware.js';

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

// ! -------- express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.URI_DB_REMOTA })
}));

// ! -------- passport
app.use(passport.initialize());
app.use(passport.session());

// ! Rutas
app.use('/', routerPublic);
app.use('/api/peliculas', routerPeliculas);
app.use('/api/auth', routerUsuarios);
app.use('*', auth.isLogged, (req, res) => {
    res.render('404', { user: res.locals.user });
});

// TODO: Ruta para todos con error 404

// ! Conexión a BD
mongoose.connect(process.env.URI_DB_REMOTA)
    .then(() => {
        console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch((error) => {
        console.log(`Error al conectar a MongoDB: ${process.env.URI_DB_REMOTA}, ${error}`);
    });


// ! Arranca servidor
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});