// components/common/ProductCard.tsx
import { Product } from "@/store/productSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
        onError={(e) => {
          e.currentTarget.src = "/images/placeholder.png"; // fallback
        }}
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-green-600 font-bold mb-2">Ksh {product.price}</p>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
