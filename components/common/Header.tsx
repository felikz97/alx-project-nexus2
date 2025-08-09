// components/common/Header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleCartClick = () => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push("/cart");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        My Store
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/about">About</Link>
        {!isLoggedIn ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        )}
        <button
          onClick={handleCartClick}
          className="bg-yellow-400 text-black px-3 py-1 rounded"
        >
          Cart
        </button>
      </nav>
    </header>
  );
}
