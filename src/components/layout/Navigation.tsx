import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { services, rescueService } from "../../data/services";
import { articles } from "../../data/articles.js";

const FEATURED_ARTICLES = articles.filter((a) => a.featured);

// One resolved object, not a UI panel: a solid, heavy instrument sitting
// above the page, not a translucent bar blending into it. The glossy
// top-edge highlight and deep contact shadow are what read as material —
// without them this is just another flat rounded div.
const NAV_ITEMS = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Articles", path: "/articles" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SHELL_SHADOW_WIDE =
  "inset 0 1px 0 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.04), 0 40px 90px -30px rgba(0,0,0,0.8), 0 14px 32px -14px rgba(0,0,0,0.55)";
const SHELL_SHADOW_DOCKED =
  "inset 0 1px 0 0 rgba(255,255,255,0.16), inset 0 0 0 1px rgba(255,255,255,0.07), 0 34px 70px -22px rgba(0,0,0,0.9), 0 12px 28px -10px rgba(0,0,0,0.7)";

const Navigation: React.FC = () => {
  const [isDocked, setIsDocked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "articles" | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const closeMenuTimeout = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Small delay on close so crossing the gap between the nav item and the
  // panel below it doesn't flicker the menu shut mid-move.
  const openDropdown = (menu: "services" | "articles") => {
    if (closeMenuTimeout.current) window.clearTimeout(closeMenuTimeout.current);
    setOpenMenu(menu);
  };
  const closeDropdownSoon = () => {
    closeMenuTimeout.current = window.setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Wide/arrival covers the hero and roughly the section after it —
    // this isn't "just past the hero", it's "the visitor has meaningfully
    // started exploring". A fraction of viewport height, not a fixed
    // pixel, so it adapts across pages with different hero heights.
    const handleScroll = () => setIsDocked(window.scrollY > window.innerHeight * 1.15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  }, [location]);

  const isActiveRoute = (path: string) => location.pathname.startsWith(path);

  return (
    <nav ref={navRef} className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-5 sm:pt-6">
      {/* Desktop — one shell, two purposes. Wide at arrival: full brand
          presence — the real logo lockup and the CTA are both here in
          full, nothing held back. Docked: pure utility — once the visitor
          has scrolled, the brand's job is already done and StickyCTABar
          already covers conversion from the bottom of the screen, so the
          floating dock reduces to exactly one job: getting between pages. */}
      <motion.div
        initial={shouldReduceMotion ? undefined : { y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: isDocked ? 460 : 1180,
          borderRadius: 999,
          paddingLeft: isDocked ? 8 : 30,
          paddingRight: isDocked ? 8 : 30,
          paddingTop: isDocked ? 8 : 16,
          paddingBottom: isDocked ? 8 : 16,
          boxShadow: isDocked ? SHELL_SHADOW_DOCKED : SHELL_SHADOW_WIDE,
        }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ background: "linear-gradient(180deg, #16140F 0%, #0A0908 100%)", width: "100%" }}
        className="relative hidden lg:flex items-center justify-center border border-white/[0.04]"
      >
        <AnimatePresence mode="popLayout">
          {!isDocked && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, width: 0, scale: 0.75 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.75 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ perspective: 600 }}
              className="overflow-x-hidden overflow-y-visible flex-shrink-0"
            >
              <Link to="/" aria-label="Zumetrix Labs home" className="flex items-center pr-8">
                <img
                  className="h-10 w-auto select-none"
                  src="/logo/zumetrix-email.webp"
                  alt="Zumetrix Labs"
                  width="288"
                  height="70"
                  decoding="async"
                  fetchpriority="high"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex items-center transition-[gap] duration-500 ease-out ${
            isDocked ? "gap-1" : "flex-1 justify-center gap-14"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(item.path);
            const dropdownKey = item.path === "/services" ? "services" : item.path === "/articles" ? "articles" : null;
            const isOpen = dropdownKey !== null && openMenu === dropdownKey;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative"
                onMouseEnter={dropdownKey ? () => openDropdown(dropdownKey) : undefined}
                onMouseLeave={dropdownKey ? closeDropdownSoon : undefined}
                onFocus={dropdownKey ? () => openDropdown(dropdownKey) : undefined}
                onBlur={dropdownKey ? closeDropdownSoon : undefined}
                aria-expanded={dropdownKey ? isOpen : undefined}
                aria-haspopup={dropdownKey ? "true" : undefined}
              >
                <span
                  className={`relative flex items-center gap-1 rounded-full transition-all duration-500 ${
                    isDocked ? "px-4 py-2.5 text-[14px]" : "px-0 py-1 text-[15px]"
                  } font-medium tracking-[-0.01em] ${
                    active
                      ? `text-foreground ${isDocked ? "bg-white/[0.055]" : ""}`
                      : "text-muted-foreground/70 hover:text-foreground/90"
                  }`}
                >
                  {item.name}
                  {dropdownKey && (
                    <ChevronDown
                      size={13}
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-active-mark"
                      className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary"
                      transition={{ duration: 0.4, ease: EASE }}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Services mega-menu — the one real gap in an otherwise complete   */}
        {/* nav: five distinct service pages existed with no way to reach   */}
        {/* any of them except through /services itself. Same material as   */}
        {/* the shell it hangs from, not a generic dropdown card.            */}
        <AnimatePresence>
          {openMenu === "services" && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              onMouseEnter={() => openDropdown("services")}
              onMouseLeave={closeDropdownSoon}
              style={{ background: "linear-gradient(180deg, #16140F 0%, #0A0908 100%)", boxShadow: SHELL_SHADOW_WIDE }}
              className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[640px] rounded-3xl border border-white/[0.06] p-3 z-[70]"
            >
              <div className="grid grid-cols-2 gap-1.5 p-1.5">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="group flex items-start gap-3.5 rounded-2xl p-3.5 hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary/25 bg-background flex-shrink-0 group-hover:border-primary/45 transition-colors duration-200">
                      <service.icon size={17} className="text-primary" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {service.title}
                      </span>
                      <span className="block text-[12.5px] text-muted-foreground/70 leading-snug mt-0.5 line-clamp-2">
                        {service.subtitle}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* Rescue stays visually distinct from the four equal cards  */}
              {/* above — same rule the Services hub itself already follows: */}
              {/* it's a different buyer state (something stuck, not         */}
              {/* something new), not a fifth interchangeable option.        */}
              <div className="px-1.5 pb-1.5">
                <Link
                  to={`/services/${rescueService.slug}`}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3.5 hover:bg-white/[0.05] hover:border-primary/20 transition-colors duration-200"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border/60 bg-background flex-shrink-0 group-hover:border-primary/40 transition-colors duration-200">
                    <rescueService.icon size={17} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {rescueService.title}
                    </span>
                    <span className="block text-[12.5px] text-muted-foreground/70 leading-snug mt-0.5">
                      {rescueService.subtitle}
                    </span>
                  </span>
                </Link>
              </div>

              <div className="mt-1 pt-3 px-4 pb-2 border-t border-white/[0.06]">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  View all services
                  <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Articles mega-menu — only the pieces already marked `featured`  */}
        {/* in the data, the same editorial call already driving the       */}
        {/* Articles hub's own spotlight section. Deliberately not a       */}
        {/* category menu: one category has zero real articles in it and   */}
        {/* another is missing from the filter list entirely, so a         */}
        {/* category-based menu would link straight to a dead end.         */}
        <AnimatePresence>
          {openMenu === "articles" && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              onMouseEnter={() => openDropdown("articles")}
              onMouseLeave={closeDropdownSoon}
              style={{ background: "linear-gradient(180deg, #16140F 0%, #0A0908 100%)", boxShadow: SHELL_SHADOW_WIDE }}
              className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[420px] rounded-3xl border border-white/[0.06] p-3 z-[70]"
            >
              <div className="px-1 pt-1 pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary/70 px-2.5">Featured Reading</p>
              </div>
              <div className="flex flex-col gap-1">
                {FEATURED_ARTICLES.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/articles/${article.slug}`}
                    className="group rounded-2xl p-3.5 hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground/60 mb-1">
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <span className="block text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                      {article.title}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-1 pt-3 px-4 pb-2 border-t border-white/[0.06]">
                <Link
                  to="/articles"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  View all articles
                  <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {!isDocked && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, width: 0, scale: 0.75 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.75 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ perspective: 600 }}
              className="overflow-x-hidden overflow-y-visible flex-shrink-0 py-1"
            >
              <Link
                to="/contact"
                className="btn-sheen group flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-primary/[0.9] pl-6 pr-5 py-3 ml-8 text-[15px] font-semibold text-primary-foreground whitespace-nowrap"
              >
                Let&apos;s talk
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/[0.12] group-hover:bg-black/[0.18] transition-colors duration-300">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile — same wide-to-docked logic, no CTA to add/remove here
          since the mobile menu itself is the action surface. */}
      <motion.div
        initial={shouldReduceMotion ? undefined : { y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: isDocked ? 380 : 560,
          borderRadius: 999,
          paddingLeft: isDocked ? 14 : 20,
          paddingRight: isDocked ? 8 : 12,
          paddingTop: isDocked ? 8 : 12,
          paddingBottom: isDocked ? 8 : 12,
          boxShadow: isDocked ? SHELL_SHADOW_DOCKED : SHELL_SHADOW_WIDE,
        }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{ background: "linear-gradient(180deg, #16140F 0%, #0A0908 100%)", width: "100%" }}
        className="lg:hidden flex items-center justify-between border border-white/[0.04]"
      >
        <Link to="/" aria-label="Zumetrix Labs home" className="flex items-center overflow-hidden">
          <motion.img
            animate={{ height: isDocked ? 24 : 30 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-auto select-none"
            src="/logo/zumetrix-email.webp"
            alt="Zumetrix Labs"
            width="288"
            height="70"
            decoding="async"
            fetchpriority="high"
          />
        </Link>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
          className="btn-sheen flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <span className="flex flex-col items-center justify-center gap-[5px]">
            <span className="block h-px w-4 bg-foreground/90" aria-hidden="true" />
            <span className="block h-px w-4 bg-foreground/90" aria-hidden="true" />
          </span>
        </button>
      </motion.div>

      {/* Mobile — editorial full-screen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden fixed inset-0 z-[60] bg-[#0a0908] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
              <Link
                to="/"
                aria-label="Zumetrix Labs home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  className="h-7 w-auto select-none"
                  src="/logo/zumetrix-email.webp"
                  alt="Zumetrix Labs"
                  width="288"
                  height="70"
                  decoding="async"
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="btn-sheen flex items-center justify-center w-9 h-9 text-foreground/80 hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 sm:px-8">
              <div className="flex flex-col gap-2">
                {[{ name: "Home", path: "/" }, ...NAV_ITEMS, { name: "Contact", path: "/contact" }].map(
                  (item, index) => {
                    const active = item.path === "/" ? location.pathname === "/" : isActiveRoute(item.path);
                    return (
                      <motion.div
                        key={item.name}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 + index * 0.04, ease: EASE }}
                      >
                        <Link
                          to={item.path}
                          className={`block py-2.5 font-bold tracking-[-0.02em] leading-none text-[13vw] sm:text-5xl transition-colors duration-200 ${
                            active ? "text-foreground" : "text-muted-foreground/50 hover:text-foreground/80"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  },
                )}
              </div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
              className="px-6 pb-8 pt-6 sm:px-8 sm:pb-10 border-t border-white/[0.06]"
            >
              <Link to="/contact" className="flex items-center justify-between group">
                <span className="text-lg font-semibold text-foreground">Let&apos;s talk</span>
                <span className="btn-sheen flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
