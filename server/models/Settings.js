const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  courseFee: { type: Number, default: 3000 },
  courseStartDate: { type: String, default: '15 September 2026' },
  registrationDeadline: { type: String, default: '10 September 2026' },
  courseDuration: { type: String, default: '8 Weeks (Training + Live Internship)' },
  upiId: { type: String, default: 'linuxworld@upi' },
  contactPhone: { type: String, default: '+91 9876543210' },
  contactEmail: { type: String, default: 'training@linuxworldindia.org' },
  contactAddress: { type: String, default: 'Plot No. 5, Krishna Tower, Gopalpura Bypass, Jaipur, Rajasthan' },
  galleryImages: [{
    id: String,
    url: String,
    caption: String,
    category: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);