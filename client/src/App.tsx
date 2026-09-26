import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Support both named and default exports cleanly
import * as HomePageModule from './pages/HomePage';
import * as RegisterPageModule from './pages/RegisterPage';
import * as PaymentPageModule from './pages/PaymentPage';
import * as StudentCoursePortalModule from './pages/StudentCoursePortal';
import * as StudentLoginPageModule from './pages/StudentLoginPage';

const HomePage = (HomePageModule as any).default || (HomePageModule as any).HomePage;
const RegisterPage = (RegisterPageModule as any).default || (RegisterPageModule as any).RegisterPage;
const PaymentPage = (PaymentPageModule as any).default || (PaymentPageModule as any).PaymentPage;
const StudentCoursePortal = (StudentCoursePortalModule as any).default || (StudentCoursePortalModule as any).StudentCoursePortal;
const StudentLoginPage = (StudentLoginPageModule as any).default || (StudentLoginPageModule as any).StudentLoginPage;

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
          {StudentLoginPage && <Route path="/login" element={<StudentLoginPage />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}