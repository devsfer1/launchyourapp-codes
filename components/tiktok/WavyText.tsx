import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface WavyTextProps {
  text: string;
}

export const WavyText: React.FC<WavyTextProps> = ({ text }) => {
  const animatedValues = text.split('').map(() => new Animated.Value(0));

  useEffect(() => {
    const animations = animatedValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.parallel(animations).start();
  }, []);

  return (
    <View style={styles.container}>
      {text.split('').map((char, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.character,
            {
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
              ],
            },
          ]}
        >
          {char}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  character: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginHorizontal: 2,
  },
});