// USERNAME SCAN PAGE

// Username scanning page with results display
import { AlertCircle, ArrowLeft, CheckCircle, ExternalLink, Search, Shield, User, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UsernameScanPage = () => {
  const navigate = useNavigate();
  const { api } = useAuth();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Handle scan submission
  const handleScan = async (e) => {
    e.preventDefault();
    setError('');
    setScanResult(null);

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError('Username can only contain letters, numbers, underscores, and hyphens');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/scans/username', { username: username.trim() });
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Username Scan</h1>
          <p className="text-gray-600">Check where your username appears across the internet</p>
        </div>

        {/* Scan Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleScan}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Username
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john_doe"
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
                  <div className="text-sm text-gray-600 mb-1">Platforms Found</div>
                  <div className="text-3xl font-bold text-indigo-600">
                    {scanResult.results.platformsFound.filter(p => p.exists === true).length}
                  </div>
                </div>
              </div>
            </div>

            {/* Platforms Found */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Detection Results</h2>
              <div className="space-y-3">
                {scanResult.results.platformsFound.map((platform, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {platform.exists === true ? (
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      ) : platform.exists === false ? (
                        <XCircle className="w-5 h-5 text-gray-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{platform.platform}</div>
                        <div className="text-sm text-gray-600">
                          {platform.exists === true
                            ? platform.publicInfo || 'Profile found'
                            : platform.exists === false
                            ? 'Not found'
                            : 'Verification required'}
                        </div>
                      </div>
                    </div>
                    {platform.exists === true && (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium"
                      >
                        View
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {scanResult.results.recommendations && scanResult.results.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
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
                  setUsername('');
                  setScanResult(null);
                  setError('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Scan Another Username
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

export default UsernameScanPage;