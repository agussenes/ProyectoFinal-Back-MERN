const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado. Acceso denegado.' });
  }

  try {
    const secretKey = process.env.SECRET_KEY || 'defaultsecret';
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Adjunta los datos del usuario a la solicitud
    next(); // Continúa con el siguiente middleware o controlador
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = authenticateToken;
