const express = require('express');
const router = express.Router();
const reservationModel = require('../models/reservation.model');

router.post('/', (req, res) => {
    const newReservation = new reservationModel.Reservation(req.body);
    const returnStatus = reservationModel.postCreateReservation(newReservation, () => {
        res.send(returnStatus);
    });
});

module.exports.reservationRouter = router;