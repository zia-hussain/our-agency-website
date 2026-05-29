import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { FileText, Mail, Phone } from "lucide-react";
import { COMPANY } from "../config/constants.js";

const TermsOfServicePage: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Terms of Service | Zumetrix Labs - Service Agreement & Terms"
        description="Read Zumetrix Labs' terms of service and service agreement. Understand our policies, responsibilities, and terms for using our software development services."
        keywords="terms of service, service agreement, Zumetrix Labs terms, software development terms, legal terms"
        url="https://zumetrix.com/terms-of-service"
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
              <FileText size={16} className="mr-2" />
              Legal Terms & Conditions
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Terms of
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: December 2024
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div
              className="prose prose-lg prose-invert max-w-none
                           prose-headings:text-foreground prose-headings:font-bold
                           prose-p:text-muted-foreground prose-p:leading-relaxed
                           prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-foreground prose-strong:font-semibold
                           prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            >
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the services provided by {COMPANY.name},
                you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                {COMPANY.name} provides software development services including
                but not limited to:
              </p>
              <ul>
                <li>Web application development</li>
                <li>Mobile application development</li>
                <li>SaaS MVP development</li>
                <li>AI automation services</li>
                <li>Custom software solutions</li>
                <li>Digital strategy consulting</li>
              </ul>

              <h2>3. Service Agreement</h2>
              <h3>Project Scope</h3>
              <p>
                All projects will be clearly defined in a separate project
                agreement or statement of work (SOW) that outlines:
              </p>
              <ul>
                <li>Project deliverables and timeline</li>
                <li>Payment terms and schedule</li>
                <li>Technical specifications</li>
                <li>Revision and approval process</li>
              </ul>

              <h3>Payment Terms</h3>
              <p>
                Payment terms will be specified in the project agreement.
                Generally:
              </p>
              <ul>
                <li>A deposit may be required before work begins</li>
                <li>Payments are due according to the agreed schedule</li>
                <li>Late payments may incur additional fees</li>
                <li>All prices are in USD unless otherwise specified</li>
              </ul>

              <h2>4. Client Responsibilities</h2>
              <p>The client agrees to:</p>
              <ul>
                <li>
                  Provide necessary information and materials in a timely manner
                </li>
                <li>
                  Respond to requests for feedback within agreed timeframes
                </li>
                <li>Make payments according to the agreed schedule</li>
                <li>Provide accurate and complete project requirements</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <h3>Client-Owned Content</h3>
              <p>
                The client retains ownership of all content, data, and materials
                provided to {COMPANY.name} for the project.
              </p>

              <h3>Developed Solutions</h3>
              <p>
                Upon full payment, the client will own the custom code and
                solutions developed specifically for their project.{" "}
                {COMPANY.name} retains the right to use general methodologies,
                techniques, and knowledge gained during the project.
              </p>

              <h3>Third-Party Components</h3>
              <p>
                Projects may include third-party libraries, frameworks, or
                services that are subject to their own licensing terms.
              </p>

              <h2>6. Confidentiality</h2>
              <p>
                {COMPANY.name} agrees to maintain the confidentiality of all
                client information and will not disclose any confidential
                information to third parties without prior written consent.
              </p>

              <h2>7. Warranties and Disclaimers</h2>
              <p>
                {COMPANY.name} warrants that services will be performed in a
                professional manner. However, we make no warranties regarding:
              </p>
              <ul>
                <li>Compatibility with all systems or browsers</li>
                <li>Uninterrupted or error-free operation</li>
                <li>
                  Meeting specific performance criteria unless explicitly agreed
                </li>
              </ul>

              <h2>8. Limitation of Liability</h2>
              <p>
                {COMPANY.name}'s liability for any claim related to our services
                shall not exceed the total amount paid by the client for the
                specific project in question.
              </p>

              <h2>9. Support and Maintenance</h2>
              <p>
                Post-launch support and maintenance services are available
                separately and will be outlined in a separate agreement if
                requested.
              </p>

              <h2>10. Termination</h2>
              <p>
                Either party may terminate the service agreement with written
                notice. In case of termination:
              </p>
              <ul>
                <li>
                  The client is responsible for payment of all work completed
                </li>
                <li>
                  All work products will be delivered in their current state
                </li>
                <li>Confidentiality obligations will survive termination</li>
              </ul>

              <h2>11. Force Majeure</h2>
              <p>
                {COMPANY.name} shall not be liable for any delay or failure to
                perform due to circumstances beyond our reasonable control,
                including but not limited to natural disasters, government
                actions, or technical failures.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of Pakistan, without regard to conflict of law
                principles.
              </p>

              <h2>13. Modifications</h2>
              <p>
                {COMPANY.name} reserves the right to modify these terms at any
                time. Clients will be notified of any material changes, and
                continued use of our services constitutes acceptance of the
                modified terms.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us:
              </p>

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

export default TermsOfServicePage;
