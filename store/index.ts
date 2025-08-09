import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import orderReducer from "./orderSlice";
import wishlistReducer from "./wishlistSlice"; // ✅
import reviewReducer from "./reviewSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    filter: filterReducer,
    order: orderReducer,
    wishlist: wishlistReducer, // ✅ add here
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

