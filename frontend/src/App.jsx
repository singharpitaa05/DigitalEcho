// Main app component with routing configuration

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

// Pages
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import VerifyOTPPage from './pages/VerifyOTPPage';

// Scan Pages
import EmailScanPage from './pages/EmailScanPage';
import PasswordCheckerPage from './pages/PasswordCheckerPage';
import PhoneScanPage from './pages/PhoneScanPage';
import ScanHistoryPage from './pages/ScanHistoryPage';
import UsernameScanPage from './pages/UsernameScanPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Scan Routes */}
          <Route
            path="/scan/username"
            element={
              <PrivateRoute>
                <UsernameScanPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/scan/email"
            element={
              <PrivateRoute>
                <EmailScanPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/scan/phone"
            element={
              <PrivateRoute>
                <PhoneScanPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/scan/password"
            element={
              <PrivateRoute>
                <PasswordCheckerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/scan-history"
            element={
              <PrivateRoute>
                <ScanHistoryPage />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;