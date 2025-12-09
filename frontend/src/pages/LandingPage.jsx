// Landing page with hero section and features

import { AlertTriangle, Eye, FileText, Lock, Search, Shield } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Username & Email Scan',
      description: 'Discover where your username and email appear across the internet and social platforms.'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Data Breach Detection',
      description: 'Check if your information has been exposed in known data breaches and leaks.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Metadata Analysis',
      description: 'Extract hidden metadata from images and documents that may expose your privacy.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Risk Score Calculation',
      description: 'Get a comprehensive risk score based on your digital footprint exposure.'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Privacy Recommendations',
      description: 'Receive actionable advice to improve your online privacy and security.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Real-Time Alerts',
      description: 'Stay informed with instant notifications about new exposures and breaches.'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Digital Footprint Scanner</span>
            </div>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Protect Your <span className="text-indigo-600">Digital Identity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Scan your digital footprint, detect data breaches, and get actionable insights to improve your online privacy and security.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-lg"
            >
              Start Free Scan
            </Link>
            <a
              href="#features"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors text-lg"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 relative">
          <div className="bg-linear-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10M+</div>
                <div className="text-indigo-100">Scans Performed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="text-indigo-100">Users Protected</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-indigo-100">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Privacy Protection</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform offers a complete suite of tools to monitor, analyze, and protect your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and secure in just 3 steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up for free and verify your email to get started.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Run Scan</h3>
              <p className="text-gray-600">Enter your information and let our system scan the web.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">View your risk score and receive actionable recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Digital Footprint?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of users who are taking control of their online privacy today.
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-lg inline-block"
          >
            Start Your Free Scan Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-indigo-400" />
              <span className="ml-2 text-lg font-semibold">Digital Footprint Scanner</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Digital Footprint Scanner. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;