// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  SignupScreen,
  LoginScreen,
  OnboardingScreen,
  SplashScreen,
  WelcomeScreen,
} from '@/components/auth';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Kiểm tra xem đã từng xem Onboarding chưa
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (seen === 'true') {
      setHasSeenOnboarding(true);
    }
  }, []);

  // Splash timer
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        if (hasSeenOnboarding) {
          setCurrentScreen('welcome');
        } else {
          setCurrentScreen('onboarding');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, hasSeenOnboarding]);

  
  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setHasSeenOnboarding(true);
    setCurrentScreen('welcome');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'welcome') {
    return <WelcomeScreen />;
  }

  return null;
}
