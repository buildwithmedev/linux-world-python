const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Settings = require('../models/Settings');
const Enquiry = require('../models/Enquiry');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'linux_world_super_secret_jwt_key_2026',
      { expiresIn: '7d' }
    );

    res.json({ success: true, token, name: admin.name });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalRegistrations = await Student.countDocuments();
    const paidStudents = await Student.countDocuments({ paymentStatus: 'PAYMENT_VERIFIED' });
    const pendingPayments = await Student.countDocuments({ paymentStatus: 'PAYMENT_PENDING' });
    
    const revenueAgg = await Student.aggregate([
      { $match: { paymentStatus: 'PAYMENT_VERIFIED' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const recentRegistrations = await Student.find().sort({ createdAt: -1 }).limit(10);
    const settings = await Settings.findOne() || {};

    res.json({
      success: true,
      data: {
        stats: { totalRegistrations, paidStudents, pendingPayments, totalRevenue },
        recentRegistrations,
        settings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard metrics.' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const { search, paymentStatus, currentStatus } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { collegeName: { $regex: search, $options: 'i' } }
      ];
    }
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (currentStatus) query.currentStatus = currentStatus;

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to query student database.' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    Object.assign(settings, req.body);
    await settings.save();

    res.json({ success: true, message: 'Settings updated successfully.', settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save settings.' });
  }
};