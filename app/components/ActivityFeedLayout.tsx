import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const activityData = [
  { id: '1', user: 'John Doe', action: 'liked your post', time: '5m ago' },
  { id: '2', user: 'Jane Smith', action: 'commented on your photo', time: '15m ago' },
  { id: '3', user: 'Bob Johnson', action: 'started following you', time: '1h ago' },
  // Add more activity items as needed
];

const ActivityItem = ({ item }) => (
  <View style={styles.activityItem}>
    <Image
      source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
      style={styles.avatar}
    />
    <View style={styles.activityContent}>
      <Text style={styles.activityText}>
        <Text style={styles.username}>{item.user}</Text> {item.action}
      </Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  </View>
);

export function ActivityFeedLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>
      <FlatList
        data={activityData}
        renderItem={({ item }) => <ActivityItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
    justifyContent: 'center',
  },
  activityText: {
    fontSize: 16,
  },
  username: {
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});