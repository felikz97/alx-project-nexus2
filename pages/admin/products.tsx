// pages/admin/products.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { deleteProduct } from "@/store/productSlice";
import Link from "next/link";

export default function AdminProducts() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const products = useSelector((state: RootState) => state.product.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));

    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠️ Manage Products</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-1/2"
        />
        <Link href="/admin/products/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            ➕ Add Product
          </button>
        </Link>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product: Product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-14 h-14 object-cover" />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">Ksh {product.price.toFixed(2)}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3 space-x-3">
                <Link href={`/admin/products/edit/${product.id}`}>
                  <button className="text-blue-600 hover:underline">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
