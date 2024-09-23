import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: 1, title: 'Welcome to AppName', description: 'Your all-in-one solution', icon: 'apps' },
  { id: 2, title: 'Powerful Features', description: 'Discover what you can do', icon: 'flash' },
  { id: 3, title: 'Stay Connected', description: 'Sync across all your devices', icon: 'cloud-done' },
  { id: 4, title: 'Secure & Private', description: 'Your data is safe with us', icon: 'shield-checkmark' },
  { id: 5, title: 'Get Started', description: 'Join our community today', icon: 'rocket' },
];

export function OnboardingLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      const slideWidth = -width * (slides.length - 1);
      if (event.velocityX < -500 && currentSlide < slides.length - 1) {
        translateX.value = withSpring((currentSlide + 1) * -width);
        setCurrentSlide(currentSlide + 1);
      } else if (event.velocityX > 500 && currentSlide > 0) {
        translateX.value = withSpring((currentSlide - 1) * -width);
        setCurrentSlide(currentSlide - 1);
      } else {
        translateX.value = withSpring(currentSlide * -width);
      }
    },
  });

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      translateX.value = withSpring(-width * (currentSlide + 1));
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.slideContainer, animatedStyle]}>
            {slides.map((slide) => (
              <View key={slide.id} style={styles.slide}>
                <View style={styles.iconContainer}>
                  <Ionicons name={slide.icon} size={80} color="#ffffff" />
                </View>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
            ))}
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.footer}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentSlide ? styles.paginationDotActive : null,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={currentSlide === slides.length - 1 ? () => {} : nextSlide}
          >
            <Text style={styles.buttonText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  slideContainer: {
    flexDirection: 'row',
    height: height * 0.7,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#16213e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#a7a7a7',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#444',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 12,
  },
  button: {
    backgroundColor: '#0f3460',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});