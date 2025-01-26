const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

// Rutas protegidas
router.get('/admin', authenticateToken, roleMiddleware('Admin'), (req, res) => {
  res.status(200).json({ message: `Bienvenido, Admin ${req.user.username}` });
});

router.get('/user-panel', authenticateToken, roleMiddleware('User'), (req, res) => {
  res.status(200).json({ message: `Bienvenido, Usuario ${req.user.username}` });
});

module.exports = router;
