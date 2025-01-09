const express = require('express');
const api = express.Router();
const upload = require('../libs/storage');

const {addCurso, getCursos, findCursos, updateCursos, deleteCursos} = require('../controllers/cursosController');

api.get('/cursos', getCursos );
api.post('/cursos', upload.single('imagen'), addCurso);
api.get('/cursos/:id', findCursos);
api.put('/cursos/:id', upload.single('imagen'), updateCursos);
api.delete('/cursos/:id', deleteCursos);

module.exports = api;