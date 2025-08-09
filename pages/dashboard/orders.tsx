// pages/dashboard/orders.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/router";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type Order = {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
};

export default function OrdersPage() {
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const rawOrders = useSelector((state: RootState) => state.order.orders);

  const orders: Order[] = rawOrders.map((order: any) => ({
    ...order,
    totalAmount:
      order.totalAmount !== undefined
        ? order.totalAmount
        : order.items.reduce(
            (sum: number, item: any) => sum + (item.price * item.quantity),
            0
          ),
  }));

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                </div>
                <div className="text-right font-semibold text-green-600">
                  Ksh {order.totalAmount.toFixed(2)}
                </div>
              </div>

              <div className="divide-y">
                {order.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex items-center py-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover mr-4 rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} x Ksh {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right mt-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
