"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  datePlaced: string; // ISO date string
  totalAmount: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulate fetching orders on mount
  useEffect(() => {
    // Replace with your API call, e.g. fetch('/api/orders')
    const fetchOrders = async () => {
      // Mock delay
      await new Promise((r) => setTimeout(r, 500));

      // Mock data
      setOrders([
        { id: "1", datePlaced: "2025-08-01T14:35:00Z", totalAmount: 55.49 },
        { id: "2", datePlaced: "2025-07-25T09:20:00Z", totalAmount: 120.0 },
        { id: "3", datePlaced: "2025-07-10T16:50:00Z", totalAmount: 39.99 },
      ]);
    };

    fetchOrders();
  }, []);

  // Format date nicely
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders placed yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(({ id, datePlaced, totalAmount }) => (
            <li
              key={id}
              className="flex justify-between items-center border rounded p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold">Order #{id}</p>
                <p className="text-gray-600">Placed on: {formatDate(datePlaced)}</p>
              </div>
              <p className="font-semibold">${totalAmount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
