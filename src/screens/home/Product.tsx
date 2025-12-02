import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { selectCartItems } from '../../redux/slices/cartSlice';
import Header from '../../component/header/Header';
import ProductCard from '../../component/productlistig/ProductCard';
import { WatchesData } from '../../assets/dummydata/dummyData';
import navigationService from '../../routes/navigationService';
import { routes } from '../../routes/stacks';
import ProductListing from '../../component/productlistig/ProductListing';
import { color } from '../../styles/styles';

const CartButton = () => {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const count = items?.length || 0;

  return (
    <Pressable onPress={() => navigationService.navigate(routes.Cart)} style={styles.cartPress}>
      <Image
        source={require('../../assets/images/icon/cart.png')}
        style={styles.cartIcon}
        resizeMode="contain"
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
};

const Product = () => {
  return (
    <>
      <View>
        <Header title="Product" rightElement={<CartButton />} showBack={false}/>
      </View>
      <View style={{ flex: 1 /* small gap */ }}>
        <ProductListing
          data={WatchesData}
          onItemPress={item => {
            navigationService.navigate(routes.ProductDetails, { item });
          }}
        />
      </View>
    </>
  );
};
export default Product;

const styles = StyleSheet.create({
  cartPress: { padding: 6 },
  cartIcon: { width: 26, height: 26, tintColor: color.white },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
