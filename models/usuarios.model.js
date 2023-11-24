import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UsuarioSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true, // * Crea automáticamente las propiedades createdAt y updatedAt
        versionKey: false // * Quita el field __v que agrega mongo
    }
);

// ! Métodos Mongoose

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // * Genera un hash de 10 caracteres
    return await bcrypt.hash(password, salt); // * Encripta la contraseña
};

UsuarioSchema.methods.matchPassword = async function (password) { // ! No usar arrow function, porque no se puede acceder al this
    return await bcrypt.compare(password, this.password); // * Compara la contraseña ingresada con la contraseña encriptada
};

const UsuarioModelo = mongoose.model('usuarios', UsuarioSchema);

// ! Métodos de interacción a la BD

const getUserByEmail = async (email) => {
    try {
        const userFound = await UsuarioModelo.findOne({ email: email });
        return userFound;
    } catch (error) {
        console.log('[getUserByEmail] Error: ', error);
    }
};

const createUser = async (nuevoUsuario) => {
    try {
        const usuarioCreado = new UsuarioModelo(nuevoUsuario);
        usuarioCreado.password = await usuarioCreado.encryptPassword(usuarioCreado.password);
        await usuarioCreado.save();
        return usuarioCreado;
    } catch (error) {
        console.log('[createUser] Error: ', error);
    }
};

const checkUserPassword = async (usuario, password) => {
    try {
        const isMatch = await usuario.matchPassword(password);
        return isMatch;
    } catch (error) {
        console.log('[checkUserPassword] Error: ', error);
    }
};

const getUserById = async (id) => {
    try {
        const usuario = await UsuarioModelo.findById(id);
        return usuario;
    } catch (error) {
        console.log('[getUserById] Error: ', error);
    }
};

export default {
    getUserByEmail,
    createUser,
    checkUserPassword,
    getUserById
}