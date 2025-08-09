import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
      router.push("/"); // Redirect after login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Login to NexusStore</h2>

        <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
        <input
          id="username"
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring focus:border-green-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
