import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
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
  item: Item;
  onPress?: (item: Item) => void;
  style?: object;
  showPrice?: boolean;
};

const ProductCard: React.FC<Props> = ({ item, onPress, style, showPrice = true }) => {
  return (
    <Pressable
      onPress={() => onPress && onPress(item)}
      style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
        {item.short_description ? (
          <Text numberOfLines={2} style={styles.desc}>{item.short_description}</Text>
        ) : null}

        {showPrice && (
          <View style={styles.footer}>
            <Text style={styles.price}>{item.currency ?? 'USD'} {item.price?.toFixed(2)}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    // subtle shadow / elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  pressed: {
    opacity: 0.92,
  },
  imageWrap: {
    width: '100%',
    height: Utils.calculateHeight(16),
    backgroundColor: '#f5f5f5',
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

export default ProductCard;
