import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addToCart } from "@/store/cartSlice";
import Navbar from "@/components/common/Navbar";
import Link from "next/link";
import ReviewForm from "@/components/product/ReviewForm";
import ReviewList from "@/components/product/ReviewList";
import { Product } from "@/types/Product";

export default function ProductDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const product = useSelector((state: RootState) =>
    state.product.products.find((p) => p.id === Number(id))
  ) as Product | undefined;

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

  const handleAddToCart = () => {
    if (!product) return;
    // Ensure image is always a string
    const safeProduct = { ...product, image: product.image ?? "" };
    dispatch(addToCart(safeProduct));
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 underline mb-6 inline-block">
          ← Back to Catalog
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-green-600 text-xl font-semibold mb-3">
              Ksh {product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description || "No description provided."}
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* ⭐ Review Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <ReviewList productId={product.id} />
          <ReviewForm productId={product.id} />
        </div>
      </div>
    </>
  );
}
