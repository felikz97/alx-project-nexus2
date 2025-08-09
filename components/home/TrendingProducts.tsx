import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductCard from "@/components/common/ProductCard";

export default function TrendingProducts() {
  const products = useSelector((state: RootState) => state.product.products);
  const trending = products.slice(0, 2); // 👈 Only show 2 products max

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
