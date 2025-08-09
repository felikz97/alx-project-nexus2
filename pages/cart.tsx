import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  removeFromCart,
  updateQuantity,
} from "@/store/cartSlice";
import { useRouter } from "next/router";
import { CartItem } from "@/types/CartItem";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-gray-500 text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push("/")}
            className="text-green-600 underline"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-2/3">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-green-600 font-semibold">
                    Ksh {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold mb-4">
              Total: Ksh {totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
