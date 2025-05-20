import jwt from 'jsonwebtoken';

// Usa la misma clave secreta que en tu controlador
const SECRET = 'zKuL0Nehvm';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Espera formato: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;