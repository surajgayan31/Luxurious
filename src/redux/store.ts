 
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer, {RootState} from './rootReducer';
import { setCart } from './slices/cartSlice';

const CART_STORAGE_KEY = 'CART_ITEMS';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {  }
      }
    })
});

// Load persisted cart from AsyncStorage and initialize Redux state
(async function loadCartFromStorage() {
  try {
    const json = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (json) {
      const items = JSON.parse(json);
      store.dispatch(setCart(items));
    }
  } catch (e) {
    console.warn('Failed to load cart from storage', e);
  }
})();

// Persist cart to AsyncStorage on changes (debounced)
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
let previousCart: any = store.getState().cart?.items;
store.subscribe(() => {
  try {
    const state = store.getState();
    const cart = state.cart?.items;
    if (cart !== previousCart) {
      previousCart = cart;
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)).catch(err => {
          console.warn('Failed saving cart to storage', err);
        });
      }, 500);
    }
  } catch (e) {
    console.warn('Error in cart persistence subscriber', e);
  }
});

export default store;
