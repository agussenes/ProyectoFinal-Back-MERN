const mongoose = require('mongoose');
const { appConfig } = require('../config');

const productoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        categoria: { type: String, required: true },
        descripcion: { type: String, required: true },
        imagen: { type: String } // Puede no ser obligatorio si no siempre hay imágenes
    },
    {
        timestamps: true // Para incluir createdAt y updatedAt automáticamente
    }
);

productoSchema.methods.setImagen = function setImagen(filename) {
    const { host, port } = appConfig; // Verifica que `host` y `port` sean correctos
    this.imagen = `${host}:${port}/public/${filename}`;
};


const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
