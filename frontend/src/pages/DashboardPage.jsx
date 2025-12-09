// DASHBOARD PAGE

// Main dashboard page with overview and quick actions
import {
  Activity,
  AlertCircle,
  FileText,
  History,
  LogOut,
  Mail,
  Phone,
  Search,
  Settings,
  Shield,
  TrendingUp,
  User
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  // Quick scan options
  const scanOptions = [
    {
      icon: <User className="w-6 h-6" />,
      title: 'Username Scan',
      description: 'Check where your username appears online',
      color: 'bg-blue-500',
      path: '/scan/username'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Scan',
      description: 'Detect data breaches and email exposure',
      color: 'bg-green-500',
      path: '/scan/email'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Scan',
      description: 'Find where your phone number is listed',
      color: 'bg-purple-500',
      path: '/scan/phone'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Password Checker',
      description: 'Test your password strength',
      color: 'bg-orange-500',
      path: '/scan/password'
    }
  ];

  // Risk level color
  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-600 bg-red-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskLabel = (score) => {
    if (score >= 70) return 'High Risk';
    if (score >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Digital Footprint Scanner</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/scan-history"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">{loggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-gray-600">Monitor and protect your digital footprint from one place.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Risk Score Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600 text-sm font-medium">Risk Score</div>
              <AlertCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{user?.riskScore || 0}</div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(user?.riskScore || 0)}`}>
                  {getRiskLabel(user?.riskScore || 0)}
                </div>
              </div>
              <div className="text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Safe
              </div>
            </div>
          </div>

          {/* Total Scans Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600 text-sm font-medium">Total Scans</div>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{user?.totalScans || 0}</div>
            <div className="text-gray-500 text-sm mt-1">All time</div>
          </div>

          {/* Last Scan Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600 text-sm font-medium">Last Scan</div>
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {user?.lastScanDate 
                ? new Date(user.lastScanDate).toLocaleDateString()
                : 'No scans yet'}
            </div>
            <div className="text-gray-500 text-sm mt-1">Recent activity</div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600 text-sm font-medium">Account Status</div>
              <Shield className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-lg font-semibold text-green-600 mb-1">
              {user?.isVerified ? '✓ Verified' : '⚠ Unverified'}
            </div>
            <div className="text-gray-500 text-sm">
              Active since {new Date(user?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Quick Scan Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Scan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scanOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => navigate(option.path)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-left"
              >
                <div className={`${option.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            {user?.totalScans > 0 && (
              <button
                onClick={() => navigate('/scan-history')}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                <History className="w-4 h-4" />
                View All History
              </button>
            )}
          </div>
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              {user?.totalScans > 0 
                ? 'View your scan history to see past results'
                : 'No recent scans found'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/scan/username')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Your First Scan
              </button>
              {user?.totalScans > 0 && (
                <button
                  onClick={() => navigate('/scan-history')}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  View History
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;