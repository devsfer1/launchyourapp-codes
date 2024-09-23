import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Movie {
  id: number;
  title: string;
  image: string;
  category: string;
}

const movies: Movie[] = [
  { id: 1, title: 'Stranger Things', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Trending Now' },
  { id: 2, title: 'The Crown', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Trending Now' },
  { id: 3, title: 'Bridgerton', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Trending Now' },
  { id: 4, title: 'Money Heist', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Popular on Netflix' },
  { id: 5, title: 'The Witcher', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Popular on Netflix' },
  { id: 6, title: 'Squid Game', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Popular on Netflix' },
  { id: 7, title: 'Dark', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', category: 'Sci-Fi & Fantasy' },
  { id: 8, title: 'Black Mirror', image: 'https://picsum.photos/id/8/300/450', category: 'Sci-Fi & Fantasy' },
  { id: 9, title: 'Altered Carbon', image: 'https://picsum.photos/id/9/300/450', category: 'Sci-Fi & Fantasy' },
];

const categories = ['Trending Now', 'Popular on Netflix', 'Sci-Fi & Fantasy'];

export function NetflixCloneLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.featuredContent}>
          <Image
            source={{ uri: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=' }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>Featured Title</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={24} color="#000" />
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.myListButton}>
                <Text style={styles.myListButtonText}>My List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {categories.map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movies
                .filter((movie) => movie.category === category)
                .map((movie) => (
                  <TouchableOpacity key={movie.id} style={styles.movieCard}>
                    <Image source={{ uri: movie.image }} style={styles.movieImage} />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 30,
  },
  featuredContent: {
    height: 450,
    marginBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  playButtonText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  myListButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  myListButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 10,
  },
  movieCard: {
    marginRight: 10,
    marginLeft: 10,
  },
  movieImage: {
    width: 130,
    height: 200,
    borderRadius: 5,
  },
});