import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const popularDishes = [
  {
    id: 1,
    name: 'Burger',
    price: '$10.99',
    image: 'https://example.com/burger.jpg',
  },
  {
    id: 2,
    name: 'Pizza',
    price: '$12.99',
    image: 'https://example.com/pizza.jpg',
  },
  {
    id: 3,
    name: 'Sushi',
    price: '$15.99',
    image: 'https://example.com/sushi.jpg',
  },
  {
    id: 4,
    name: 'Tacos',
    price: '$9.99',
    image: 'https://example.com/tacos.jpg',
  },
  {
    id: 5,
    name: 'Salad',
    price: '$8.99',
    image: 'https://example.com/salad.jpg',
  },
];

const categories = [
  {
    id: 1,
    name: 'Burgers',
    icon: 'fast-food',
  },
  {
    id: 2,
    name: 'Pizza',
    icon: 'pizza',
  },
  {
    id: 3,
    name: 'Sushi',
    icon: 'sushi',
  },
  {
    id: 4,
    name: 'Tacos',
    icon: 'taco',
  },
  {
    id: 5,
    name: 'Salads',
    icon: 'leaf',
  },
];

const featuredRestaurants = [
  {
    id: 1,
    name: 'Burger King',
    cuisine: 'Fast Food',
    rating: 4.5,
    image: 'https://example.com/burgerking.jpg',
  },
  {
    id: 2,
    name: 'Pizza Hut',
    cuisine: 'Italian',
    rating: 4.2,
    image: 'https://example.com/pizzahut.jpg',
  },
  {
    id: 3,
    name: 'Sushi Palace',
    cuisine: 'Japanese',
    rating: 4.8,
    image: 'https://example.com/sushipalace.jpg',
  },
  {
    id: 4,
    name: 'Taco Bell',
    cuisine: 'Mexican',
    rating: 4.1,
    image: 'https://example.com/tacobell.jpg',
  },
  {
    id: 5,
    name: 'Saladworks',
    cuisine: 'Salads',
    rating: 4.6,
    image: 'https://example.com/saladworks.jpg',
  },
];

export function FoodLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-3xl font-bold mb-2">Hello, Foodie!</Text>
          <Text className="text-gray-600 mb-4">What would you like to eat today?</Text>

          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-1 mr-2">
              <TouchableOpacity className="bg-gray-100 rounded-full p-3 flex-row items-center">
                <Ionicons name="search" size={20} color="#666" />
                <Text className="ml-2 text-gray-500">Search for dishes...</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-orange-500 rounded-full p-3">
              <Ionicons name="options" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-bold mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {categories.map((category) => (
              <TouchableOpacity key={category.id} className="mr-4 items-center">
                <View className="bg-orange-100 rounded-full p-3 mb-2">
                  <Ionicons name={category.icon} size={24} color="#f97316" />
                </View>
                <Text className="text-sm">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-xl font-bold mb-4">Popular Dishes</Text>
          {popularDishes.map((dish) => (
            <TouchableOpacity key={dish.id} className="bg-white rounded-lg shadow-md mb-4 flex-row">
              <Image source={{ uri: dish.image }} className="w-24 h-24 rounded-l-lg" />
              <View className="flex-1 p-3 justify-center">
                <Text className="text-lg font-semibold mb-1">{dish.name}</Text>
                <Text className="text-orange-500 font-bold">{dish.price}</Text>
              </View>
              <TouchableOpacity className="bg-orange-500 rounded-tr-lg rounded-br-lg w-12 justify-center items-center">
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}

          <Text className="text-xl font-bold mb-4">Featured Restaurants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {featuredRestaurants.map((restaurant) => (
              <TouchableOpacity key={restaurant.id} className="mr-4 w-72">
                <Image source={{ uri: restaurant.image }} className="w-full h-40 rounded-t-lg" />
                <View className="bg-white p-3 rounded-b-lg shadow-md">
                  <Text className="text-lg font-semibold mb-1">{restaurant.name}</Text>
                  <Text className="text-gray-500 mb-2">{restaurant.cuisine}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#f97316" />
                    <Text className="ml-1 text-orange-500 font-bold">{restaurant.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}