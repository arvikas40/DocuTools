import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

          <p className="mb-4 text-lg text-muted-foreground">
            At <strong>DocuTools</strong>, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We do not require any personal information to use our tools. However, if you contact us via email or forms, we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>Name and contact details you provide voluntarily</li>
              <li>Information about the files you upload (file types and sizes)</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              Any information collected is used only to provide and improve our services, respond to inquiries, and ensure a secure experience.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. Cookies & Tracking</h2>
            <p className="text-muted-foreground">
              DocuTools does not use cookies to track your personal activity. Minimal analytics may be collected through third-party services to monitor website performance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. File Privacy</h2>
            <p className="text-muted-foreground">
              All files you upload are processed temporarily and not stored permanently on our servers. We recommend that you download processed files immediately. We are committed to ensuring your uploaded documents remain private and secure.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We may use third-party services for analytics, hosting, or other services. These providers are bound by privacy agreements, and we do not share personally identifiable information without your consent.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: <a href="mailto:support@docutools.netlify.app" className="text-primary underline">support@docutools.netlify.app</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
