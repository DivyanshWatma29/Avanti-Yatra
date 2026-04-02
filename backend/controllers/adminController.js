const User = require('../models/User');
const Booking = require('../models/Booking');
const Temple = require('../models/Temple');
const Event = require('../models/Event');

// GET /api/admin/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [totalUsers, totalBookings, templesCount, todayBookings] = await Promise.all([
      User.countDocuments({ role: 'devotee' }),
      Booking.countDocuments(),
      Temple.countDocuments({ isActive: true }),
      Booking.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } }),
    ]);

    res.json({
      success: true,
      data: { totalUsers, totalBookings, templesCount, todayBookings },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/analytics
const getAnalytics = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const bookings = await Booking.find({ createdAt: { $gte: sevenDaysAgo } });

    // Build day-by-day counts
    const dayMap = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      dayMap[d.toISOString().split('T')[0]] = 0;
    }

    bookings.forEach((b) => {
      const key = b.createdAt.toISOString().split('T')[0];
      if (key in dayMap) dayMap[key]++;
    });

    const weekly = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

    res.json({ success: true, data: { weekly } });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/alert
const sendAlert = async (req, res, next) => {
  try {
    const { title, description, templeId, templeName, eventType, startDate, endDate } = req.body;
    if (!title || !templeId || !startDate) {
      return res.status(400).json({ success: false, message: 'title, templeId, and startDate are required' });
    }

    const event = await Event.create({
      title,
      description,
      templeId,
      templeName,
      eventType: eventType || 'emergency',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      isActive: true,
      affectsCrowd: true,
    });

    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/slots  (placeholder – extend as needed)
const manageSlots = async (req, res, next) => {
  try {
    const { templeId, crowdLevel } = req.body;
    if (!templeId || !crowdLevel) {
      return res.status(400).json({ success: false, message: 'templeId and crowdLevel are required' });
    }

    const temple = await Temple.findOneAndUpdate(
      { id: templeId },
      { crowdLevel },
      { new: true }
    );

    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, data: temple });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardStats, getAnalytics, sendAlert, manageSlots };
