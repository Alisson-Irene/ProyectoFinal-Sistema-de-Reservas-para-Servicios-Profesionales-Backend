const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
    crearHorario,
    listarHorarios
} = require('../controllers/horario_controller');

router.get('/', verificarToken, autorizarRoles('admin', 'usuario'), listarHorarios);
router.post('/', verificarToken, autorizarRoles('admin'), crearHorario);

module.exports = router;
