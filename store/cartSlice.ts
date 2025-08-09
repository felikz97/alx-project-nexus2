// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

// 👕 Define CartItem based on Product with added quantity
export interface CartItem extends Product {
  quantity: number;
}

// 🛒 Define CartState
interface CartState {
  items: CartItem[];
}

// 📦 Initial state
const initialState: CartState = {
  items: [],
};

// 🧠 Create slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Add to Cart
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ➖ Remove item
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // 🔄 Update quantity
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    // 🧹 Clear the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// 📤 Export actions & reducer
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
