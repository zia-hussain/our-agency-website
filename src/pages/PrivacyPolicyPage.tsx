import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import LegalTOC from "../components/common/LegalTOC";
import { Shield, Mail, Phone } from "lucide-react";
import { COMPANY } from "../config/constants.js";

const TOC_ITEMS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use-your-information", label: "3. How We Use Your Information" },
  { id: "information-sharing-and-disclosure", label: "4. Information Sharing and Disclosure" },
  { id: "data-security", label: "5. Data Security" },
  { id: "cookies-and-tracking-technologies", label: "6. Cookies and Tracking Technologies" },
  { id: "email-preferences-and-consent", label: "7. Email Preferences and Consent" },
  { id: "service-providers", label: "8. Service Providers" },
  { id: "your-rights-and-choices", label: "9. Your Rights and Choices" },
  { id: "data-retention", label: "10. Data Retention" },
  { id: "international-data-transfers", label: "11. International Data Transfers" },
  { id: "childrens-privacy", label: "12. Children's Privacy" },
  { id: "changes-to-this-privacy-policy", label: "13. Changes to This Privacy Policy" },
  { id: "contact-us", label: "14. Contact Us" },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Privacy Policy | Zumetrix Labs - Data Protection & Privacy"
        description="Learn how Zumetrix Labs collects, uses, stores, and protects personal data submitted through our website, forms, and email services."
        keywords="privacy policy, data protection, Zumetrix Labs privacy, personal data, GDPR compliance"
        url="https://zumetrix.com/privacy-policy"
      />

      {/* Hero Section — same hero language as the rest of the site, kept   */}
      {/* deliberately restrained here: a legal page earns trust through    */}
      {/* clarity, not spectacle. */}
      <section className="pt-40 pb-20 bg-background relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(196,138,100,0.08),transparent_38%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection mode="hero" className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-primary mb-8">
              <Shield size={16} />
              Privacy & Data Protection
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">Privacy</span>
              <span className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: June 19, 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Privacy Policy Content — same prose system as the Articles detail */}
      {/* page (border-top dividers between h2s, scroll-mt for the anchor   */}
      {/* jumps below) instead of the thinner default prose treatment.      */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <LegalTOC items={TOC_ITEMS} />

            <div
              className="prose prose-lg prose-invert max-w-none
                           prose-headings:scroll-mt-28 prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                           prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-t prose-h2:border-border/70 prose-h2:pt-10 prose-h2:text-2xl md:prose-h2:text-3xl
                           prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
                           prose-p:text-muted-foreground prose-p:leading-[1.9]
                           prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-foreground prose-strong:font-semibold
                           prose-ul:text-muted-foreground prose-li:my-1.5 prose-li:leading-[1.8] marker:prose-li:text-primary/70
                           [&>h2:first-of-type]:mt-0 [&>h2:first-of-type]:border-t-0 [&>h2:first-of-type]:pt-0"
            >
              <h2 id="introduction">1. Introduction</h2>
              <p>
                Welcome to {COMPANY.name}. We are committed to protecting your
                privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our
                services.
              </p>

              <h2 id="information-we-collect">2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul>
                <li>Contact us through our website forms</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a consultation or quote</li>
                <li>Engage our services</li>
              </ul>

              <p>This information may include:</p>
              <ul>
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Company name and job title</li>
                <li>Project requirements and specifications</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                We may automatically collect certain information about your
                device and usage patterns, including:
              </p>
              <ul>
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website and search terms used</li>
              </ul>

              <h2 id="how-we-use-your-information">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>
                  Send marketing emails only when you have explicitly opted in
                </li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 id="information-sharing-and-disclosure">4. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except in the
                following circumstances:
              </p>
              <ul>
                <li>
                  With trusted service providers who assist us in operating our
                  website and conducting our business
                </li>
                <li>
                  When required by law or to protect our rights and safety
                </li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>

              <h2 id="data-security">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet is 100%
                secure.
              </p>

              <h2 id="cookies-and-tracking-technologies">6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze website traffic, and understand
                user preferences. You can control cookie settings through your
                browser preferences.
              </p>

              <h2 id="email-preferences-and-consent">7. Email Preferences and Consent</h2>
              <p>
                Project inquiries, requested downloads, and calculator reports
                may trigger transactional emails needed to fulfill your
                request. Marketing emails are separate and are sent only when
                you actively opt in. Every marketing email includes an
                unsubscribe link, and an unsubscribe request is recorded in our
                suppression system so future campaigns do not contact that
                address.
              </p>

              <h2 id="service-providers">8. Service Providers</h2>
              <p>
                We use carefully selected providers to operate the website and
                respond to requests, including Supabase for secure data storage,
                Airtable for internal lead operations, Resend for email
                delivery, Vercel for website hosting, and Google Analytics for
                aggregated website measurement.
              </p>

              <h2 id="your-rights-and-choices">9. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to certain processing activities</li>
              </ul>

              <h2 id="data-retention">10. Data Retention</h2>
              <p>
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required by law.
              </p>

              <h2 id="international-data-transfers">11. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your personal information during such
                transfers.
              </p>

              <h2 id="childrens-privacy">12. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of
                16. We do not knowingly collect personal information from
                children under 16.
              </p>

              <h2 id="changes-to-this-privacy-policy">13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the "Last updated" date.
              </p>

              <h2 id="contact-us">14. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>

              <div className="not-prose rounded-xl border border-border/60 bg-card/20 p-6 mt-8 shadow-[0_25px_50px_-28px_rgba(0,0,0,0.55)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-primary" />
                    <span className="text-foreground">{COMPANY.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-primary" />
                    <span className="text-foreground">{COMPANY.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default PrivacyPolicyPage;
