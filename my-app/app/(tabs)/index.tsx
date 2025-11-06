// @ts-nocheck
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        if (seen === 'true') {
          setHasSeenOnboarding(true);
        }
      } catch (error) {
        console.log('Error reading onboarding status:', error);
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
    } catch (error) {
      console.log('Error saving onboarding status:', error);
      setCurrentScreen('welcome');
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
