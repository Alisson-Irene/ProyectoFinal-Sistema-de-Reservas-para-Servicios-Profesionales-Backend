const express = require('express');
const router = express.Router();

const {
    crearProfesional,
    listarProfesionales
} = require('../controllers/profesional_controller');

router.post('/', crearProfesional);
router.get('/', listarProfesionales);

module.exports = router;