import React, { useState, useEffect, useCallback } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface TypingTextProps {
  initialText: string;
  typingText: string;
  typingSpeed?: number;
  pauseDuration?: number;
  fadeDuration?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({
  initialText,
  typingText,
  typingSpeed = 50,
  pauseDuration = 2000,
  fadeDuration = 500,
}) => {
  const [displayedText, setDisplayedText] = useState(initialText);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const resetAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(() => {
      setDisplayedText(initialText);
      setCurrentIndex(0);
      setIsTyping(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start();
    });
  }, [initialText, fadeAnim, fadeDuration]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping && currentIndex < typingText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + typingText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
    } else if (isTyping && currentIndex === typingText.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, pauseDuration);
    } else if (!isTyping) {
      timeout = setTimeout(resetAnimation, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, typingText, typingSpeed, pauseDuration, isTyping, resetAnimation]);

  return (
    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
      {displayedText}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'red',
  },
});