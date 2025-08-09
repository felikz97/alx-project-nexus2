// components/product/ReviewForm.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "@/store/reviewSlice";

interface Props {
  productId: number;
}

export default function ReviewForm({ productId }: Props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return;

    dispatch(
      addReview({
        productId,
        user,
        rating,
        comment,
      })
    );

    setUser("");
    setRating(5);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mt-6 space-y-4"
    >
      <h3 className="text-lg font-semibold">Leave a Review</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border px-3 py-2 rounded"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Star{star !== 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
      >
        Submit Review
      </button>
    </form>
  );
}
