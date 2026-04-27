const express = require('express');
const router = express.Router();

const {
    crearProfesional,
    listarProfesionales,
    actualizarProfesional,
    eliminarProfesional
} = require('../controllers/profesional_controller');

router.post('/', crearProfesional);
router.get('/', listarProfesionales);
router.put('/:id', actualizarProfesional);
router.delete('/:id', eliminarProfesional);

module.exports = router;
