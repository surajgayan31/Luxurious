import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../component/header/Header';
import { color, fontSize } from '../../../styles/styles';
import CustomButton from '../../../component/customButton/CustomButton';
import QuantityPicker from '../../../component/customButton/QuantityPicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
} from '../../../redux/slices/cartSlice';
import { styles } from './style';

const Cart = ({ route, navigation }: any) => {
  // Expect items as an array: [{ item, quantity }]
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => selectCartItems(state));

  const renderEmpty = () => (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyText}>Your cart is empty.</Text>
    </View>
  );

  const onChangeQty = (id: any, q: number) => {
    dispatch(updateQuantity({ id, quantity: q }));
  };

  const confirmRemove = (id: any, name?: string) => {
    Alert.alert(
      'Remove item',
      `Are you sure you want to remove "${name ?? 'this item'}" from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => dispatch(removeItem({ id })) },
      ],
    );
  };

  const renderItem = ({ item }: any) => {
    const product = item.item || item;
    const qty = item.quantity ?? 1;
    const itemTotal = (product.price || 0) * qty;
    return (
      <View style={styles.row}>
        <Image source={product.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>
            {product.currency ?? 'USD'} {product.price?.toFixed(2)}
          </Text>
          <View style={styles.rowBottom}>
            <QuantityPicker
              value={qty}
              min={1}
              size={25}
              onChange={v => onChangeQty(product.id ?? product.name, v)}
            />
            <Text style={styles.itemTotal}>
              Item: USD {itemTotal.toFixed(2)}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => confirmRemove(product.id ?? product.name, product.name)}
          style={styles.removePress}
        >
          <Image
            source={require('../../../assets/images/icon/bin.png')}
            style={{ width: 20, height: 20, tintColor: '#d9534f' }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    );
  };

  const total = useSelector((state: RootState) => selectCartTotal(state));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <Header title="Cart" />
      {cartItems.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(it, idx) => it?.item?.id || it?.id || idx.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    
    {cartItems.length > 0 && (
        <View style={styles.footer}>
            <View style={styles.totalWrap}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalAmount}>USD {total.toFixed(2)}</Text>
            </View>
            <CustomButton
                text="Checkout"
                width={'100%'}
                textSize={fontSize.size_12}
                marginVertical={10}
                height={48}
                borderRadius={8}
                onPress={() => {
                    /* TODO: checkout flow */
                }}
            />
        </View>
    )}
    </SafeAreaView>
  );
};



export default Cart;
