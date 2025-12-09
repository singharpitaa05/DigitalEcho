// PASSWORD CHECKER PAGE

// Password strength checker page
import { AlertCircle, ArrowLeft, CheckCircle, Eye, EyeOff, Lock, Shield, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PasswordCheckerPage = () => {
  const navigate = useNavigate();
  const { api } = useAuth();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Handle password check
  const handleCheck = async (e) => {
    e.preventDefault();
    setResult(null);

    if (!password) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/scans/password-strength', { password });
      setResult(response.data.data);
    } catch (err) {
      console.error('Password check error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time check on input change
  const handlePasswordChange = async (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length > 0) {
      setLoading(true);
      try {
        const response = await api.post('/scans/password-strength', { password: value });
        setResult(response.data.data);
      } catch (err) {
        console.error('Password check error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setResult(null);
    }
  };

  // Get strength color
  const getStrengthColor = (strength) => {
    switch (strength?.toLowerCase()) {
      case 'strong':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'weak':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthTextColor = (strength) => {
    switch (strength?.toLowerCase()) {
      case 'strong':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'weak':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Digital Footprint Scanner</span>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Strength Checker</h1>
          <p className="text-gray-600">Test your password strength and get improvement suggestions</p>
        </div>

        {/* Password Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleCheck}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Password to Test
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Your password is checked locally and securely. We do not store or transmit your actual password.
              </p>
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Strength Meter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Strength</h2>
              
              {/* Score */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Strength Score</span>
                  <span className={`text-2xl font-bold ${getStrengthTextColor(result.strength)}`}>
                    {result.score}/100
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getStrengthColor(result.strength)}`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                
                <div className="mt-2 text-center">
                  <span className={`text-lg font-semibold ${getStrengthTextColor(result.strength)}`}>
                    {result.strength}
                  </span>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2">
                  {password.length >= 8 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">8+ characters</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">Uppercase letter</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/[a-z]/.test(password) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">Lowercase letter</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/\d/.test(password) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">Number</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/[^a-zA-Z0-9]/.test(password) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">Special character</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {password.length >= 12 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-gray-700">12+ characters</span>
                </div>
              </div>
            </div>

            {/* Feedback */}
            {result.feedback && result.feedback.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Improvement Suggestions
                </h2>
                <ul className="space-y-2">
                  {result.feedback.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Password Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Security Tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Use a unique password for each account to prevent credential stuffing attacks</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Consider using a password manager to generate and store strong passwords</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Enable two-factor authentication (2FA) wherever possible</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Avoid using personal information like birthdays or names in passwords</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Change passwords immediately if you suspect a breach</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Initial State - No Password Entered */}
        {!result && !password && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Testing Your Password</h3>
            <p className="text-gray-600">
              Enter a password above to see its strength analysis and get recommendations for improvement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordCheckerPage;