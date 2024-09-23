import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView, MotiText } from 'moti';
import { Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export function AnimatedLandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{
          scale: 0,
          rotate: '0deg',
        }}
        animate={{
          scale: 1,
          rotate: '360deg',
        }}
        transition={{
          type: 'timing',
          duration: 1500,
          loop: true,
        }}
        style={styles.logoContainer}
      >
        <Ionicons name="play-circle" size={150} color="#FFFFFF" />
      </MotiView>

      <MotiView style={styles.textContainer}>
        <MotiText
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
          }}
          style={styles.title}
        >
          StreamFlix
        </MotiText>
        <MotiText
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 500,
            loop: true,
          }}
          style={styles.subtitle}
        >
          Unlimited movies, TV shows, and more.
        </MotiText>
      </MotiView>

      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          delay: 2000,
        }}
        style={styles.buttonContainer}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </MotiView>

      {[...Array(20)].map((_, index) => (
        <MotiView
          key={index}
          from={{
            opacity: 0,
            scale: 0,
            translateX: Math.random() * width,
            translateY: Math.random() * height,
          }}
          animate={{
            opacity: 0.7,
            scale: 1,
            translateX: Math.random() * width,
            translateY: Math.random() * height,
          }}
          transition={{
            type: 'timing',
            duration: 2000 + Math.random() * 2000,
            loop: true,
          }}
          style={[
            styles.bubble,
            {
              width: 10 + Math.random() * 20,
              height: 10 + Math.random() * 20,
            },
          ]}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
  },
});