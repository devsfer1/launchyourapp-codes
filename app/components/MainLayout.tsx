import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
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

          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}