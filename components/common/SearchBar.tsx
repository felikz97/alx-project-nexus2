// components/common/SearchBar.tsx
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchTerm } from "@/store/filterSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search products..."
        className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
}
