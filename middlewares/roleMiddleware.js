const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      try {
        const user = req.user; // Asegúrate de que el middleware de autenticación ya haya agregado `req.user`.
  
        if (!user || user.rol !== requiredRole) {
          return res.status(403).json({ message: 'Acceso denegado. No tienes permisos para acceder a esta ruta.' });
        }
  
        next(); // Continúa con el siguiente middleware o controlador
      } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
      }
    };
  };
  
  module.exports = roleMiddleware;
  