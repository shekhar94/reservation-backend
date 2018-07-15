const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const reservationModel = require('./models/reservation.model');
const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.use(bodyParser.json());
mongoose.connect(dbConfig.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to Database ' + dbConfig.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error ', err);
});


app.post('/reservation', (req, res, next) => {
    const newReservation = new reservationModel.Reservation(req.body);
    reservationModel.postCreateReservation(newReservation, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});

app.delete('/reservation/:id', (req, res, next) => {
    const id = req.params.id;
    reservationModel.removeReservationById(id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});

app.put('/reservation/:id', (req, res, next) => {
    const id = req.params.id;
    const newReservation = new reservationModel.Reservation(req.body);
    reservationModel.putCreateReservation(id, newReservation, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});

app.get('/reservation', (req, res, next) => {
    reservationModel.getReservations((err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});

app.get('/reservation/:id', (req, res, next) => {
    const id = req.params.id;
    reservationModel.getReservationById(id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});


app.listen(3000, () => {
    console.log(`listening on port 3000`);
})