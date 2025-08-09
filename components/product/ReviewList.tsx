"use client";

import { useEffect, useState } from "react";

interface Review {
  id: number;
  user: {
    username: string;
  };
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewListProps {
  productId: number;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    async function fetchReviews() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/?product=${productId}`
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (reviews.length === 0) return <p>No reviews yet. Be the first to review!</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{review.user.username}</p>
            <p className="text-yellow-500 font-bold">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>
          </div>
          <p className="text-gray-700 mb-2">{review.comment}</p>
          <p className="text-xs text-gray-400">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
