import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const trendingItems = [
  { id: 1, title: 'Cosmic Exploration', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29zbWljfGVufDB8fDB8fHww', category: 'Science' },
  { id: 2, title: 'AI Revolution', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpfGVufDB8fDB8fHww', category: 'Technology' },
  { id: 3, title: 'Sustainable Living', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1c3RhaW5hYmxlfGVufDB8fDB8fHww', category: 'Environment' },
];

export function TrendingLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending Now</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
          {trendingItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.trendingItem}>
              <Image source={{ uri: item.image }} style={styles.trendingImage} />
              <View style={styles.trendingOverlay}>
                <Text style={styles.trendingCategory}>{item.category}</Text>
                <Text style={styles.trendingTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Content</Text>
          <TouchableOpacity style={styles.featuredItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW58ZW58MHx8MHx8fDA%3D' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Ocean Conservation</Text>
              <Text style={styles.featuredDescription}>Discover how you can help protect our oceans</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.quickLink}>
            <Ionicons name="book-outline" size={24} color="#4A90E2" />
            <Text style={styles.quickLinkText}>Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Ionicons name="videocam-outline" size={24} color="#4A90E2" />
            <Text style={styles.quickLinkText}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Ionicons name="people-outline" size={24} color="#4A90E2" />
            <Text style={styles.quickLinkText}>Community</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  trendingScroll: {
    marginBottom: 30,
  },
  trendingItem: {
    width: width * 0.7,
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  trendingCategory: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuredSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featuredItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 15,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLink: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLinkText: {
    marginTop: 5,
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
});