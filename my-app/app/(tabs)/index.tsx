import React, { useState, useEffect } from 'react';

import {SplashScreen,OnboardingScreen,LoginScreen,SignupScreen} from '@/components/auth';

type ScreenType = 'splash' | 'onboarding' | 'login' | 'signup';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');

  // Splash screen timer
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  
  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'login') {
    return <LoginScreen onNavigateToSignup={() => setCurrentScreen('signup')} />;
  }

  return <SignupScreen onNavigateToLogin={() => setCurrentScreen('login')} />;
}
