const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    phone: {
        type: String
    },
    email: {
        type: String
    },
    noOfGuests: {
        type: Number
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    comments: {
        type: String
    }
});
const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports.Reservation = Reservation;

module.exports.postCreateReservation = function(newReservation, callback) {
    newReservation.save(callback);
};
module.exports.putCreateReservation = function(id, updatedReservation, callback) {
    Reservation.findByIdAndUpdate(id, { $set: updatedReservation }, { new: true }, callback);

};

module.exports.removeReservationById = function(id, callback) {
    Reservation.findByIdAndRemove(id, callback);
};

module.exports.getReservations = function(callback) {
    Reservation.find(callback);
};

module.exports.getReservationById = function(id, callback) {
    Reservation.findById(id, callback);
};