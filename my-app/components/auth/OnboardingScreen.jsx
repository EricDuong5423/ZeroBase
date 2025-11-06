import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MenuIcon, AppButton } from "../Reuse";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Manage your money",
    description:
      "I wanna help u guys manage your money better, maybe, but it still depends.",
  },
  {
    id: 2,
    title: "Track your spending",
    description:
      "Set budgets and see where your cash goes in real time.",
  },
  {
    id: 3,
    title: "Reach your goals",
    description:
      "Save smarter with reminders and simple plans.",
  },
];

export default function OnboardingScreen({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pageWidth, setPageWidth] = useState(SCREEN_WIDTH); 
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    if (!pageWidth) return;
    const x = event.nativeEvent.contentOffset.x || 0;
    const slideIndex = Math.round(x / pageWidth);
    if (slideIndex !== currentSlide) setCurrentSlide(slideIndex);
  };

  const goToNextSlide = () => {
    if (!pageWidth) return;
    if (currentSlide < onboardingData.length - 1) {
      scrollViewRef.current &&
        scrollViewRef.current.scrollTo({
          x: (currentSlide + 1) * pageWidth,
          animated: true,
        });
    } else {
      if (typeof onComplete === "function") onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {Platform.OS === "android" ? (
        <View style={{ height: StatusBar.currentHeight || 0 }} />
      ) : null}

      <View
        style={styles.contentArea}
        onLayout={(e) => {
          const w = e?.nativeEvent?.layout?.width;
          if (w && w > 0) setPageWidth(Math.round(w));
        }}
      >
        <View style={styles.menuIconWrapper}>
          {typeof MenuIcon === "function" ? <MenuIcon /> : null}
        </View>

        <View style={styles.content}>
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={String(index)}
                style={[
                  styles.paginationDot,
                  currentSlide === index && styles.paginationDotActive,
                ]}
              />
            ))}
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
              <View
                key={String(item.id)}
                style={[styles.slide, { width: pageWidth || SCREEN_WIDTH }]}
              >
                <View style={styles.slideContent}>
                  <Text style={styles.slideTitle}>{item.title}</Text>
                  <Text style={styles.slideDescription}>{item.description}</Text>

                  <AppButton
                    text={item.id === 3 ? "Login Now" : "Next"}
                    color="#000"
                    style={{ backgroundColor: "#000", paddingHorizontal: 28, paddingVertical: 14, borderRadius: 28 }}
                    textStyle={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                    onPress={goToNextSlide}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000", 
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 24,
  },
  menuIconWrapper: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  carouselContainer: {
    flex: 1,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  slideContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
    textAlign: "center",
  },
  slideDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#000",
    width: 24,
  },
});
