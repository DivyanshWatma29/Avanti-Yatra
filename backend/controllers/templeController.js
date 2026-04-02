const Temple = require('../models/Temple');

// GET /api/temples
const getAllTemples = async (req, res, next) => {
  try {
    const temples = await Temple.find({ isActive: true });
    res.json({ success: true, data: temples });
  } catch (err) {
    next(err);
  }
};

// GET /api/temples/:id
const getTempleById = async (req, res, next) => {
  try {
    const temple = await Temple.findOne({ id: req.params.id, isActive: true });
    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, data: temple });
  } catch (err) {
    next(err);
  }
};

// POST /api/temples  (admin only)
const createTemple = async (req, res, next) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json({ success: true, data: temple });
  } catch (err) {
    next(err);
  }
};

// PUT /api/temples/:id  (admin only)
const updateTemple = async (req, res, next) => {
  try {
    const b = req.body;
    const updates = {};

    // Scalar string fields
    const strFields = ['name', 'district', 'type', 'description', 'timings', 'deity',
      'history', 'significance', 'crowdLevel', 'liveStreamUrl'];
    strFields.forEach((k) => { if (b[k] !== undefined) updates[k] = String(b[k]); });

    // Boolean
    if (b.isActive !== undefined) updates.isActive = Boolean(b.isActive);

    // Array of strings
    if (Array.isArray(b.festivals)) updates.festivals = b.festivals.map(String);
    if (Array.isArray(b.nearbyAttractions)) updates.nearbyAttractions = b.nearbyAttractions.map(String);

    // Nested object – sanitize each sub-field
    if (b.howToReach && typeof b.howToReach === 'object') {
      updates.howToReach = {
        road: b.howToReach.road !== undefined ? String(b.howToReach.road) : undefined,
        train: b.howToReach.train !== undefined ? String(b.howToReach.train) : undefined,
        air: b.howToReach.air !== undefined ? String(b.howToReach.air) : undefined,
      };
    }

    const temple = await Temple.findOneAndUpdate(
      { id: String(req.params.id) },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, data: temple });
  } catch (err) {
    next(err);
  }
};

// GET /api/temples/:id/crowd
const getCrowdStatus = async (req, res, next) => {
  try {
    const temple = await Temple.findOne({ id: req.params.id, isActive: true }).select('id name crowdLevel');
    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, data: { templeId: temple.id, name: temple.name, crowdLevel: temple.crowdLevel } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTemples, getTempleById, createTemple, updateTemple, getCrowdStatus };
