import models from '../models/usuarios.model.js';
import passport from "passport";
import { Strategy } from "passport-local";

// ! Configuración de strategy

const fieldStrategy = { usernameField: 'email' };

const comprobacionUsuario = async (email, password, done) => {
    try {
        const usuario = await models.getUserByEmail(email);
        
        if (!usuario) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        const passwordCorrecto = await models.checkUserPassword(usuario, password);

        if (!passwordCorrecto) {
            return done(null, false, { message: 'No coincide el password' });
        }

        return done(null, usuario);
    } catch (error) {
        console.log('[comprobacionUsuario] Error: ', error);
    }
};

const estrategiaLocal = new Strategy(fieldStrategy, comprobacionUsuario);

export default passport.use(estrategiaLocal);

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser( async (id, done) => {
    const usuario = await models.getUserById(id);
    done(null, usuario);
});