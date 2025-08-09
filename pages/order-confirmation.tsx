import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OrderConfirmation() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage after 10 seconds (optional)
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive a confirmation message shortly.
        </p>

        <button
          onClick={() => router.push("/dashboard/orders")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          View My Orders
        </button>

        <p className="mt-4 text-sm text-gray-400">
          You’ll be redirected to homepage in a few seconds...
        </p>
      </div>
    </div>
  );
}
