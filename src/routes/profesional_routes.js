const express = require('express');
const router = express.Router();
const { verificarToken, autorizarRoles } = require('../middlewares/auth.middleware');

const {
    crearProfesional,
    listarProfesionales,
    actualizarProfesional,
    eliminarProfesional
} = require('../controllers/profesional_controller');

router.get('/', verificarToken, autorizarRoles('admin', 'usuario'), listarProfesionales);
router.post('/', verificarToken, autorizarRoles('admin'), crearProfesional);
router.put('/:id', verificarToken, autorizarRoles('admin'), actualizarProfesional);
router.delete('/:id', verificarToken, autorizarRoles('admin'), eliminarProfesional);

module.exports = router;
