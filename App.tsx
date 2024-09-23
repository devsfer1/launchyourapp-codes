import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ProfileLayout } from './components/ProfileLayout';
import { DashboardLayout } from './components/DashboardLayout';
import { LoginLayout } from './components/LoginLayout';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Dashboard') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={LoginLayout}
          options={{ unmountOnBlur: true }}
          options={{ unmountOnBlur: true }}
          options={{ unmountOnBlur: true }}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardLayout}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileLayout}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}