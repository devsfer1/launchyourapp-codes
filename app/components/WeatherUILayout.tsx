import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

const weatherData = {
  city: 'New York',
  temperature: 72,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 8,
  forecast: [
    { day: 'Mon', temp: 70, icon: 'partly-sunny' },
    { day: 'Tue', temp: 68, icon: 'rainy' },
    { day: 'Wed', temp: 75, icon: 'sunny' },
    { day: 'Thu', temp: 73, icon: 'partly-sunny' },
    { day: 'Fri', temp: 70, icon: 'cloudy' },
  ],
};

export function WeatherUILayout() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.city}>{weatherData.city}</Text>
          <Text style={styles.temperature}>{weatherData.temperature}°F</Text>
          <Text style={styles.condition}>{weatherData.condition}</Text>
        </View>

        <View style={styles.iconContainer}>
          <MotiView
            from={{ translateY: 0, translateX: 0 }}
            animate={{ translateY: -50, translateX: 30 }}
            transition={{
              type: 'timing',
              duration: 2000,
              loop: true,
            }}
          >
            <Ionicons name="sunny" size={100} color="#FFD700" />
          </MotiView>
          <MotiView
            from={{ translateX: 0 }}
            animate={{ translateX: width * 0.2 }}
            transition={{
              type: 'timing',
              duration: 3000,
              loop: true,
            }}
            style={styles.cloud}
          >
            <Ionicons name="cloud" size={80} color="#FFFFFF" />
          </MotiView>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={24} color="#FFFFFF" />
            <Text style={styles.detailText}>Humidity: {weatherData.humidity}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="speedometer" size={24} color="#FFFFFF" />
            <Text style={styles.detailText}>Wind: {weatherData.windSpeed} mph</Text>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <View style={styles.forecastItems}>
            {weatherData.forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>{day.day}</Text>
                <Ionicons name={day.icon as any} size={24} color="#FFFFFF" />
                <Text style={styles.forecastTemp}>{day.temp}°F</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  city: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  condition: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  cloud: {
    position: 'absolute',
    top: -20,
    left: 40,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  forecastContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  forecastItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastDay: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
});