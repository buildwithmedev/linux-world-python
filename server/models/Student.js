const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    collegeName: {
      type: String,
      trim: true,
      default: 'Not Specified'
    },
    currentStatus: {
      type: String,
      default: 'Student'
    },
    city: {
      type: String,
      trim: true,
      default: 'Jaipur'
    },
    message: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 3000
    },
    paymentStatus: {
      type: String,
      enum: ['PAYMENT_PENDING', 'PAYMENT_VERIFIED', 'FAILED'],
      default: 'PAYMENT_PENDING'
    },
    registrationStatus: {
      type: String,
      default: 'REGISTERED'
    },
    courseStartDate: {
      type: String,
      default: '15 September 2026'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema);