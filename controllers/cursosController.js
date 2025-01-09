const Curso = require('../models/Cursos');

async function addCurso(req, res){
    try{
        const {idioma, dia, horario, imagen, modalidad } = req.body;

        const curso = Curso({
            idioma,
            dia,
            horario,
            imagen,
            modalidad
        });

        if(req.file){
            const { filename } = req.file;
            curso.setImagen(filename);
        }

        const cursos = await curso.save();
        res.status(201).send({ cursos })
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getCursos(req, res) {
    try{
        const cursos = await Curso.find();
        res.status(200).send({cursos});
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function findCursos (req, res){
    try{
    const cursos = await Curso.findById(req.params.id)
    res.status(200).send({cursos})
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateCursos(req, res){
    try{
        const cursos = await Curso.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).send({cursos})
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteCursos(req, res){
    try{
        const curso = await Curso.findByIdAndDelete(req.params.id);
        if(!curso){
            return res.status(404).send({ message: 'Curso no encontrado' });
        }
        res.status(200).send({message: 'Curso eliminado exitosamente'});
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {addCurso, getCursos, findCursos, updateCursos, deleteCursos};

