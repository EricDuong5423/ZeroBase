import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const onboardingData = [
  { id: 1, title: 'Manage your money', description: 'I wanna help u guys manage your money better, maybe, but its still depends.' },
  { id: 2, title: 'Manage your money', description: 'I wanna help u guys manage your money better, maybe, but its still depends.' },
  { id: 3, title: 'Manage your money', description: 'I wanna help u guys manage your money better, maybe, but its still depends.' },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);   
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!pageWidth) return;
    const x = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(x / pageWidth);
    setCurrentSlide(slideIndex);
  };

  const goToNextSlide = () => {
    if (!pageWidth) return;
    if (currentSlide < onboardingData.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (currentSlide + 1) * pageWidth, animated: true });
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.contentArea}
        onLayout={(e) => setPageWidth(e.nativeEvent.layout.width)}  
      >
        <View style={styles.menuIcon}>
          <Text style={styles.menuDots}>⋯</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.carouselContainer}
        >
          {onboardingData.map((item) => (
            <View key={item.id} style={[styles.slide, { width: pageWidth || 0 }]}>
              <View style={styles.slideContent}>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideDescription}>{item.description}</Text>
                <Pressable style={styles.getStartedButton} onPress={goToNextSlide}>
                  <Text style={styles.getStartedText}>
                    {item.id === 3 ? ' Login Now' : 'Get Started'}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.paginationDot, currentSlide === index && styles.paginationDotActive]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#000',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#f5d5d5',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  menuDots: { fontSize: 24, color: '#000', fontWeight: 'bold' },
  carouselContainer: { flex: 1 },
  slide: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  slideContent: { alignItems: 'center', justifyContent: 'center' },
  slideTitle: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 20, textAlign: 'center' },
  slideDescription: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, lineHeight: 24 },
  getStartedButton: { backgroundColor: '#000', paddingHorizontal: 60, paddingVertical: 16, borderRadius: 30 },
  getStartedText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 40 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  paginationDotActive: { backgroundColor: '#000', width: 24 },
});
