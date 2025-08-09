// pages/dashboard/wishlist.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { useRouter } from "next/router";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">❤️ Your Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">No items in your wishlist.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow bg-white text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-600">Ksh {item.price.toFixed(2)}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
