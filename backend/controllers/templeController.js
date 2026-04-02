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
    const stringFields = [
      'name', 'district', 'type', 'description', 'timings', 'deity',
      'history', 'significance', 'crowdLevel', 'liveStreamUrl',
    ];
    const allowed = [...stringFields, 'festivals', 'howToReach', 'nearbyAttractions', 'isActive'];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] === undefined) return;
      if (stringFields.includes(key)) {
        updates[key] = String(req.body[key]);
      } else {
        updates[key] = req.body[key];
      }
    });

    const temple = await Temple.findOneAndUpdate(
      { id: String(req.params.id) },
      updates,
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
