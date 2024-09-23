import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export const ColorfulSpinner: React.FC = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
        {['#FF1493', '#00CED1', '#FFD700', '#32CD32'].map((color, index) => (
          <View key={index} style={[styles.arc, { backgroundColor: color, transform: [{ rotate: `${index * 90}deg` }] }]} />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 100,
    height: 100,
  },
  arc: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    borderTopRightRadius: 100,
  },
});