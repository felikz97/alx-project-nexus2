// components/common/Navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage (simple auth check)
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleCartClick = () => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push("/cart");
    }
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold hover:text-green-300">
        NexusStore
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/about" className="hover:text-green-300">
          About
        </Link>

        {!isLoggedIn ? (
          <>
            <Link href="/login" className="hover:text-green-300">
              Login
            </Link>
            <Link href="/register" className="hover:text-green-300">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
          >
            Logout
          </button>
        )}

        <button
          onClick={handleCartClick}
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition"
        >
          Cart
        </button>
      </div>
    </nav>
  );
}
