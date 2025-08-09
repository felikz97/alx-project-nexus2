// pages/product/[id].tsx
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addToCart } from "@/store/cartSlice";
import Navbar from "@/components/common/Navbar";
import Link from "next/link";
import ReviewForm from "@/components/product/ReviewForm";
import ReviewList from "@/components/product/ReviewList";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);

  // Try from Redux first
  const reduxProduct = useSelector((state: RootState) =>
    state.product.products.find((p) => p.id === Number(id))
  ) as Product | undefined;

  // If not in Redux, fetch from API
  useEffect(() => {
    if (!id || reduxProduct) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Product = await res.json();
        setFetchedProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, reduxProduct]);

  const product = reduxProduct || fetchedProduct;

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <div className="p-6 text-center">Loading product details...</div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Product not found.</h2>
        <Link href="/" className="text-blue-600 underline">
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${process.env.NEXT_PUBLIC_API_URL}${product.image}`
    : "/images/placeholder.png";

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 underline mb-6 inline-block">
          ← Back to Catalog
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-1/2 h-64">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">
              {typeof product.category === "string"
                ? product.category
                : product.category?.name || "Uncategorized"}
            </p>
            <p className="text-green-600 text-xl font-semibold mb-3">
              Ksh {Number(product.price).toFixed(2)}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description || "No description provided."}
            </p>

            {/* Extra attributes */}
            {product.colors?.length > 0 && (
              <p className="text-sm text-gray-600">Colors: {product.colors.join(", ")}</p>
            )}
            {product.sizes?.length > 0 && (
              <p className="text-sm text-gray-600">Sizes: {product.sizes.join(", ")}</p>
            )}
            {product.shoe_sizes?.length > 0 && (
              <p className="text-sm text-gray-600">
                Shoe Sizes: {product.shoe_sizes.join(", ")}
              </p>
            )}

            <button
              onClick={handleAddToCart}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <ReviewList productId={product.id} />
          <ReviewForm productId={product.id} />
        </div>
      </div>
    </>
  );
}
