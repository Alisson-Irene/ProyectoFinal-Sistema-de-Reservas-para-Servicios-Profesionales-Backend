const express = require('express');
const router = express.Router();

const {
    crearReserva,
    listarReservas
} = require('../controllers/reserva_controller');

router.post('/', crearReserva);
router.get('/', listarReservas);


module.exports = router;