const express = require('express');
const Contacto = require('../models/Contacto'); 
const router = express.Router();


router.post('/contacto', async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body;

   
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Nombre, email y mensaje son obligatorios.' });
    }

    
    const nuevoContacto = new Contacto({ nombre, email, telefono, mensaje });
    await nuevoContacto.save();

    res.status(201).json({ message: 'Contacto creado con éxito', contacto: nuevoContacto });
  } catch (err) {
    console.error('Error al crear contacto:', err);
    res.status(500).json({ error: 'Error al crear contacto', details: err.message });
  }
});

module.exports = router;
