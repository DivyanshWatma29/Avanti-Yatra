const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    templeId: { type: String, required: true },
    templeName: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    eventType: {
      type: String,
      enum: ['festival', 'special_puja', 'emergency', 'maintenance'],
    },
    isActive: { type: Boolean, default: true },
    affectsCrowd: { type: Boolean, default: true },
    notificationSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
