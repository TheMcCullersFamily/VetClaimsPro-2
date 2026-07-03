import React, { useState } from 'react';
import { Menu, X, User, ChevronDown, FileText, Calculator, BookOpen, DollarSign, Home, Phone, Stethoscope } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  setCurrentPage, 
  isLoggedIn, 
  setShowAuthModal,
  setAuthMode 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'conditions', label: 'Conditions', icon: BookOpen },
    { id: 'forms', label: 'VA Forms', icon: FileText },
    { id: 'claim-builder', label: 'Claim Builder', icon: Calculator },
    { id: 'cp-exam', label: 'C&P Exam Prep', icon: Stethoscope },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ];



  return (
    <header className="bg-navy-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-navy-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">VetClaims<span className="text-amber-400">Pro</span></h1>
              <p className="text-xs text-gray-400 hidden sm:block">Your Benefits. Your Right.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentPage === item.id 
                    ? 'bg-amber-500 text-navy-900' 
                    : 'text-gray-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
              >
                <User className="w-4 h-4" />
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setCurrentPage('login');
                  }}
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setCurrentPage('login');
                  }}
                  className="px-4 py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                >
                  Get Started Free
                </button>
              </>

            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-navy-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-navy-700">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                    currentPage === item.id 
                      ? 'bg-amber-500 text-navy-900' 
                      : 'text-gray-300 hover:bg-navy-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-navy-700 space-y-2">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-amber-500 text-navy-900 rounded-lg font-semibold flex items-center gap-3"
                  >
                    <User className="w-5 h-5" />
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setCurrentPage('login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-gray-300 hover:bg-navy-800 rounded-lg font-medium text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setCurrentPage('login');
                        setMobileMenuOpen(false);
                      }}

                      className="w-full px-4 py-3 bg-amber-500 text-navy-900 rounded-lg font-semibold"
                    >
                      Get Started Free
                    </button>
                  </>
                )}

              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
