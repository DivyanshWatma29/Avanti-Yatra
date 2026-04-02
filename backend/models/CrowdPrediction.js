const mongoose = require('mongoose');

const crowdPredictionSchema = new mongoose.Schema(
  {
    templeId: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    crowdLevel: { type: String, enum: ['Low', 'Medium', 'High'] },
    score: { type: Number, min: 0, max: 100 },
    weather: { type: String },
    isFestival: { type: Boolean, default: false },
  },
  { timestamps: true }
);

crowdPredictionSchema.index({ templeId: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('CrowdPrediction', crowdPredictionSchema);
