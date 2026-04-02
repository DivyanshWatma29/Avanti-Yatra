const router = require('express').Router();
const { body } = require('express-validator');
const { protect, adminOnly } = require('../middleware/auth');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
} = require('../controllers/bookingController');

router.post(
  '/',
  protect,
  [
    body('templeId').notEmpty().withMessage('Temple ID is required'),
    body('templeName').notEmpty().withMessage('Temple name is required'),
    body('bookingDate').isISO8601().withMessage('Valid booking date is required'),
    body('timeSlot').notEmpty().withMessage('Time slot is required'),
    body('numberOfVisitors').optional().isInt({ min: 1, max: 50 }),
  ],
  createBooking
);

router.get('/admin/all', protect, adminOnly, getAllBookings);
router.get('/', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
