import express from 'express';
import controller from '../controllers/usuarios.controller.js';
const routerUsuarios = express.Router();

routerUsuarios.get('/signup', controller.showAuthFormSignUp); // ! Formulario de registro
routerUsuarios.post('/signup', controller.signup);
routerUsuarios.get('/signin', controller.showAuthFormSignIn); // ! Formulario de inicio de sesión
routerUsuarios.post('/signin', controller.signin); 
routerUsuarios.get('/logout', controller.logout); // ! Cerrar sesión

export default routerUsuarios;