// components/product/ReviewList.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {
  productId: number;
}

export default function ReviewList({ productId }: Props) {
  const reviews = useSelector((state: RootState) =>
    state.review.reviews.filter((r) => r.productId === productId)
  );

  const average =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">
        Average Rating:{" "}
        <span className="text-yellow-500">
          {average.toFixed(1)} ⭐ ({reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"})
        </span>
      </h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-gray-100 p-3 rounded">
              <div className="flex justify-between">
                <span className="font-semibold">{r.user}</span>
                <span className="text-yellow-500">{r.rating} ⭐</span>
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
              <p className="text-xs text-gray-400">{new Date(r.date).toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
