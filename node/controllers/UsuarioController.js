import Usuario from '../models/UsuarioModel.js';
import TipoUsuario from '../models/TipoUsuarioModel.js';
import jwt from 'jsonwebtoken';

// Cambia esto por una variable de entorno en producción
const SECRET = 'zKuL0Nehvm';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [{ model: TipoUsuario, attributes: ['NombreTipoUsuario'] }]
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    const { RutUsuario, CorreoUsuario, ContraseñaUsuario, idTipoUsuario } = req.body;
    try {
        const usuario = await Usuario.create({ RutUsuario, CorreoUsuario, ContraseñaUsuario, idTipoUsuario });
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN con JWT
export const loginUsuario = async (req, res) => {
    const { CorreoUsuario, ContraseñaUsuario } = req.body;
    try {
        const usuario = await Usuario.findOne({
            where: { CorreoUsuario, ContraseñaUsuario },
            include: [{ model: TipoUsuario, attributes: ['NombreTipoUsuario'] }]
        });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Crea el token JWT
        const token = jwt.sign(
            {
                id: usuario.idUsuario,
                correo: usuario.CorreoUsuario,
                tipo: usuario.idTipoUsuario
            },
            SECRET,
            { expiresIn: '2h' }
        );

        res.json({ usuario, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            include: [{ model: TipoUsuario, attributes: ['NombreTipoUsuario'] }]
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { RutUsuario, CorreoUsuario, ContraseñaUsuario, idTipoUsuario } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.update({ RutUsuario, CorreoUsuario, ContraseñaUsuario, idTipoUsuario });
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};