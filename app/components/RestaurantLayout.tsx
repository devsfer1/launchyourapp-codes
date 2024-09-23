import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const restaurants = [
  { id: 1, name: "Joe's Diner", cuisine: 'American', rating: 4.2, image: 'https://example.com/joes.jpg' },
  { id: 2, name: 'Sushi Ko', cuisine: 'Japanese', rating: 4.5, image: 'https://example.com/sushiko.jpg' },
  { id: 3, name: 'Pasta Palace', cuisine: 'Italian', rating: 4.3, image: 'https://example.com/pasta.jpg' },
];

export function RestaurantLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-3xl font-bold mb-4">Restaurants</Text>
          <View className="flex-row items-center mb-6">
            <Ionicons name="location" size={24} color="#f97316" />
            <Text className="ml-2 text-lg">New York, NY</Text>
          </View>
          {restaurants.map((restaurant) => (
            <TouchableOpacity key={restaurant.id} className="bg-white rounded-lg shadow-md mb-4">
              <Image source={{ uri: restaurant.image }} className="w-full h-48 rounded-t-lg" />
              <View className="p-3">
                <Text className="text-xl font-semibold">{restaurant.name}</Text>
                <Text className="text-gray-500">{restaurant.cuisine}</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={16} color="#f97316" />
                  <Text className="ml-1 text-orange-500 font-bold">{restaurant.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}