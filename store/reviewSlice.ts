import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Review {
  id: string;
  productId: number;
  user: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Omit<Review, "id" | "date">>) => {
      const newReview = {
        id: uuid(),
        date: new Date().toISOString(),
        ...action.payload,
      };
      state.reviews.push(newReview);
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
