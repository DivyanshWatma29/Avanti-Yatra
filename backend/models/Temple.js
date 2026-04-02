const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    district: { type: String, required: true },
    type: { type: String },
    description: { type: String },
    timings: { type: String },
    deity: { type: String },
    history: { type: String },
    significance: { type: String },
    crowdLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    festivals: [{ type: String }],
    howToReach: {
      road: { type: String },
      train: { type: String },
      air: { type: String },
    },
    nearbyAttractions: [{ type: String }],
    liveStreamUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Temple', templeSchema);
