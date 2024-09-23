import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

interface Workout {
  id: number;
  name: string;
  duration: string;
  calories: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
}

const workouts: Workout[] = [
  { id: 1, name: 'Morning Yoga', duration: '30 min', calories: 150, difficulty: 'Easy', icon: 'body' },
  { id: 2, name: 'HIIT Cardio', duration: '45 min', calories: 400, difficulty: 'Hard', icon: 'fitness' },
  { id: 3, name: 'Strength Training', duration: '60 min', calories: 300, difficulty: 'Medium', icon: 'barbell' },
  { id: 4, name: 'Pilates', duration: '40 min', calories: 200, difficulty: 'Medium', icon: 'body' },
  { id: 5, name: 'Zumba Dance', duration: '50 min', calories: 350, difficulty: 'Medium', icon: 'musical-notes' },
  { id: 6, name: 'Cycling', duration: '45 min', calories: 500, difficulty: 'Hard', icon: 'bicycle' },
  { id: 7, name: 'Swimming', duration: '40 min', calories: 400, difficulty: 'Medium', icon: 'water' },
  { id: 8, name: 'Boxing', duration: '50 min', calories: 450, difficulty: 'Hard', icon: 'fist' },
  { id: 9, name: 'Meditation', duration: '20 min', calories: 50, difficulty: 'Easy', icon: 'leaf' },
  { id: 10, name: 'Stretching', duration: '25 min', calories: 100, difficulty: 'Easy', icon: 'body' },
];

export function WorkoutListUI() {
  const getDifficultyColor = (difficulty: Workout['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50';
      case 'Medium':
        return '#FFC107';
      case 'Hard':
        return '#F44336';
    }
  };

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Text style={styles.title}>Workout List</Text>
      </MotiView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {workouts.map((workout, index) => (
          <MotiView
            key={workout.id}
            from={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 500, delay: index * 100 }}
            style={styles.workoutCard}
          >
            <View style={styles.workoutHeader}>
              <Ionicons name={workout.icon} size={32} color="#333" style={styles.workoutIcon} />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDuration}>{workout.duration}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) }]}>
                <Text style={styles.difficultyText}>{workout.difficulty}</Text>
              </View>
            </View>
            <View style={styles.workoutDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="flame-outline" size={20} color="#666" />
                <Text style={styles.detailText}>{workout.calories} calories</Text>
              </View>
            </View>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIcon: {
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  workoutDetails: {
    marginTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
});