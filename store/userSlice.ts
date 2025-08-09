// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
}

export interface UserState {
  profile: UserProfile;
}

const initialState: UserState = {
  profile: {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "",
    address: "",
    photo: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
