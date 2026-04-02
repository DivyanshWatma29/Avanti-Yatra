const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getDashboardStats, getAnalytics, sendAlert, manageSlots } = require('../controllers/adminController');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/analytics', protect, adminOnly, getAnalytics);
router.post('/alert', protect, adminOnly, sendAlert);
router.put('/slots', protect, adminOnly, manageSlots);

module.exports = router;
