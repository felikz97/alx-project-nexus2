// store/orderSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: "ORD123",
      date: "2025-07-31",
      status: "Delivered",
      items: [
        { id: "1", name: "Wireless Headphones", quantity: 1, price: 4999 },
        { id: "2", name: "Smart Watch", quantity: 2, price: 7999 },
      ],
    },
    {
      id: "ORD124",
      date: "2025-07-15",
      status: "Cancelled",
      items: [
        { id: "3", name: "Leather Wallet", quantity: 1, price: 2999 },
      ],
    },
  ],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // You can add 'reorder' logic later here
  },
});

export default orderSlice.reducer;
