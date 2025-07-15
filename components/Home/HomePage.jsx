import React, { useState } from "react";
import { Search, Github, ArrowRight, MessageCircle } from "lucide-react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded transform rotate-45 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded transform -rotate-45"></div>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  feldera
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Pricing
              </a>
              <div className="relative">
                <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
                  Company <span className="ml-1">▼</span>
                </button>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Book a demo
              </button>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <Github className="w-6 h-6" />
              </a>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-2">
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Blog
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Pricing
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900"
              >
                Company
              </a>
              <div className="pt-2 border-t border-gray-100">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Book a demo
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 leading-tight">
            Leading the incremental compute revolution
          </h1>

          <p className="text-xl sm:text-2xl text-gray-800 font-semibold mb-8 max-w-4xl mx-auto">
            Batch jobs waste 99.9% of their time re-processing data that hasn't
            changed
          </p>

          <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Feldera's award-winning Incremental Compute platform erases that
            waste with instant incremental updates. Whether processing 10K line
            monster SQL pipelines with hundreds of joins or recursive graph
            analytics, process millions of changes per second even on a laptop.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center">
              <ArrowRight className="w-5 h-5 mr-2" />
              Try for free
            </button>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Ask us anything on Slack
            </button>
          </div>
        </div>

        {/* Animated Diagram */}
        <div className="relative mt-16">
          <svg viewBox="0 0 1200 400" className="w-full h-auto">
            {/* Connection lines */}
            <path
              d="M 100 200 Q 300 100 500 200"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 100 250 Q 300 350 500 250"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 500 200 L 700 200"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 700 200 Q 900 100 1100 200"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />

            {/* Data flow elements */}
            <g>
              {/* Input sources */}
              <rect
                x="50"
                y="180"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />
              <rect
                x="50"
                y="230"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />
              <rect
                x="50"
                y="280"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />

              {/* Processing nodes */}
              <rect x="290" y="180" width="30" height="20" fill="#A855F7" />
              <rect x="290" y="210" width="30" height="20" fill="#A855F7" />
              <rect
                x="450"
                y="180"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />
              <rect
                x="450"
                y="230"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />

              {/* Join operations */}
              <rect x="680" y="180" width="40" height="40" fill="#EC4899" />
              <rect x="680" y="230" width="40" height="40" fill="#EC4899" />

              {/* Output */}
              <rect
                x="900"
                y="180"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />
              <rect
                x="1050"
                y="180"
                width="100"
                height="40"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                rx="5"
              />

              {/* 3D cube visualization */}
              <g transform="translate(1050, 100)">
                <polygon points="0,0 40,0 60,20 20,20" fill="#A855F7" />
                <polygon points="0,0 0,40 20,60 20,20" fill="#7C3AED" />
                <polygon points="20,20 60,20 60,60 20,60" fill="#EC4899" />
              </g>
            </g>

            {/* Floating elements */}
            <circle cx="750" cy="120" r="8" fill="#F97316" />
            <circle cx="850" cy="150" r="6" fill="#F97316" />
            <rect x="950" y="140" width="15" height="15" fill="#A855F7" />
            <rect x="750" y="320" width="12" height="12" fill="#A855F7" />
            <rect x="780" y="330" width="8" height="8" fill="#A855F7" />

            {/* Dotted indicators */}
            <circle cx="600" cy="200" r="3" fill="#6B7280" />
            <circle cx="620" cy="200" r="3" fill="#6B7280" />
            <circle cx="640" cy="200" r="3" fill="#6B7280" />

            <circle
              cx="850"
              cy="350"
              r="15"
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
            />
          </svg>
        </div>
      </main>

      {/* Load Google Fonts */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
      `}</style>
    </div>
  );
};

export default HomePage;
