"use client";

import { useState, useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  // Example initial cart data, replace or fetch from context/api
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Product A", price: 25.99, quantity: 2 },
    { id: "2", name: "Product B", price: 15.5, quantity: 1 },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Remove item by id
  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Place order handler
  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // TODO: Add your order submission logic here (API call etc)
    alert(`Order placed! Total: $${totalPrice.toFixed(2)}`);
    // Clear cart after order
    setCartItems([]);
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map(({ id, name, price, quantity }) => (
            <li
              key={id}
              className="flex items-center justify-between border rounded p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-gray-600">
                  ${price.toFixed(2)} × {quantity} = $
                  {(price * quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(id)}
                className="text-red-600 hover:text-red-800 font-semibold"
                aria-label={`Remove ${name} from cart`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total and place order */}
      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={placeOrder}
          disabled={cartItems.length === 0}
          className={`bg-green-600 text-white px-6 py-2 rounded font-semibold transition ${
            cartItems.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-700"
          }`}
        >
          Place Order
        </button>
      </div>
    </main>
  );
}
