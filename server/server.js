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

// 1. Student Registration (Handles both name/fullName and phone/mobileNumber)
app.post('/api/register', async (req, res) => {
  try {
    const rawName = req.body.name || req.body.fullName;
    const rawEmail = req.body.email;
    const rawPhone = req.body.phone || req.body.mobileNumber;
    const rawCollege = req.body.college;

    const name = rawName ? String(rawName).trim() : '';
    const email = rawEmail ? String(rawEmail).trim().toLowerCase() : '';
    const phone = rawPhone ? String(rawPhone).trim() : '';
    const college = rawCollege ? String(rawCollege).trim() : '';

    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and phone number are required.' 
      });
    }

    // Upsert student record to avoid MongoDB duplicate key errors
    let student = await Student.findOne({ email });

    if (student) {
      student.name = name;
      student.phone = phone;
      if (college) student.college = college;
      await student.save();
    } else {
      student = new Student({
        name,
        email,
        phone,
        college
      });
      await student.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      student
    });
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Direct Payment Access Confirmation (Unlocked Flow)
app.post('/api/confirm-payment', async (req, res) => {
  try {
    const rawPhone = req.body.phone || req.body.mobileNumber;
    const phone = rawPhone ? String(rawPhone).trim() : '';

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const student = await Student.findOneAndUpdate(
      { phone },
      { isPaid: true, paymentStatus: 'approved' },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Payment confirmed. Course access granted.',
      student
    });
  } catch (err) {
    console.error('Payment Confirmation Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Returning Student Login Verification (Email Lookup)
app.post('/api/student-login', async (req, res) => {
  try {
    const rawEmail = req.body.email;
    const email = rawEmail ? String(rawEmail).trim().toLowerCase() : '';

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const student = await Student.findOne({ email });

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
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});

module.exports = app;