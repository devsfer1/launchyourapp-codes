import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Tweet {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: number;
}

const initialTweets: Tweet[] = [
  {
    id: 1,
    user: { name: 'John Doe', handle: '@johndoe', avatar: 'https://i.pravatar.cc/100?img=1' },
    content: 'Just had an amazing coffee at the new café downtown! ☕️ #CoffeeLovers',
    timestamp: '2h',
    likes: 45,
    retweets: 5,
    comments: 3,
  },
  {
    id: 2,
    user: { name: 'Jane Smith', handle: '@janesmith', avatar: 'https://i.pravatar.cc/100?img=2' },
    content: 'Excited to announce my new book release next month! 📚 #NewBook #AuthorLife',
    timestamp: '4h',
    likes: 120,
    retweets: 30,
    comments: 15,
  },
  {
    id: 3,
    user: { name: 'Tech News', handle: '@technews', avatar: 'https://i.pravatar.cc/100?img=3' },
    content: 'Breaking: New AI breakthrough in natural language processing! 🤖 #AI #TechNews',
    timestamp: '6h',
    likes: 500,
    retweets: 200,
    comments: 50,
  },
  {
    id: 4,
    user: { name: 'Travel Enthusiast', handle: '@travelguru', avatar: 'https://i.pravatar.cc/100?img=4' },
    content: "Just booked my next adventure! Can't wait to explore the beautiful beaches of Bali 🏖️ #TravelDreams",
    timestamp: '8h',
    likes: 78,
    retweets: 12,
    comments: 8,
  },
  {
    id: 5,
    user: { name: 'Foodie Fanatic', handle: '@foodielove', avatar: 'https://i.pravatar.cc/100?img=5' },
    content: 'Made the most delicious homemade pizza tonight! 🍕 Recipe in bio. #HomeCooking #PizzaNight',
    timestamp: '10h',
    likes: 89,
    retweets: 15,
    comments: 10,
  },
  {
    id: 6,
    user: { name: 'Fitness Freak', handle: '@fitnessguru', avatar: 'https://i.pravatar.cc/100?img=6' },
    content: 'Just completed a 10K run! Remember, every step counts towards your fitness goals. 🏃‍♂️💪 #FitnessMotivation',
    timestamp: '12h',
    likes: 150,
    retweets: 25,
    comments: 20,
  },
];

export function TwitterUICloneLayout() {
  const [tweets, setTweets] = useState(initialTweets);
  const [likedTweets, setLikedTweets] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setTweets(prevTweets =>
      prevTweets.map(tweet =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + (likedTweets.includes(id) ? -1 : 1) } : tweet
      )
    );
    setLikedTweets(prevLiked =>
      prevLiked.includes(id) ? prevLiked.filter(tweetId => tweetId !== id) : [...prevLiked, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=7' }} style={styles.avatar} />
        </TouchableOpacity>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png' }} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tweets.map((tweet) => (
          <View key={tweet.id} style={styles.tweetContainer}>
            <Image source={{ uri: tweet.user.avatar }} style={styles.tweetAvatar} />
            <View style={styles.tweetContent}>
              <View style={styles.tweetHeader}>
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.tweetHandle}>{tweet.user.handle}</Text>
                <Text style={styles.tweetTimestamp}>{tweet.timestamp}</Text>
              </View>
              <Text style={styles.tweetText}>{tweet.content}</Text>
              <View style={styles.tweetActions}>
                <TouchableOpacity style={styles.tweetAction}>
                  <Ionicons name="chatbubble-outline" size={18} color="#657786" />
                  <Text style={styles.tweetActionText}>{tweet.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tweetAction}>
                  <Ionicons name="repeat-outline" size={18} color="#657786" />
                  <Text style={styles.tweetActionText}>{tweet.retweets}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tweetAction} onPress={() => handleLike(tweet.id)}>
                  <Ionicons 
                    name={likedTweets.includes(tweet.id) ? "heart" : "heart-outline"} 
                    size={18} 
                    color={likedTweets.includes(tweet.id) ? "#E0245E" : "#657786"} 
                  />
                  <Text style={[styles.tweetActionText, likedTweets.includes(tweet.id) && styles.likedText]}>
                    {tweet.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tweetAction}>
                  <Ionicons name="share-outline" size={18} color="#657786" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logo: {
    width: 30,
    height: 30,
  },
  tweetContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  tweetAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tweetName: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  tweetHandle: {
    color: '#657786',
    marginRight: 4,
  },
  tweetTimestamp: {
    color: '#657786',
  },
  tweetText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  tweetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tweetAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tweetActionText: {
    marginLeft: 4,
    color: '#657786',
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  likedText: {
    color: '#E0245E',
  },
});