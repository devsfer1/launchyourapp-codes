import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const LoadingDots: React.FC = () => {
  const animations = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];

  useEffect(() => {
    const sequence = animations.map((anim, index) => 
      Animated.sequence([
        Animated.delay(index * 200),
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.loop(Animated.parallel(sequence)).start();
  }, []);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: anim,
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00CED1',
    marginHorizontal: 10,
  },
});