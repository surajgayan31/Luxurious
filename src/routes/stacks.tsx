import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/auth/Splash';
import Login from '../screens/auth/login/Login';
import Product from '../screens/home/Product';
import ProductDetails from '../screens/home/ProdustDetails/ProductDetails';
import Cart from '../screens/home/Cart/Cart';

const Stack = createNativeStackNavigator();

export const routes = {
  NAVIGATION_AUTH_LOADING_STACK: 'NAVIGATION_AUTH_LOADING_STACK',
  Splash: 'Splash',
  Login: 'Login',
  Product: 'Product',
  ProductDetails: 'ProductDetails',
  Cart: 'Cart',
};

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const verticalAnimation = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: (current: any, layouts: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

export const RootStack = () => (
  <Stack.Navigator
    screenOptions={{
      animationTypeForReplace: 'pop',
      headerShown: false,
      animationEnabled: Platform.OS == 'android' ? false : true,
    }}
  >
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_STACK}
      component={MyAuthLoadingStack}
    />
  </Stack.Navigator>
);

export const MyAuthLoadingStack = () => (
  <Stack.Navigator
    screenOptions={{
      animationTypeForReplace: 'pop',
      headerShown: false,
      animationEnabled: Platform.OS == 'android' ? false : true,
    }}
  >
    <Stack.Screen name={routes.Splash} component={Splash} />
    <Stack.Screen name={routes.Login} component={Login} />
    <Stack.Screen name={routes.Product} component={Product} />
    <Stack.Screen name={routes.ProductDetails} component={ProductDetails} />
    <Stack.Screen name={routes.Cart} component={Cart} />
  </Stack.Navigator>
);
