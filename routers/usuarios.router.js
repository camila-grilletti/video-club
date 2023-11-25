import express from 'express';
import controller from '../controllers/usuarios.controller.js';
import auth from '../middlewares/usuarios.middleware.js';
const routerUsuarios = express.Router();

routerUsuarios.get('/signup', auth.isLogged, controller.showAuthFormSignUp); // ! Formulario de registro
routerUsuarios.post('/signup', auth.isLogged, controller.signup);
routerUsuarios.get('/signin', auth.isLogged, controller.showAuthFormSignIn); // ! Formulario de inicio de sesión
routerUsuarios.post('/signin', auth.isLogged, controller.signin); 
routerUsuarios.get('/logout', auth.isLogged, controller.logout); // ! Cerrar sesión

export default routerUsuarios;