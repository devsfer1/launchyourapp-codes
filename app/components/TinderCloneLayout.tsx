import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Person {
  id: number;
  name: string;
  age: number;
  job: string;
  imageUrl: string;
}

const generateRandomPerson = (id: number): Person => ({
  id,
  name: ['John', 'Jane', 'Mike', 'Emily', 'Chris', 'Sarah'][Math.floor(Math.random() * 6)],
  age: Math.floor(Math.random() * (40 - 20) + 20),
  job: ['Software Developer', 'Designer', 'Teacher', 'Engineer', 'Artist', 'Entrepreneur'][Math.floor(Math.random() * 6)],
  imageUrl: `https://picsum.photos/400/500?random=${id}`,
});

const generateProfiles = (count: number): Person[] => {
  return Array.from({ length: count }, (_, index) => generateRandomPerson(index + 1));
};

export function TinderCloneLayout() {
  const [profiles, setProfiles] = useState<Person[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setProfiles(generateProfiles(10)); // Generate 10 profiles initially
  }, []);

  const handleLikeDislike = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex);
      setNextIndex((nextIndex + 1) % profiles.length);

      if (nextIndex === profiles.length - 1) {
        setProfiles(prevProfiles => [...prevProfiles, ...generateProfiles(10)]);
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    });
  };

  if (profiles.length === 0) return null;

  const currentPerson = profiles[currentIndex];
  const nextPerson = profiles[nextIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person" size={30} color="#FF6B6B" />
        <Text style={styles.logoText}>Tinder Clone</Text>
        <Ionicons name="chatbubbles" size={30} color="#FF6B6B" />
      </View>
      
      <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
        <View style={styles.card}>
          <Image
            source={{ uri: currentPerson.imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{currentPerson.name}, {currentPerson.age}</Text>
            <Text style={styles.cardJob}>{currentPerson.job}</Text>
          </View>
        </View>
      </Animated.View>
      
      {/* Preload next image */}
      <Image
        source={{ uri: nextPerson.imageUrl }}
        style={{ width: 1, height: 1, opacity: 0 }}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLikeDislike} disabled={isAnimating}>
          <Ionicons name="close" size={30} color="#FF6B6B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLikeDislike} disabled={isAnimating}>
          <Ionicons name="heart" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 320,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  cardName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardJob: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});