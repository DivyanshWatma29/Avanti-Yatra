const router = require('express').Router();
const { getPredictions, getTodayPrediction } = require('../controllers/predictionController');

router.get('/:templeId/today', getTodayPrediction);
router.get('/:templeId', getPredictions);

module.exports = router;
