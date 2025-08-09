import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    method: "Standard",
    payment: "M-PESA",
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // You can dispatch an order here or save to backend
    console.log("Order placed!", shippingInfo);
    router.push("/dashboard/orders"); // Navigate to order history
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 🧍 Shipping Info */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 mb-3 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 mb-3 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 mb-3 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleChange}
            className="w-full border px-4 py-2 mb-3 rounded"
          />

          {/* 🚚 Shipping Method */}
          <label className="block mb-1">Shipping Method</label>
          <select
            name="method"
            value={shippingInfo.method}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded mb-3"
          >
            <option value="Standard">Standard (3–5 days)</option>
            <option value="Express">Express (1–2 days)</option>
          </select>

          {/* 💳 Payment */}
          <label className="block mb-1">Payment Method</label>
          <select
            name="payment"
            value={shippingInfo.payment}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="M-PESA">M-PESA</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash">Cash on Delivery</option>
          </select>
        </div>

        {/* 🧾 Order Summary */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Ksh {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Ksh {total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
