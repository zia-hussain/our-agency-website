import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { Shield, Mail, Phone } from "lucide-react";
import { COMPANY } from "../config/constants.js";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Privacy Policy | Zumetrix Labs - Data Protection & Privacy"
        description="Learn how Zumetrix Labs protects your privacy and handles your personal data. Our comprehensive privacy policy explains our data collection, usage, and protection practices."
        keywords="privacy policy, data protection, Zumetrix Labs privacy, personal data, GDPR compliance"
        url="https://zumetrix.com/privacy-policy"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
            >
              <Shield size={16} className="mr-2" />
              Privacy & Data Protection
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Privacy
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: December 2024
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-lg prose-invert max-w-none
                           prose-headings:text-foreground prose-headings:font-bold
                           prose-p:text-muted-foreground prose-p:leading-relaxed
                           prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-foreground prose-strong:font-semibold
                           prose-ul:text-muted-foreground prose-li:text-muted-foreground">
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to {COMPANY.name}. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
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
              <p>We may automatically collect certain information about your device and usage patterns, including:</p>
              <ul>
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website and search terms used</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you relevant information about our services</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
              <ul>
                <li>With trusted service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>

              <h2>6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
              </p>

              <h2>7. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to certain processing activities</li>
              </ul>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information during such transfers.
              </p>

              <h2>10. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16.
              </p>

              <h2>11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2>12. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
              
              <div className="not-prose bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6 mt-8">
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