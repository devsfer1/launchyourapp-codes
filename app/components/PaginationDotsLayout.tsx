import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const DOT_SIZE = 10;
const DOT_SPACING = 8;
const ACTIVE_DOT_SIZE = 14;

export function PaginationDotsLayout() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scrollX, {
      toValue: currentPage * (DOT_SIZE + DOT_SPACING),
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  }, [currentPage]);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    changePage((currentPage + 1) % totalPages);
  };

  const prevPage = () => {
    changePage((currentPage - 1 + totalPages) % totalPages);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dotsContainer}>
          {[...Array(totalPages)].map((_, index) => {
            const scale = scrollX.interpolate({
              inputRange: [
                (index - 1) * (DOT_SIZE + DOT_SPACING),
                index * (DOT_SIZE + DOT_SPACING),
                (index + 1) * (DOT_SIZE + DOT_SPACING),
              ],
              outputRange: [1, ACTIVE_DOT_SIZE / DOT_SIZE, 1],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * (DOT_SIZE + DOT_SPACING),
                index * (DOT_SIZE + DOT_SPACING),
                (index + 1) * (DOT_SIZE + DOT_SPACING),
              ],
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });
            return (
              <TouchableOpacity key={index} onPress={() => changePage(index)}>
                <Animated.View
                  style={[
                    styles.dot,
                    { 
                      transform: [{ scale }],
                      opacity 
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={prevPage} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#ffffff',
    marginHorizontal: DOT_SPACING / 2,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    marginTop: 30,
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 30,
  },
});