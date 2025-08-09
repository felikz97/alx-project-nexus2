// pages/privacy.tsx
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - NexusStore</title>
      </Head>

      <main className="px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <p>
            At NexusStore, we value your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
          <ul className="list-disc list-inside">
            <li>Personal details such as name, email address, and phone number</li>
            <li>Payment information during checkout</li>
            <li>Device and browser data for analytics</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
          <ul className="list-disc list-inside">
            <li>To process your orders and deliver products</li>
            <li>To provide customer support and updates</li>
            <li>To analyze trends and improve our services</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. If you wish
            to exercise any of these rights, please contact us at support@nexusstore.co.ke.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data from unauthorized access,
            alteration, or disclosure.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">Policy Updates</h2>
          <p>
            We may update this policy occasionally. All changes will be posted on this page with a
            revised date.
          </p>

          <p>
            If you have any questions about our privacy practices, please contact us at
            <strong> support@nexusstore.co.ke</strong>.
          </p>
        </div>
      </main>
    </>
  );
}
