const mongoose = require('mongoose');

const qrTokenSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true, required: true },
    bookingId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    templeId: { type: String },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QRToken', qrTokenSchema);
