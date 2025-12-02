import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Utils } from '../../utils/Utils';
import { color, fontSize } from '../../styles/styles';

type Item = {
  id: number;
  name: string;
  image: any;
  short_description?: string;
  price?: number;
  currency?: string;
};

type Props = {
  data: Item[];
  numColumns?: number;
  onItemPress?: (item: Item) => void;
  cardStyle?: object;
};

const { width } = Dimensions.get('window');
const GAP = 12;

const ProductListing: React.FC<Props> = ({ data, numColumns = 2, onItemPress, cardStyle }) => {
  const itemWidth = (width - GAP * (numColumns + 1)) / numColumns;

  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() => onItemPress && onItemPress(item)}
      style={[styles.card, { width: itemWidth }, cardStyle]}
    >
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.short_description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {item.currency ?? 'USD'} {item.price?.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(i) => i.id.toString()}
      contentContainerStyle={styles.list}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: GAP,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: GAP,
    marginRight: GAP,
    overflow: 'hidden',
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Elevation (Android)
    elevation: 3,
  },
  imageWrap: {
    width: '100%',
    height: Utils.calculateHeight(16),
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: 10,
  },
  title: {
    fontSize: fontSize.size_15,
    fontWeight: '700',
    color: color.grayText || '#222',
  },
  desc: {
    marginTop: 6,
    fontSize: fontSize.size_12,
    color: color.textGray || '#666',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: fontSize.size_14,
    fontWeight: '700',
    color: color.buttonColor,
  },
});

export default ProductListing;
