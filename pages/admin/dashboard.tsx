import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AdminDashboard() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  );

  if (!isAuthenticated) {
    return <p className="p-6 text-center">Unauthorized - Please log in</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Other content */}
    </div>
  );
}
