// store/adminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isAuthenticated: boolean;
}

const initialState: AdminState = {
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAdminAuthenticated } = adminSlice.actions;
export default adminSlice.reducer;
