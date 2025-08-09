import Head from "next/head";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Head>
        <title>Contact Us - NexusStore</title>
      </Head>

      <main className="px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-600">Contact Us</h1>

        {submitted && (
          <div className="bg-green-100 text-green-700 p-4 mb-6 rounded border border-green-400">
            Thank you! Your message has been received.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Send Message
            </button>
          </form>

          <div className="bg-gray-100 p-6 rounded-lg shadow space-y-4 text-sm">
            <h2 className="text-lg font-semibold mb-2">Reach Us</h2>
            <p>
              📍 <strong>Address:</strong> Nairobi, Kenya<br />
              📧 <strong>Email:</strong> support@nexusstore.co.ke<br />
              📞 <strong>Phone:</strong> +254 700 000 000
            </p>
            <p>
              Our support team is available Monday - Friday, 9AM - 5PM EAT. We aim to respond within 24 hours.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
