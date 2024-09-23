import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface BubbleProps {
  delay: number;
  size: number;
  color: string;
  startX: number;
}

const Bubble: React.FC<BubbleProps> = ({ delay, size, color, startX }) => {
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: opacity.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-size, { duration: 6000 + Math.random() * 4000, easing: Easing.out(Easing.ease) }),
        -1,
        true
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        true
      )
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color, left: startX },
        animatedStyle,
      ]}
    />
  );
};

export const FloatingBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const colors = ['#FF9FF3', '#FEC3A6', '#EFE3D0', '#A6E3E9', '#CBFFA9'];
    const newBubbles = Array.from({ length: 30 }, (_, i) => (
      <Bubble
        key={i}
        delay={i * 200}
        size={10 + Math.random() * 30}
        color={colors[Math.floor(Math.random() * colors.length)]}
        startX={Math.random() * width}
      />
    ));
    setBubbles(newBubbles);
  }, []);

  return <View style={styles.container}>{bubbles}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
  },
});