import Container from "@/components/layout/Container";

export const metadata = {
  title: "Privacy Policy | Thirsty for Knowledge",
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-2xl py-12">
      <h1 className="font-serif text-2xl font-semibold text-text sm:text-3xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-text">
        <section>
          <h2 className="font-serif text-lg font-semibold text-text">
            Information We Collect
          </h2>
          <p className="mt-2 text-text-muted">
            When you sign in with Google or Facebook, we collect your name,
            email address, and profile picture. We use this information
            solely to create your account and personalize your experience on
            Thirsty for Knowledge.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-text">
            How We Use Your Information
          </h2>
          <p className="mt-2 text-text-muted">
            Your information is used to display your name and picture on
            comments and topic requests you submit, and to manage your
            account. We do not sell or share your personal information with
            third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-text">
            Data Deletion
          </h2>
          <p className="mt-2 text-text-muted">
            If you would like your account and associated data deleted,
            please contact us at{" "}
            
            <a  href="mailto:tawchif04@gmail.com"
              className="text-accent hover:underline"
            >
              tawchif04@gmail.com
            </a>{" "}
            and we will remove your data within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-text">
            Cookies
          </h2>
          <p className="mt-2 text-text-muted">
            We use cookies to keep you signed in and maintain your session
            securely.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-text">
            Contact
          </h2>
          <p className="mt-2 text-text-muted">
            If you have questions about this privacy policy, reach out at{" "}
            
            <a  href="mailto:tawchif04@gmail.com"
              className="text-accent hover:underline"
            >
              tawchif04@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}