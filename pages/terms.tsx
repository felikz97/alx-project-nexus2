// pages/terms.tsx
import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - NexusStore</title>
      </Head>

      <main className="px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Terms of Service</h1>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <p>
            These Terms of Service ("Terms") govern your use of the NexusStore website and services.
            By accessing or using our platform, you agree to these Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">1. Use of the Site</h2>
          <p>
            You agree to use the site lawfully and only for personal, non-commercial purposes. Any
            misuse or violation of laws will lead to suspension of access.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password.
            You agree to notify us of any unauthorized use of your account.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">3. Orders & Payments</h2>
          <p>
            All orders are subject to availability and confirmation of payment. We reserve the right
            to refuse or cancel any order.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">4. Returns & Refunds</h2>
          <p>
            Please refer to our Returns Policy for detailed information on returns, exchanges, and
            refunds.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">5. Intellectual Property</h2>
          <p>
            All content, trademarks, and designs on NexusStore are owned by or licensed to us.
            Unauthorized use is strictly prohibited.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Updated terms will be posted on
            this page.
          </p>

          <p>
            If you have questions about our Terms, contact us at
            <strong> support@nexusstore.co.ke</strong>.
          </p>
        </div>
      </main>
    </>
  );
}
