// pages/about.tsx
import Layout from "@/components/common/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4 text-gray-700">
          Welcome to our shop! We offer a variety of products, hand-picked to
          ensure quality and affordability. Our mission is to bring you the best
          online shopping experience possible.
        </p>
        <p className="text-gray-700">
          This e-commerce platform is built with Next.js (frontend) and Django
          REST Framework (backend). We use Redux for state management to make
          your experience fast and smooth.
        </p>
      </div>
    </Layout>
  );
}
