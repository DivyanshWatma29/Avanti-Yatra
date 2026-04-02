const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    templeId: { type: String, required: true },
    templeName: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    numberOfVisitors: { type: Number, default: 1 },
    status: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
    qrCode: { type: String },
    qrToken: { type: String },
    userName: { type: String },
    userEmail: { type: String },
    specialRequirements: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
