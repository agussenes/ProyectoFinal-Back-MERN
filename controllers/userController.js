const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    

    try {
      console.log('Antes de crear el usuario:', { username, email, password });

       
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const user = new User({ username, email, password });
      await user.save();

      console.log('Después de crear el usuario:', user);
      res.status(201).json({ message: 'Usuario registrado con éxito' });

    } catch (error) {
      console.error('Error al registrar usuario:', error);

      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      console.log('Cuerpo de la solicitud:', req.body);
      console.log('Antes de buscar el usuario:', { username });

      const user = await User.findOne({ username });
      console.log('Usuario encontrado:', user);

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }


      const secretKey = process.env.SECRET_KEY || 'defaultsecret';
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      console.log('Token generado:', token);

      console.log('Inicio de sesión exitoso para el usuario:', user);

      
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);

      res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
  },
  
};

module.exports = userController;