import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const RotatingSquares: React.FC = () => {
  const rotationValues = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ];

  useEffect(() => {
    const animations = rotationValues.map((value, index) =>
      Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: 2000 + index * 500,
          useNativeDriver: true,
        })
      )
    );

    Animated.parallel(animations).start();
  }, []);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <View style={styles.container}>
      {rotationValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.square,
            {
              backgroundColor: colors[index],
              transform: [
                {
                  rotate: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                { scale: 1 - index * 0.2 },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
});