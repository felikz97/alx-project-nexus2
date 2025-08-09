"use client";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">Product not found!</h2>
        <Link href="/" className="text-blue-600 underline mt-4 block">
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded shadow-md p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={300}
          className="rounded object-cover mx-auto"
        />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 text-lg mt-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>

        <Link href="/" className="inline-block mt-6 text-blue-500 hover:underline">
          ← Back to Product Catalog
        </Link>
      </div>
    </div>
  );
}
