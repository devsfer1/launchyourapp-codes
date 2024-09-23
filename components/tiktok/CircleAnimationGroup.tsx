import React from 'react';
import { View } from 'react-native';
import { CircleAnimation } from './CircleAnimation';

export const CircleAnimationGroup: React.FC = () => {
  const colors = ['#fc5c65', '#26de81', '#4b7bec'];

  return (
    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
      <CircleAnimation delay={0} duration={3000} color={colors[0]} />
      <CircleAnimation delay={1000} duration={3000} color={colors[1]} />
      <CircleAnimation delay={2000} duration={3000} color={colors[2]} />
    </View>
  );
};