import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', title: 'Personal Information' },
      { icon: 'lock-closed-outline', title: 'Password & Security' },
      { icon: 'notifications-outline', title: 'Notifications', toggle: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'color-palette-outline', title: 'Theme', value: 'Light' },
      { icon: 'language-outline', title: 'Language', value: 'English' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', title: 'Help Center' },
      { icon: 'chatbubble-outline', title: 'Contact Us' },
    ],
  },
];

export function SettingsLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.settingItem}>
                <View style={styles.settingItemLeft}>
                  <Ionicons name={item.icon} size={24} color="#333" style={styles.itemIcon} />
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                {item.toggle ? (
                  <Switch value={true} onValueChange={() => { }} />
                ) : item.value ? (
                  <Text style={styles.itemValue}>{item.value}</Text>
                ) : (
                  <Ionicons name="chevron-forward" size={24} color="#bbb" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
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
  section: {
    marginTop: 30,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 15,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: '#888',
  },
});