const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        const { name, email, password } = req.body;

        try{
            console.log('Antes de crear el ausuario:', { name, email, password });

            if(!username || !email || !password){
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }

            const user = new User({ name, email, password });
            await user.save();

            console.log('Después de crear el usuario', user);
            res.status(201).json({ message: 'Usuario creado correctamente' });
        } catch(error){
            console.log('Error al registrar el usuario', error);
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
},
    login: async (req, res) => {
        const { email, password } = req.body;
        try{
            console.log('Antes de buscar el ausuario:', {username});
            const user = await User.findOne({ username });
            console.log('Usuario encontrado:', user);

            if(!user){
                console.log('Usuario no encontrado')
                return res.status(404).json({ message: 'Error de datos' });
            }
            const match = await bcrypt.compare(password, user.password);
            console.log('Contraseña correcta:', match);
            if(!match){
                console.log('Contraseña incorrecta')
                return res.status(401).json({ message: 'Error de contraseña' });
            }   
            const secretKey = process.env.SECRET_KEY || 'defaultsecret';
            const token = jwt.sign({ id: user.id}, secretKey, {expiresIn: '1h'});
            console.log('Token generado:', token);

            console.log('Inicio de sesión exitoso para el usuaro', user);
            res.status(200).json({ token });
            } catch(error){
                console.log('Error al iniciar sesión', error);
                res.status(500).json({ message: 'Error al iniciar sesión' });
            }
            }
};

module.exports = userController;