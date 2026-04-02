const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const { validateQR, getQRForBooking } = require('../controllers/qrController');

router.post('/validate', protect, adminOnly, validateQR);
router.get('/booking/:bookingId', protect, getQRForBooking);

module.exports = router;
