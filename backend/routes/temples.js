const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllTemples,
  getTempleById,
  createTemple,
  updateTemple,
  getCrowdStatus,
} = require('../controllers/templeController');

router.get('/', getAllTemples);
router.get('/:id/crowd', getCrowdStatus);
router.get('/:id', getTempleById);
router.post('/', protect, adminOnly, createTemple);
router.put('/:id', protect, adminOnly, updateTemple);

module.exports = router;
