const express = require('express');
const router = express.Router();

const {
    crearHorario,
    listarHorarios
} = require('../controllers/horario_controller');

router.post('/', crearHorario);
router.get('/', listarHorarios);

module.exports = router;