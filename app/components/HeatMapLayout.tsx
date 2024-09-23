import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cellSize = Math.floor((width - 80) / 7); // 7 days per week
const containerWidth = cellSize * 7 + 20; // Add some padding

interface HeatMapData {
  value: number;
}

const generateRandomData = (days: number): HeatMapData[] => {
  return Array.from({ length: days }, () => ({
    value: Math.floor(Math.random() * 5), // 0-4 for GitHub-like intensity levels
  }));
};

const colorGradient = [
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
];

const getColor = (value: number): string => {
  return colorGradient[value];
};

export function HeatMapLayout() {
  const [data, setData] = useState<HeatMapData[]>(generateRandomData(365)); // One year of data
  const [weeks, setWeeks] = useState<HeatMapData[][]>([]);
  const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const newWeeks = [];
    for (let i = 0; i < data.length; i += 7) {
      newWeeks.push(data.slice(i, i + 7));
    }
    setWeeks(newWeeks);
  }, [data]);

  const regenerateData = () => {
    setData(generateRandomData(365));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contribution Graph</Text>
        <TouchableOpacity onPress={regenerateData} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heatMapContainer}>
          <View style={styles.daysColumn}>
            {days.map((day, index) => (
              <Text key={index} style={styles.dayLabel}>{day}</Text>
            ))}
          </View>
          <View style={styles.weeksContainer}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekColumn}>
                {week.map((cell, dayIndex) => (
                  <TouchableOpacity
                    key={dayIndex}
                    style={[styles.cell, { backgroundColor: getColor(cell.value) }]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthsContainer}>
          <View style={styles.monthsRow}>
            {months.map((month, index) => (
              <Text key={index} style={[styles.monthLabel, { width: cellSize * 4.3 }]}>{month}</Text>
            ))}
          </View>
        </ScrollView>
        <View style={styles.legendContainer}>
          <Text style={styles.legendLabel}>Less</Text>
          {colorGradient.map((color, index) => (
            <View key={index} style={[styles.legendColor, { backgroundColor: color }]} />
          ))}
          <Text style={styles.legendLabel}>More</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#24292e',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  refreshButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 15,
  },
  heatMapContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  daysColumn: {
    marginRight: 10,
    justifyContent: 'space-between',
    height: cellSize * 7,
  },
  dayLabel: {
    fontSize: 14,
    color: '#586069',
    textAlign: 'center',
  },
  weeksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: containerWidth,
  },
  weekColumn: {
    width: cellSize,
  },
  monthsContainer: {
    marginTop: 10,
  },
  monthsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  monthLabel: {
    fontSize: 16,
    color: '#586069',
    textAlign: 'center',
  },
  cell: {
    width: cellSize - 2,
    height: cellSize - 2,
    margin: 1,
    borderRadius: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  legendColor: {
    width: 24,
    height: 24,
    marginHorizontal: 4,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 16,
    color: '#586069',
    marginHorizontal: 10,
  },
});