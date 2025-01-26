const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  // Registro de usuario
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      const user = new User({ username, email, password }); // Rol se asignará por defecto como 'User'
      await user.save();

      res.status(201).json({ message: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  },

  // Inicio de sesión
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Verificar si el usuario existe
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      // Generar un token
      const secretKey = process.env.SECRET_KEY || "defaultsecret";
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          rol: user.rol, // Incluimos el rol en el token
        },
        secretKey,
        { expiresIn: "1h" }
      );

      // Devolver el token y los datos del usuario
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          rol: user.rol, // Incluimos el rol en la respuesta
        },
      });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  },
};

module.exports = userController;
