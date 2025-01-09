const mongoose = require('mongoose');
const { appConfig } = require('../config');

const cursoSchema = new mongoose.Schema(
    {
        idioma: String,
        dia: String,
        horario: String,
        imagen: String,
        modalidad: String
    },
    {
        timestamps: true
    }
   
);

cursoSchema.methods.setImagen = function setImagen(filename){
   const { host, port } = appConfig;
    this.imagen = `${host}:${port}/public/${filename}`
}

const Curso = mongoose.model('curso', cursoSchema);

module.exports = Curso;
