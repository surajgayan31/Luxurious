import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  item: any;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const { item, quantity } = action.payload;
      const id = item.id ?? item.name;
      const existing = state.items.find(ci => (ci.item.id ?? ci.item.name) === id);
      if (existing) {
        existing.quantity = Math.min((existing.quantity || 0) + quantity, 999);
      } else {
        state.items.push({ item, quantity });
      }
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload || [];
    },
    removeItem(state, action: PayloadAction<{ id: string | number }>) {
      const id = action.payload.id;
      state.items = state.items.filter(ci => (ci.item.id ?? ci.item.name) !== id);
    },
    updateQuantity(state, action: PayloadAction<{ id: string | number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const existing = state.items.find(ci => (ci.item.id ?? ci.item.name) === id);
      if (existing) existing.quantity = Math.max(1, Math.min(999, quantity));
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: any) => state.cart.items;
export const selectCartTotal = (state: any) => state.cart.items.reduce((sum: number, ci: any) => sum + (ci.item.price || 0) * (ci.quantity || 0), 0);
