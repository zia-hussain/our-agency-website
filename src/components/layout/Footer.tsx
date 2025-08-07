import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Contact", path: "/contact" },
    ],
    services: [
      { name: "Web Applications", path: "/services#web-apps" },
      { name: "SaaS Dashboards", path: "/services#saas-dashboards" },
      { name: "Mobile Apps", path: "/services#mobile-apps" },
      { name: "MVP Development", path: "/services#mvp" },
      { name: "Automation Solutions", path: "/services#automation" },
      { name: "Digital Strategy", path: "/services#digital-strategy" },
    ],
    contact: [
      {
        icon: Mail,
        text: "hello@zumetrix.com",
        href: "mailto:hello@zumetrix.com",
      },
      { icon: Phone, text: "+92 XXX XXXXXXX", href: "tel:+92XXXXXXXXX" },
      { icon: MapPin, text: "Pakistan", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/zumetrix-labs", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/zumetrix-labs",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "https://www.instagram.com/zumetrixlabs",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block mb-4">
              <motion.div
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <span className="text-2xl font-bold tracking-tight hover:text-primary transition-colors duration-200 text-foreground ">
                  <img
                    className="h-8"
                    src="/Zumetrix_Labs_Logo (5).png"
                    alt="Zumetrix Labs"
                  />
                </span>
              </motion.div>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Pakistan's #1 software development agency founded by expert
              developers Zia Hussain and Syed Omer Shah. We specialize in SaaS
              MVP development, React/Node.js applications, mobile app
              development, AI automation services, Firebase integration, and
              custom software solutions. Serving clients in Karachi, Lahore,
              Islamabad, and worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-card/50 backdrop-blur-xl border border-transparent hover:border-border"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-150 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-150 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-150 text-sm flex items-center gap-2"
                  >
                    <contact.icon size={16} />
                    {contact.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-border mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} Zumetrix Labs. All rights reserved. Crafted with
              ❤️ by founders
              <strong> Zia Hussain</strong> and <strong>Syed Omer Shah</strong>.
              Pakistan's #1 software development agency serving Karachi, Lahore,
              Islamabad, and clients worldwide.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
