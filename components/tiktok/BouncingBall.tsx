import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const BouncingBall: React.FC = () => {
  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const yPosition = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  return (
    <Animated.View
      style={[
        styles.ball,
        {
          transform: [{ translateY: yPosition }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ball: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: '#2ecc71',
  },
});