const TIME_SLOTS = [
  '06:00 - 08:00',
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
  '18:00 - 20:00',
];

const predictSlot = (date, slot, isFestival) => {
  const day = date.getDay(); // 0=Sun, 6=Sat
  const isWeekend = day === 0 || day === 6;
  const slotIndex = TIME_SLOTS.indexOf(slot);

  // Peak slots: morning (0-1) and evening (5-6)
  const isPeak = slotIndex <= 1 || slotIndex >= 5;

  let score = isWeekend ? 55 : 30;
  if (isPeak) score += 15;
  if (isFestival) score += 30;
  score = Math.min(score + Math.floor(Math.random() * 10), 100);

  let crowdLevel = 'Low';
  if (score >= 70) crowdLevel = 'High';
  else if (score >= 45) crowdLevel = 'Medium';

  return { slot, score, crowdLevel };
};

// GET /api/predictions/:templeId  – 7-day forecast
const getPredictions = async (req, res, next) => {
  try {
    const { templeId } = req.params;
    const isFestival = req.query.festival === 'true';
    const predictions = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const slots = TIME_SLOTS.map((slot) => predictSlot(date, slot, isFestival));
      predictions.push({ date: date.toISOString().split('T')[0], templeId, slots });
    }

    res.json({ success: true, data: predictions });
  } catch (err) {
    next(err);
  }
};

// GET /api/predictions/:templeId/today
const getTodayPrediction = async (req, res, next) => {
  try {
    const { templeId } = req.params;
    const isFestival = req.query.festival === 'true';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const slots = TIME_SLOTS.map((slot) => predictSlot(today, slot, isFestival));

    res.json({
      success: true,
      data: { date: today.toISOString().split('T')[0], templeId, slots },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPredictions, getTodayPrediction };
