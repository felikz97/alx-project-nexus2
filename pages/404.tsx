// pages/404.tsx
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        ⬅ Go back to Home
      </Link>
    </div>
  );
}
