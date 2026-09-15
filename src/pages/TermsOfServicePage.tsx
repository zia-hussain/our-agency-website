import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import LegalTOC from "../components/common/LegalTOC";
import { FileText, Mail, Phone } from "lucide-react";
import { COMPANY } from "../config/constants.js";

const TOC_ITEMS = [
  { id: "acceptance-of-terms", label: "1. Acceptance of Terms" },
  { id: "description-of-service", label: "2. Description of Service" },
  { id: "service-agreement", label: "3. Service Agreement" },
  { id: "client-responsibilities", label: "4. Client Responsibilities" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "confidentiality", label: "6. Confidentiality" },
  { id: "warranties-and-disclaimers", label: "7. Warranties and Disclaimers" },
  { id: "limitation-of-liability", label: "8. Limitation of Liability" },
  { id: "support-and-maintenance", label: "9. Support and Maintenance" },
  { id: "termination", label: "10. Termination" },
  { id: "force-majeure", label: "11. Force Majeure" },
  { id: "governing-law", label: "12. Governing Law" },
  { id: "modifications", label: "13. Modifications" },
  { id: "contact-information", label: "14. Contact Information" },
];

const TermsOfServicePage: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Terms of Service | Zumetrix Labs"
        description="Read Zumetrix Labs' terms of service and service agreement. Understand our policies, responsibilities, and terms for using our software development services."
        keywords="terms of service, service agreement, Zumetrix Labs terms, software development terms, legal terms"
        url="https://zumetrix.com/terms-of-service"
      />

      {/* Hero Section — same hero language as the rest of the site, kept   */}
      {/* deliberately restrained here: a legal page earns trust through    */}
      {/* clarity, not spectacle. */}
      <section className="pt-40 pb-20 bg-background relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(196,138,100,0.08),transparent_38%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection mode="hero" className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-primary mb-8">
              <FileText size={16} />
              Legal Terms & Conditions
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">Terms of</span>
              <span className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: December 2024
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Terms of Service Content — same prose system as the Articles      */}
      {/* detail page (border-top dividers between h2s, scroll-mt for the   */}
      {/* anchor jumps below) instead of the thinner default prose.         */}
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
              <h2 id="acceptance-of-terms">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the services provided by {COMPANY.name},
                you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>

              <h2 id="description-of-service">2. Description of Service</h2>
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

              <h2 id="service-agreement">3. Service Agreement</h2>
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

              <h2 id="client-responsibilities">4. Client Responsibilities</h2>
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

              <h2 id="intellectual-property">5. Intellectual Property</h2>
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

              <h2 id="confidentiality">6. Confidentiality</h2>
              <p>
                {COMPANY.name} agrees to maintain the confidentiality of all
                client information and will not disclose any confidential
                information to third parties without prior written consent.
              </p>

              <h2 id="warranties-and-disclaimers">7. Warranties and Disclaimers</h2>
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

              <h2 id="limitation-of-liability">8. Limitation of Liability</h2>
              <p>
                {COMPANY.name}'s liability for any claim related to our services
                shall not exceed the total amount paid by the client for the
                specific project in question.
              </p>

              <h2 id="support-and-maintenance">9. Support and Maintenance</h2>
              <p>
                Post-launch support and maintenance services are available
                separately and will be outlined in a separate agreement if
                requested.
              </p>

              <h2 id="termination">10. Termination</h2>
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

              <h2 id="force-majeure">11. Force Majeure</h2>
              <p>
                {COMPANY.name} shall not be liable for any delay or failure to
                perform due to circumstances beyond our reasonable control,
                including but not limited to natural disasters, government
                actions, or technical failures.
              </p>

              <h2 id="governing-law">12. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of Pakistan, without regard to conflict of law
                principles.
              </p>

              <h2 id="modifications">13. Modifications</h2>
              <p>
                {COMPANY.name} reserves the right to modify these terms at any
                time. Clients will be notified of any material changes, and
                continued use of our services constitutes acceptance of the
                modified terms.
              </p>

              <h2 id="contact-information">14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us:
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

export default TermsOfServicePage;
