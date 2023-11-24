import passport from '../config/passport.js';
import models from '../models/usuarios.model.js';

const showAuthFormSignUp = (req, res) => {    
    res.status(200).render('usuarios/signup')
};

const showAuthFormSignIn = (req, res) => {    
    res.status(200).render('usuarios/signin')
};

const signup = async (req, res) => {    
    try {
        const errors = [];
        const { name, email, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            errors.push({ msg: 'Las contraseñas no coinciden' });
        }

        if (password.length < 5) {
            errors.push({ msg: 'La contraseña debe tener al menos 5 caracteres' });
        }

        if (errors.length > 0) {
            return res.status(400).send("Hay errores: ", errors);
        }

        const userFound = await models.getUserByEmail(email);

        if (userFound) {
            errors.push({ msg: 'El email ya está registrado' });
            return res.status(400).send("Hay errores: ", errors);
        }

        const newUser = await models.createUser({ name, email, password });

        if (!newUser) {
            errors.push({ msg: 'No se pudo registrar el usuario' });
            return res.status(400).send("Hay errores: ", errors);
        }

        res.status(200).send('Se registró correctamente')
    } catch (error) {
        res.status(500).send('[signup] Error: ', error.message || 'Ocurrió un error]')
    }
};

const signin = passport.authenticate('local', {
    successRedirect: '/api/peliculas',
    failureRedirect: '/api/auth/signin'
});

const logout = (req, res, next) => {  
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/api/auth/signin');
    });
    res.send('Salió de la aplicación')
};


export default {    
    showAuthFormSignUp,
    showAuthFormSignIn,
    signup,
    signin,
    logout
}