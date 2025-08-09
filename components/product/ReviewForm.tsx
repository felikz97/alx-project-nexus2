// components/product/ReviewForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/router";

interface ReviewFormProps {
  productId: number;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: productId,
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setSuccess(true);
      setRating(5);
      setComment("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">Review submitted successfully!</p>}

      <label className="block mb-2 font-medium" htmlFor="rating">
        Rating:
      </label>
      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
      >
        {[5, 4, 3, 2, 1].map((rate) => (
          <option key={rate} value={rate}>
            {rate} Star{rate > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium" htmlFor="comment">
        Comment:
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        required
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        placeholder="Write your review here..."
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
