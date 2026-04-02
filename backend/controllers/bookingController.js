const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const QRToken = require('../models/QRToken');
const { generateQRCode, generateBookingToken } = require('../utils/qrGenerator');
const { sendBookingConfirmation } = require('../utils/sendNotification');

// POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { templeId, templeName, bookingDate, timeSlot, numberOfVisitors, specialRequirements } = req.body;

    const bookingId = uuidv4();
    const qrToken = generateBookingToken(bookingId, req.user.id, templeId);

    const qrPayload = { bookingId, templeId, timeSlot, date: bookingDate };
    const qrCode = await generateQRCode(qrPayload);

    const booking = await Booking.create({
      bookingId,
      userId: req.user.id,
      templeId,
      templeName,
      bookingDate: new Date(bookingDate),
      timeSlot,
      numberOfVisitors: numberOfVisitors || 1,
      qrCode,
      qrToken,
      userName: req.body.userName,
      userEmail: req.user.email,
      specialRequirements,
    });

    // Store QR token for validation
    const expiresAt = new Date(bookingDate);
    expiresAt.setDate(expiresAt.getDate() + 1);
    await QRToken.create({
      token: qrToken,
      bookingId,
      userId: req.user.id,
      templeId,
      expiresAt,
    });

    // Send confirmation email (fire and forget)
    sendBookingConfirmation({ ...booking.toObject(), userEmail: req.user.email }).catch(() => {});

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings  (user's own bookings)
const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isOwner = booking.userId.toString() === req.user.id;
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isOwner = booking.userId.toString() === req.user.id;
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/admin/all  (admin only, paginated)
const getAllBookings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Booking.countDocuments(),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getUserBookings, getBookingById, cancelBooking, getAllBookings };
