import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Property {
  id: number;
  title: string;
  image: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

const properties: Property[] = [
  { id: 1, title: 'Modern Apartment', image: 'https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=612x612&w=0&k=20&c=aPwqJ67O3CGGItsDoI8fuGwAuTR3L3B80tImG2mlQQ8=', price: 1500, location: 'Downtown', bedrooms: 2, bathrooms: 2, area: 1000 },
  { id: 2, title: 'Cozy Studio', image: 'https://resihome.com/hs-fs/hubfs/%5Bimage%5D%20resihome%20renter%20couple-1.jpg?width=1200&height=800&name=%5Bimage%5D%20resihome%20renter%20couple-1.jpg', price: 900, location: 'Midtown', bedrooms: 1, bathrooms: 1, area: 500 },
  { id: 3, title: 'Luxury Penthouse', image: 'https://photos.zillowstatic.com/fp/1fc328c05481c2787662b682dce815b0-p_e.jpg', price: 3000, location: 'Uptown', bedrooms: 3, bathrooms: 3, area: 2000 },
  { id: 4, title: 'Suburban House', image: 'https://ssl.cdn-redfin.com/photo/rent/ba38d2a7-3ccf-4abc-9f4b-e20c7687ea79/islphoto/genIsl.0_1.jpg', price: 2000, location: 'Suburbs', bedrooms: 4, bathrooms: 2.5, area: 2500 },
];

export function RentUICloneLayout() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = useMemo(() => {
    return properties.filter(property => 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        <Text style={styles.sectionTitle}>Featured Properties</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredContainer}>
          {filteredProperties.map((property) => (
            <TouchableOpacity key={property.id} style={styles.featuredCard}>
              <Image source={{ uri: property.image }} style={styles.featuredImage} />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredPrice}>${property.price}/mo</Text>
                <Text style={styles.featuredTitle}>{property.title}</Text>
                <Text style={styles.featuredLocation}>
                  <Ionicons name="location-outline" size={14} color="#666" /> {property.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Nearby Properties</Text>
        {filteredProperties.map((property) => (
          <TouchableOpacity key={property.id} style={styles.propertyCard}>
            <Image source={{ uri: property.image }} style={styles.propertyImage} />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyPrice}>${property.price}/mo</Text>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <Text style={styles.propertyLocation}>
                <Ionicons name="location-outline" size={14} color="#666" /> {property.location}
              </Text>
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyDetail}>
                  <Ionicons name="bed-outline" size={14} color="#666" /> {property.bedrooms} beds
                </Text>
                <Text style={styles.propertyDetail}>
                  <Ionicons name="water-outline" size={14} color="#666" /> {property.bathrooms} baths
                </Text>
                <Text style={styles.propertyDetail}>
                  <Ionicons name="resize-outline" size={14} color="#666" /> {property.area} sqft
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginBottom: 16,
  },
  featuredContainer: {
    paddingLeft: 16,
    marginBottom: 32,
  },
  featuredCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  featuredInfo: {
    padding: 16,
  },
  featuredPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  featuredLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  propertyImage: {
    width: 120,
    height: 120,
  },
  propertyInfo: {
    flex: 1,
    padding: 16,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  propertyDetail: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
});