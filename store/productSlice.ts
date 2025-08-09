// store/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    // other reducers: addProduct, updateProduct, etc.
  },
});

export const { deleteProduct } = productSlice.actions;
export default productSlice.reducer;
