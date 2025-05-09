import TipoUsuario from '../models/TipoUsuarioModel.js';

// Obtener todos los tipos de usuario
export const getTipoUsuarios = async (req, res) => {
    try {
        const tipos = await TipoUsuario.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo tipo de usuario
export const createTipoUsuario = async (req, res) => {
    const { NombreTipoUsuario, DescripcionTipoUsuario } = req.body;
    try {
        const tipoUsuario = await TipoUsuario.create({ NombreTipoUsuario, DescripcionTipoUsuario });
        res.status(201).json({ message: 'Tipo de usuario creado exitosamente', tipoUsuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un tipo de usuario por ID
export const getTipoUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoUsuario = await TipoUsuario.findByPk(id);

        if (!tipoUsuario) {
            return res.status(404).json({ message: 'Tipo de usuario no encontrado' });
        }

        res.json(tipoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un tipo de usuario
export const updateTipoUsuario = async (req, res) => {
    const { id } = req.params;
    const { NombreTipoUsuario, DescripcionTipoUsuario } = req.body;
    try {
        const tipoUsuario = await TipoUsuario.findByPk(id);

        if (!tipoUsuario) {
            return res.status(404).json({ message: 'Tipo de usuario no encontrado' });
        }

        await tipoUsuario.update({ NombreTipoUsuario, DescripcionTipoUsuario });
        res.json({ message: 'Tipo de usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un tipo de usuario
export const deleteTipoUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoUsuario = await TipoUsuario.findByPk(id);

        if (!tipoUsuario) {
            return res.status(404).json({ message: 'Tipo de usuario no encontrado' });
        }

        await tipoUsuario.destroy();
        res.json({ message: 'Tipo de usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};