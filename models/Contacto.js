const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: false },
  mensaje: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now },
});


const Contacto = mongoose.model('Contacto', contactoSchema, 'contactos');

module.exports = Contacto;
