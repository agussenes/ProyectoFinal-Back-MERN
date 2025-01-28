const express = require('express');
const Contacto = require('../models/Contacto'); // Caminho para o modelo de Contato
const router = express.Router();

// Rota para criar um novo contato
router.post('/contacto', async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body;

    // Verificar se os campos obrigatórios estão preenchidos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Nombre, email y mensaje son obligatorios.' });
    }

    // Criar um novo contato
    const nuevoContacto = new Contacto({ nombre, email, telefono, mensaje });
    await nuevoContacto.save();

    res.status(201).json({ message: 'Contacto creado con éxito', contacto: nuevoContacto });
  } catch (err) {
    console.error('Error al crear contacto:', err);
    res.status(500).json({ error: 'Error al crear contacto', details: err.message });
  }
});

module.exports = router;
