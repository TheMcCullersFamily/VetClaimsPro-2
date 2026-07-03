import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/lib/supabase';

// Import components
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import ConditionsLibrary from './ConditionsLibrary';
import FormsLibrary from './FormsLibrary';
import ClaimBuilder from './ClaimBuilder';
import PricingPage from './PricingPage';
import Dashboard from './Dashboard';
import AuthModal from './AuthModal';
import CPExamPrep from './CPExamPrep';
import LoginPage from './LoginPage';


const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  // State management
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        setUser(session.user);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUser(session.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle successful login
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setCurrentPage('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
          />
        );
      case 'conditions':
        return <ConditionsLibrary setCurrentPage={setCurrentPage} />;
      case 'forms':
        return <FormsLibrary />;
      case 'claim-builder':
        return (
          <ClaimBuilder 
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'cp-exam':
        return (
          <CPExamPrep 
            setCurrentPage={setCurrentPage}
            isLoggedIn={isLoggedIn}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
          />
        );
      case 'pricing':
        return (
          <PricingPage 
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'login':
        return isLoggedIn ? (
          <Dashboard setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        ) : (
          <LoginPage
            initialMode={authMode}
            onSuccess={handleAuthSuccess}
            setCurrentPage={setCurrentPage}
          />
        );

      case 'dashboard':
        return isLoggedIn ? (
          <Dashboard 
            setCurrentPage={setCurrentPage}
            onLogout={handleLogout}
          />
        ) : (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
          />
        );
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
      />

      {/* Main Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        setMode={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default AppLayout;
