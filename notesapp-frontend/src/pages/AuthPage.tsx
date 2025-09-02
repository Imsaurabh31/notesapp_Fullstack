import React, { useState } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import OTPVerification from '../components/OTPVerification';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'otp'>('login');
  const [signupEmail, setSignupEmail] = useState('');

  const handleSignupSuccess = (email: string) => {
    setSignupEmail(email);
    setCurrentView('otp');
  };

  const handleVerificationSuccess = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="auth-page">
      {currentView === 'login' && (
        <Login onSwitchToSignup={() => setCurrentView('signup')} />
      )}
      
      {currentView === 'signup' && (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
      
      {currentView === 'otp' && (
        <OTPVerification
          email={signupEmail}
          onVerificationSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
};

export default AuthPage;