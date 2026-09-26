const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch((err) => console.error(' MongoDB Connection Error:', err));
} else {
  console.warn('⚠️ Warning: MONGO_URI is not set in environment variables.');
}

// Student Schema & Model
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    college: { type: String, default: '' },
    isPaid: { type: Boolean, default: false },
    utrNumber: { type: String, default: '' },
    paymentStatus: { 
      type: String, 
      enum: ['unpaid', 'pending', 'approved'], 
      default: 'unpaid' 
    }
  },
  { timestamps: true }
);

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

// ========================
// API ROUTES
// ========================

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Linux World Python Masterclass API is running.' });
});

// 1. Student Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, college } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and phone number are required.' 
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    let student = await Student.findOne({ email: cleanEmail });

    if (!student) {
      student = new Student({
        name: name.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        college: college ? college.trim() : ''
      });
      await student.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      student
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Direct Payment Access Confirmation (Unlocked Flow)
app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const student = await Student.findOneAndUpdate(
      { phone: phone.trim() },
      { isPaid: true, paymentStatus: 'approved' },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Payment confirmed. Course access granted.',
      student
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Returning Student Login Verification (Email Lookup)
app.post('/api/student-login', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const student = await Student.findOne({ email: cleanEmail });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No enrollment record found with this email. Please enroll first.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student verified successfully.',
      student: {
        name: student.name,
        email: student.email,
        isPaid: student.isPaid
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});

module.exports = app;