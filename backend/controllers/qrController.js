const QRToken = require('../models/QRToken');
const Booking = require('../models/Booking');

// POST /api/qr/validate  (admin only)
const validateQR = async (req, res, next) => {
  try {
    const token = String(req.body.token || '');
    if (!token) return res.status(400).json({ success: false, message: 'Token is required' });

    const qrToken = await QRToken.findOne({ token });
    if (!qrToken) return res.status(404).json({ success: false, message: 'QR token not found' });

    if (qrToken.isUsed) {
      return res.status(400).json({ success: false, message: 'QR code already used' });
    }

    if (new Date() > qrToken.expiresAt) {
      return res.status(400).json({ success: false, message: 'QR code expired' });
    }

    qrToken.isUsed = true;
    qrToken.usedAt = new Date();
    await qrToken.save();

    const booking = await Booking.findOne({ bookingId: qrToken.bookingId });
    if (booking && booking.status === 'confirmed') {
      booking.status = 'completed';
      await booking.save();
    }

    res.json({ success: true, message: 'QR validated successfully', data: booking });
  } catch (err) {
    next(err);
  }
};

// GET /api/qr/booking/:bookingId  (authenticated user)
const getQRForBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isOwner = booking.userId.toString() === req.user.id;
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: { qrCode: booking.qrCode, bookingId: booking.bookingId } });
  } catch (err) {
    next(err);
  }
};

module.exports = { validateQR, getQRForBooking };
