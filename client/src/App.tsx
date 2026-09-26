import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import StudentCoursePortal from './pages/StudentCoursePortal';
import StudentLoginPage from './pages/StudentLoginPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#070b14] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/portal" element={<StudentCoursePortal />} />
          <Route path="/portal/:batchId" element={<StudentCoursePortal />} />
          <Route path="/login" element={<StudentLoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}