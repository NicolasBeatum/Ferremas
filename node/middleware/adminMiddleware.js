import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';

const SECRET = 'zKuL0Nehvm';

const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    
    // Buscar el usuario en la base de datos para verificar su tipo
    const usuario = await Usuario.findByPk(decoded.idUsuario);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que sea administrador (idTipoUsuario = 3)
    if (usuario.idTipoUsuario !== 3) {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden acceder a esta función.' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

export default adminMiddleware; 