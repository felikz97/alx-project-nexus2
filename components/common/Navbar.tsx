// components/common/Navbar.tsx
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";

export default function Navbar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-green-600">
        NexusStore
      </Link>

      <nav className="flex items-center gap-6 text-gray-700 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>

        {isAuthenticated ? (
          <>
            <span className="text-gray-600">Hi, {username}</span>
            <button
              onClick={() => dispatch(logout())}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
