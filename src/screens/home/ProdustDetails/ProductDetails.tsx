import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../component/header/Header';
import { styles } from './style';
import QuantityPicker from '../../../component/customButton/QuantityPicker';
import CustomButton from '../../../component/customButton/CustomButton';
import { Utils } from '../../../utils/Utils';
import { color, fontSize } from '../../../styles/styles';
import navigationService from '../../../routes/navigationService';
import { routes } from '../../../routes/stacks';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  updateQuantity,
  selectCartItems,
} from '../../../redux/slices/cartSlice';
import { RootState } from '../../../redux/rootReducer';

const ProductDetails = ({ route }: any) => {
  const item = route?.params?.item;

  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => selectCartItems(state));

  // If product already in cart, prefill the quantity
  React.useEffect(() => {
    if (!item) return;
    const id = item.id ?? item.name;
    const existing = cartItems.find(
      (ci: any) => (ci.item?.id ?? ci.item?.name) === id,
    );
    if (existing) setQuantity(existing.quantity ?? 1);
  }, [cartItems, item]);

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Product" />
        <View style={{ padding: 16 }}>
          <Text>No product data found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <Header title={item.name} rightElement={true} />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 140 }]}
      >
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{width:'70%'}}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>
                {item.currency ?? 'USD'} {item.price?.toFixed(2)}
              </Text>
            </View>
            <View style={{     }}>
          <QuantityPicker value={quantity} onChange={v => setQuantity(v)} />
        </View>
          </View>
          <View style={styles.disView}>
            <Text
              style={{
                fontSize: fontSize.size_18,
                fontWeight: 'bold',
                paddingBottom: 10,
              }}
            >
              Description
            </Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        </View>
        
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 15,
          backgroundColor: color.white,
          borderTopWidth: 1,
          borderColor: '#eee',
        }}
      >
        <SafeAreaView
          edges={['bottom']}
          style={{ backgroundColor: 'transparent' }}
        >
          <CustomButton
            text={`Add to Cart (${quantity})`}
            marginVertical={Utils.calculateHeight(0)}
            width={'100%'}
            borderRadius={10}
            height={50}
            textSize={fontSize.size_12}
            onPress={() => {
              const id = item.id ?? item.name;
              const existing = cartItems.find(
                (ci: any) => (ci.item?.id ?? ci.item?.name) === id,
              );
              if (existing) {
                // set exact quantity
                dispatch(updateQuantity({ id, quantity }));
              } else {
                dispatch(addItem({ item, quantity }));
              }
              navigationService.navigate(routes.Cart);
            }}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
