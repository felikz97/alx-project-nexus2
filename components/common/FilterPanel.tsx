import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCategoryFilter } from "@/store/filterSlice";

const categories = ["All", "Electronics", "Wearables", "Accessories"];

export default function FilterPanel() {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.filter.category);

  const handleClick = (category: string) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition 
            ${selected === cat 
              ? "bg-green-500 text-white border-green-600" 
              : "bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-600"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
