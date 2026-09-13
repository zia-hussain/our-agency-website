import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../../config/site";
import { BRAND_CONTENT } from "../../config/content";
import { COMPANY, SOCIAL_LINKS } from "../../config/constants.js";

// One object, not two: the closing statement and the credits share a
// single card, separated only by hairlines — the same discipline as the
// rest of the site's chapter dividers, not a second floating shell. The
// wordmark stays last, quiet and cropped, texture rather than statement.
const LINK_GROUPS = [
  {
    label: "Services",
    links: [
      { name: "SaaS Product Development", path: "/services/saas-mvp-development" },
      { name: "Product Rescue & Stabilization", path: "/services/product-rescue-stabilization" },
      { name: "Web Application Development", path: "/services/web-application-development" },
      { name: "Mobile App Development", path: "/services/mobile-app-development" },
      { name: "AI Automation & Workflows", path: "/services/ai-automation-solutions" },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "About", path: "/about" },
      { name: "Zia Hussain", path: "/founders/zia-hussain" },
      { name: "Omer Gillani", path: "/founders/omer-gillani" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    label: "Work",
    links: [
      { name: "Case Studies", path: "/portfolio" },
      { name: "Client Stories", path: "/client-stories" },
      { name: "Articles", path: "/articles" },
    ],
  },
];

const SOCIAL = [
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background pt-12 sm:pt-16 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-card border border-white/[0.05] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(196,138,100,0.07),transparent_60%)]" />

          {/* Closing statement */}
          <div className="relative px-6 pt-12 pb-10 sm:px-12 sm:pt-16 sm:pb-12 text-center">
            <h2 className="max-w-xl mx-auto font-bold tracking-[-0.02em] leading-[1.15] text-foreground text-2xl sm:text-4xl lg:text-[2.75rem]">
              {SITE_CONFIG.company.tagline}
            </h2>
            <a
              href={SITE_CONFIG.contact.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen group inline-flex items-center gap-2.5 mt-7 rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-6 pr-5 py-3.5 font-semibold text-sm"
            >
              Book a Strategy Call
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </span>
            </a>
          </div>

          <div className="relative h-px bg-white/[0.06]" />

          {/* Credits */}
          <div className="relative px-6 py-10 sm:px-12 sm:py-12">
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-8">
              <div>
                <Link to="/" className="inline-flex items-center mb-4">
                  <img
                    className="h-7 w-auto select-none"
                    src="/logo/zumetrix-email.webp"
                    alt="Zumetrix Labs"
                    width="288"
                    height="70"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
                  {BRAND_CONTENT.footer.description}
                </p>
                <div className="flex items-center gap-1">
                  {SOCIAL.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="btn-sheen flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground/60 hover:text-primary transition-colors duration-150"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
                {LINK_GROUPS.map((group) => (
                  <div key={group.label} className={group.label === "Services" ? "col-span-2 sm:col-span-2" : ""}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45 mb-3">
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            className="text-[13px] text-foreground/70 hover:text-primary transition-colors duration-150"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45 mb-3">
                    Legal
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/privacy-policy" className="text-[13px] text-foreground/70 hover:text-primary transition-colors duration-150">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms-of-service" className="text-[13px] text-foreground/70 hover:text-primary transition-colors duration-150">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <a href={`mailto:${COMPANY.email}`} className="text-[13px] text-foreground/70 hover:text-primary transition-colors duration-150">
                        {COMPANY.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-px bg-white/[0.06]" />

          {/* Bottom line */}
          <div className="relative px-6 py-5 sm:px-12">
            <p className="text-xs text-muted-foreground/50 text-center sm:text-left">
              &copy; {currentYear} {SITE_CONFIG.company.name}. All rights reserved. {BRAND_CONTENT.footer.copyright}.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quiet background bleed — texture, not statement */}
      <div className="relative mt-6 sm:mt-8 h-[6rem] sm:h-[8rem] lg:h-[10rem] overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <p
          className="absolute left-1/2 -translate-x-1/2 top-0 font-bold uppercase leading-[0.85] tracking-tight text-foreground/[0.045] whitespace-nowrap"
          style={{ fontSize: "clamp(4.5rem, 12.5vw, 8.5rem)" }}
        >
          Zumetrix
        </p>
      </div>
    </footer>
  );
};

export default Footer;
