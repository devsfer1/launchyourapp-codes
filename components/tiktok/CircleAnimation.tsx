import React, { useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const circleSize = width * 0.3;

interface CircleAnimationProps {
  delay: number;
  duration: number;
  color: string;
}

export const CircleAnimation: React.FC<CircleAnimationProps> = ({ delay, duration, color }) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: color,
        opacity: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 0],
        }),
        transform: [
          {
            scale: scaleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 4],
            }),
          },
        ],
      }}
    />
  );
};