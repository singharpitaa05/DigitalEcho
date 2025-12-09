// PHONE SCAN PAGE

// Phone number scanning page with exposure detection
import { AlertTriangle, ArrowLeft, Info, Phone, Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PhoneScanPage = () => {
  const navigate = useNavigate();
  const { api } = useAuth();

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Handle scan submission
  const handleScan = async (e) => {
    e.preventDefault();
    setError('');
    setScanResult(null);

    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    if (!/^[\d\s+()-]+$/.test(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/scans/phone', { phone: phone.trim() });
      setScanResult(response.data.data.scan);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to perform scan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get risk color based on score
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

  // Get risk level color for exposure items
  const getRiskLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getRiskLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Phone className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Phone Number Scan</h1>
          <p className="text-gray-600">Check if your phone number is exposed in public databases</p>
        </div>

        {/* Scan Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleScan}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Phone Number
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1 234 567 8900"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Scan
                  </>
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {/* Info Box */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              We scan public directories, marketing lists, social media, and data breach databases to check if your phone number is exposed.
            </p>
          </div>
        </div>

        {/* Results */}
        {scanResult && (
          <div className="space-y-6 animate-fadeIn">
            {/* Risk Score Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Assessment</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{scanResult.riskScore}/100</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(scanResult.riskScore)}`}>
                    {getRiskLabel(scanResult.riskScore)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Exposures Found</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {scanResult.results.phoneExposure?.length || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* No Exposures Found */}
            {scanResult.results.phoneExposure?.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Great News!</h3>
                <p className="text-gray-700 mb-4">
                  No public exposures found for this phone number in our database.
                </p>
                <p className="text-sm text-gray-600">
                  Your phone number appears to be private, but remain cautious about sharing it online.
                </p>
              </div>
            )}

            {/* Exposures Found */}
            {scanResult.results.phoneExposure && scanResult.results.phoneExposure.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Phone Number Exposures Detected
                </h2>
                <div className="space-y-4">
                  {scanResult.results.phoneExposure.map((exposure, index) => (
                    <div
                      key={index}
                      className={`p-4 border-l-4 rounded-lg ${getRiskLevelColor(exposure.riskLevel)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{exposure.source}</h3>
                          <p className="text-sm text-gray-600 capitalize">Type: {exposure.type}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded capitalize ${getRiskLevelBadge(exposure.riskLevel)}`}>
                          {exposure.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{exposure.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {scanResult.results.recommendations && scanResult.results.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Security Recommendations
                </h2>
                <ul className="space-y-2">
                  {scanResult.results.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setPhone('');
                  setScanResult(null);
                  setError('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Scan Another Number
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneScanPage;