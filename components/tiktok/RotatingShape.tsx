import React, { useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

export const RotatingShape: React.FC = () => {
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ rotate: spin }] }]}>
      <View style={styles.shape} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape: {
    width: 60,
    height: 60,
    backgroundColor: '#e74c3c',
    transform: [{ rotate: '45deg' }],
  },
});