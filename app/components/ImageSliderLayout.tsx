import React from 'react';
import { View, StyleSheet, Dimensions, Image, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const PADDING = 20;
const ITEM_WIDTH = width - PADDING * 2;

const images = [
  'https://picsum.photos/id/1018/1200/800',
  'https://picsum.photos/id/1015/1200/800',
  'https://picsum.photos/id/1019/1200/800',
  'https://picsum.photos/id/1021/1200/800',
  'https://picsum.photos/id/1022/1200/800',
];

export function ImageSliderLayout() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_WIDTH + PADDING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: PADDING / 2,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: height * 0.7,
    marginHorizontal: PADDING / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});