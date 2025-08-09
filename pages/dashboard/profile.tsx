// pages/dashboard/profile.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { updateProfile } from "@/store/userSlice"; // ✅ Ensure this action exists

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.profile);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    address: user?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    alert("Profile updated ✅");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">👤 Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="text"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="email"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="tel"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Profile Photo URL</label>
          <input
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="text"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Saved Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="text"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
