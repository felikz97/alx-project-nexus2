import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import FilterPanel from "@/components/common/FilterPanel";
import SortDropdown from "@/components/common/SortDropdown";
import TrendingProducts from "@/components/home/TrendingProducts";
import SearchBar from "@/components/common/SearchBar";

export default function Home() {
  const router = useRouter();
  const { category: queryCategory } = router.query;

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const products = useSelector((state: RootState) => state.product.products);
  const selectedCategory = useSelector((state: RootState) => state.filter.category);
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        queryCategory && queryCategory !== "All"
          ? product.category === queryCategory
          : selectedCategory === "All"
          ? true
          : product.category === selectedCategory;

      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <>
      {/* ✅ Hero Section */}
      <div className="relative bg-green-100 text-gray-800 px-6 py-16 text-center rounded-lg shadow mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to NexusStore</h1>
        <p className="text-lg sm:text-xl mb-6">
          Your one-stop shop for electronics, fashion, and accessories.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>

      {/* 🏷️ Featured Categories */}
      <div className="px-6 mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Electronics", image: "/icons/electronics.png" },
            { name: "Wearables", image: "/icons/wearables.png" },
            { name: "Accessories", image: "/icons/accessories.png" },
          ].map((category) => (
            <div
              key={category.name}
              onClick={() => router.push(`/?category=${category.name}`)}
              className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-lg text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="mx-auto mb-3 w-16 h-16 object-contain"
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Trending Products */}
      <div className="px-6 mb-12">
        <TrendingProducts />
      </div>

      {/* 🛍️ Product Catalog */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Product Catalog</h2>
          <SortDropdown sortOrder={sortOrder} onChange={setSortOrder} />
        </div>

        {/* 🔍 Search + Category Filter */}
        <SearchBar />
        <FilterPanel />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
