import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');
const imageWidth = (width - 40) / 2;

interface ImageItem {
  id: string;
  url: string;
  title: string;
}

const images: ImageItem[] = [
  { id: '1', url: 'https://picsum.photos/id/1018/600', title: 'Mountain' },
  { id: '2', url: 'https://picsum.photos/id/1015/600', title: 'River' },
  { id: '3', url: 'https://picsum.photos/id/1019/600', title: 'Forest' },
  { id: '4', url: 'https://picsum.photos/id/1021/600', title: 'Lake' },
  { id: '5', url: 'https://picsum.photos/id/1022/600', title: 'Ocean' },
  { id: '6', url: 'https://picsum.photos/id/1023/600', title: 'Waterfall' },
  { id: '7', url: 'https://picsum.photos/id/1024/600', title: 'Desert' },
  { id: '8', url: 'https://picsum.photos/id/1025/600', title: 'Animal' },
  { id: '9', url: 'https://picsum.photos/id/1026/600', title: 'Flower' },
];

export function ImageGalleryLayout() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const renderImageItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity onPress={() => openImage(item)} style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <BlurView intensity={70} style={styles.imageTitleContainer}>
        <Text style={styles.imageTitle}>{item.title}</Text>
      </BlurView>
    </TouchableOpacity>
  );

  const openImage = (image: ImageItem) => {
    setSelectedImage(image);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Image Gallery</Text>
      </View> */}
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.imageList}
      />
      <Modal visible={!!selectedImage} transparent={true} animationType="none">
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <BlurView intensity={100} style={StyleSheet.absoluteFill} />
          <View style={styles.modalContent}>
            {selectedImage && (
              <>
                <Image source={{ uri: selectedImage.url }} style={styles.modalImage} resizeMode="contain" />
                <BlurView intensity={70} style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                </BlurView>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImage}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F9',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageList: {
    padding: 10,
  },
  imageContainer: {
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    width: imageWidth,
    height: imageWidth * 1.5,
  },
  imageTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width,
    height: height * 0.8,
  },
  modalTitleContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 15,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});