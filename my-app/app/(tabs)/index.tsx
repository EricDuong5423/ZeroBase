// @ts-nocheck
import {
  OnboardingScreen,
  SplashScreen,
  WelcomeScreen
} from '@/components/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Kiểm tra xem đã từng xem Onboarding chưa
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        if (seen === 'true') {
          setHasSeenOnboarding(true);
        }
      } catch (e) {
        console.error('Error reading onboarding status:', e);
      }
    };
    checkOnboarding();
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

  
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
      setCurrentScreen('welcome');
    } catch (e) {
      console.error('Error saving onboarding status:', e);
    }
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
