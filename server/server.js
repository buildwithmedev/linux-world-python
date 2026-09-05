require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const Settings = require('./models/Settings');
const Admin = require('./models/Admin');
const registrationController = require('./controllers/registrationController');
const paymentController = require('./controllers/paymentController');
const adminController = require('./controllers/adminController');
const authMiddleware = require('./middleware/auth');

const app = express();

// Security Headers (Allows YouTube iframe embeds)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});
app.use('/api', limiter);

// --- Public API Routes ---
app.post('/api/register', registrationController.registerStudent);
app.get('/api/students/:id', registrationController.getStudentDetails);
app.post('/api/verify-payment', paymentController.verifyPayment);
app.post('/api/student-login', registrationController.studentPortalLogin);

app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, settings });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Unable to fetch public settings.' });
  }
});

// --- Admin Routes ---
app.post('/api/admin/login', adminController.loginAdmin);
app.get('/api/admin/dashboard', authMiddleware, adminController.getDashboardStats);
app.get('/api/admin/students', authMiddleware, adminController.getAllStudents);
app.put('/api/admin/settings', authMiddleware, adminController.updateSettings);

// --- Global Error Fallback ---
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// --- Seed and DB Initialization ---
const initDatabase = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@linuxworld.com';
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@Linux2026';
    await Admin.create({
      email: adminEmail,
      password: defaultPassword,
      name: 'Linux World Director'
    });
    console.log(`[Seed] Default admin created: ${adminEmail}`);
  }

  let settings = await Settings.findOne();
  if (!settings) {
    await Settings.create({
      courseFee: 3000,
      courseStartDate: '15 September 2026',
      registrationDeadline: '10 September 2026',
      courseDuration: '8 Weeks (Training + Live Internship)',
      upiId: 'manvendrasinghr97@okicici',
      payeeName: 'Manvendra Singh Rathore',
      galleryImages: [
        { id: '1', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', caption: 'Interactive Classroom Training', category: 'Training' },
        { id: '2', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', caption: 'Collaborative Project Development', category: 'Internship' }
      ]
    });
    console.log('[Seed] Default course settings seeded with Manvendra Singh Rathore UPI.');
  } else {
    // Keep UPI ID updated in existing record
    settings.upiId = 'manvendrasinghr97@okicici';
    settings.payeeName = 'Manvendra Singh Rathore';
    await settings.save();
  }
};

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('CRITICAL: MongoDB connection error details:', err.message);
    // Start the server anyway so Render port detection doesn't fail
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on fallback port ${PORT} (DB connection pending)`);
    });
  });