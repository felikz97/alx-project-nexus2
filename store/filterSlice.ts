import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  searchTerm: string;
}

const initialState: FilterState = {
  category: "All",
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategoryFilter, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
