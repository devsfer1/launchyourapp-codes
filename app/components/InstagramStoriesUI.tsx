import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Story {
  id: number;
  username: string;
  userImage: string;
  storyImage: string;
}

const stories: Story[] = [
  { id: 1, username: 'user1', userImage: 'https://i.pravatar.cc/150?img=1', storyImage: 'https://picsum.photos/id/1018/1000/1000' },
  { id: 2, username: 'user2', userImage: 'https://i.pravatar.cc/150?img=2', storyImage: 'https://picsum.photos/id/1015/1000/1000' },
  { id: 3, username: 'user3', userImage: 'https://i.pravatar.cc/150?img=3', storyImage: 'https://picsum.photos/id/1019/1000/1000' },
  { id: 4, username: 'user4', userImage: 'https://i.pravatar.cc/150?img=4', storyImage: 'https://picsum.photos/id/1016/1000/1000' },
];

export function InstagramStoriesUI() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 1) {
        setProgress(prev => prev + 0.01);
      } else {
        clearInterval(timer);
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1);
          setProgress(0);
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [progress, currentStoryIndex]);

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={{ uri: currentStory.storyImage }} style={styles.storyImage} />
      <View style={styles.overlay}>
        <View style={styles.progressContainer}>
          {stories.map((_, index) => (
            <View key={index} style={styles.progressBar}>
              <MotiView
                from={{ width: '0%' }}
                animate={{ width: index === currentStoryIndex ? `${progress * 100}%` : index < currentStoryIndex ? '100%' : '0%' }}
                style={[styles.progress, { backgroundColor: index <= currentStoryIndex ? '#fff' : 'rgba(255,255,255,0.5)' }]}
              />
            </View>
          ))}
        </View>
        <View style={styles.header}>
          <Image source={{ uri: currentStory.userImage }} style={styles.userImage} />
          <Text style={styles.username}>{currentStory.username}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <View style={styles.invisibleTouchArea} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
        <View style={styles.invisibleTouchArea} />
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 2,
  },
  progress: {
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: width / 2,
  },
  previousButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width / 2,
  },
  invisibleTouchArea: {
    width: '100%',
    height: '100%',
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
});