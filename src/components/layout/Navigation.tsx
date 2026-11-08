import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { services, rescueService } from "../../data/services";
import { trackOffersNavClick } from "../../utils/analytics";
import { PANELS, PANEL_WIDTH, type PanelKey } from "./NavPanels";

const PANEL_KEYS: PanelKey[] = ["services", "start", "portfolio", "articles"];
const PANEL_FOR_PATH: Record<string, PanelKey> = {
  "/services": "services",
  "/start": "start",
  "/portfolio": "portfolio",
  "/articles": "articles",
};

// One resolved object, not a UI panel: a solid, heavy instrument sitting
// above the page, not a translucent bar blending into it. The glossy
// top-edge highlight and deep contact shadow are what read as material —
// without them this is just another flat rounded div.
const NAV_ITEMS = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Start here", path: "/start" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Articles", path: "/articles" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// One panel, four contents. Moving the pointer from "Services" to
// "Portfolio" does not close and reopen anything: the same surface stays
// put and morphs — width and height spring to the next content while the
// old content fades under the new. That continuity is what reads as
// smooth; a per-item dropdown can never get it. Timings are asymmetric on
// purpose: a short open delay so sweeping across the pill doesn't flash
// panels, a slightly longer close delay so crossing the gap between the
// trigger and the panel never slams it shut.
const OPEN_DELAY = 70;
const CLOSE_DELAY = 160;
const PANEL_SHOW = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
const PANEL_HIDE = { duration: 0.16, ease: [0.4, 0, 1, 1] as [number, number, number, number] };
const PANEL_MORPH = { type: "spring" as const, stiffness: 420, damping: 40, mass: 0.9 };

const SHELL_SHADOW_WIDE =
  "inset 0 1px 0 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.04), 0 40px 90px -30px rgba(0,0,0,0.8), 0 14px 32px -14px rgba(0,0,0,0.55)";
const DOCK_LAYOUT = { duration: 0.6, ease: EASE };
const SHELL_SHADOW_DOCKED =
  "inset 0 1px 0 0 rgba(255,255,255,0.16), inset 0 0 0 1px rgba(255,255,255,0.07), 0 34px 70px -22px rgba(0,0,0,0.9), 0 12px 28px -10px rgba(0,0,0,0.7)";

const Navigation: React.FC = () => {
  const [isDocked, setIsDocked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<PanelKey | null>(null);
  // The last panel that was open keeps rendering while the surface fades
  // out, so closing never snaps to an empty box.
  const [shownMenu, setShownMenu] = useState<PanelKey>("services");
  const [panelHeights, setPanelHeights] = useState<Record<PanelKey, number>>({ services: 0, start: 0, portfolio: 0, articles: 0 });
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const openTimeout = useRef<number | null>(null);
  const closeTimeout = useRef<number | null>(null);
  const panelRefs = useRef<Partial<Record<PanelKey, HTMLDivElement | null>>>({});
  const shouldReduceMotion = useReducedMotion();

  const clearTimers = () => {
    if (openTimeout.current) window.clearTimeout(openTimeout.current);
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    openTimeout.current = null;
    closeTimeout.current = null;
  };
  const openDropdown = useCallback((menu: PanelKey, immediate = false) => {
    clearTimers();
    const go = () => {
      setShownMenu(menu);
      setOpenMenu(menu);
    };
    // Already open: switch at once, that's the morph. Closed: a short
    // intent delay so a pointer sweeping across the pill stays quiet.
    if (immediate || openMenu) go();
    else openTimeout.current = window.setTimeout(go, OPEN_DELAY);
  }, [openMenu]);
  const closeDropdownSoon = useCallback(() => {
    clearTimers();
    closeTimeout.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  }, []);
  const closeDropdownNow = useCallback(() => {
    clearTimers();
    setOpenMenu(null);
  }, []);

  // Each panel reports its own natural height; the shared surface animates
  // to whichever is showing. ResizeObserver so late-loading covers or font
  // swaps correct the measurement instead of leaving a cropped panel.
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      setPanelHeights((prev) => {
        let next = prev;
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.panel as PanelKey | undefined;
          const h = Math.round(entry.contentRect.height);
          if (key && prev[key] !== h) next = { ...next, [key]: h };
        }
        return next;
      });
    });
    for (const key of PANEL_KEYS) {
      const node = panelRefs.current[key];
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  // Pointer leaves the whole shell (pill + panel): close. Keyboard focus
  // leaving it: close too. Escape closes from anywhere inside.
  const handleShellLeave = () => closeDropdownSoon();
  const handleShellBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeDropdownNow();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      closeDropdownNow();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeDropdownNow]);

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
    <motion.nav ref={navRef} layoutRoot className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-5 sm:pt-6">
      {/* Desktop — one shell, two purposes. Wide at arrival: full brand
          presence — the real logo lockup and the CTA are both here in
          full, nothing held back. Docked: pure utility — once the visitor
          has scrolled, the brand's job is already done and StickyCTABar
          already covers conversion from the bottom of the screen, so the
          floating dock reduces to exactly one job: getting between pages. */}
      <motion.div
        layout
        initial={shouldReduceMotion ? undefined : { y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: isDocked ? SHELL_SHADOW_DOCKED : SHELL_SHADOW_WIDE,
        }}
        transition={{ duration: 0.6, ease: EASE, layout: DOCK_LAYOUT }}
        // Wide→docked is a FLIP layout animation (framer `layout`): the box
        // snaps to its new geometry once and the visible morph is pure
        // transform, so the dock no longer registers a layout shift on
        // every animation frame (was ≈0.06 CLS per dock, all of it here).
        // Width/padding therefore live in style/classes, not `animate`.
        style={{
          background: "linear-gradient(180deg, #16140F 0%, #0A0908 100%)",
          width: "100%",
          maxWidth: isDocked ? 560 : 1180,
          borderRadius: 999,
        }}
        className={`relative hidden lg:flex items-center justify-center border border-white/[0.04] ${
          isDocked ? "px-2 py-2" : "px-[30px] py-4"
        }`}
        onMouseLeave={handleShellLeave}
        onBlur={handleShellBlur}
      >
        {/* Logo and CTA stay mounted through the dock (an exiting element
            popped out of flow would float outside the shrinking pill for
            its exit duration). Docked they collapse to 1px and fade, and the
            FLIP transform carries the squeeze — same read as before, no
            layout shift, nothing focusable left behind. */}
        <motion.div
          layout
          animate={{ opacity: isDocked ? 0 : 1 }}
          transition={{ duration: 0.4, ease: EASE, layout: DOCK_LAYOUT }}
          className={`flex-shrink-0 ${isDocked ? "w-px overflow-hidden pointer-events-none" : ""}`}
          aria-hidden={isDocked || undefined}
          {...({ inert: isDocked ? "" : undefined } as Record<string, string | undefined>)}
        >
          {(
            <Link to="/" aria-label="Zumetrix Labs home" className="flex items-center pr-8" onMouseEnter={closeDropdownSoon} tabIndex={isDocked ? -1 : undefined}>
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
          )}
        </motion.div>

        <motion.div
          layout
          transition={{ layout: DOCK_LAYOUT }}
          className={`flex items-center ${isDocked ? "gap-0.5" : "flex-1 justify-center gap-10 xl:gap-14"}`}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(item.path);
            const dropdownKey: PanelKey | null = PANEL_FOR_PATH[item.path] ?? null;
            const isOpen = dropdownKey !== null && openMenu === dropdownKey;
            return (
              <motion.div key={item.name} layout="position" transition={{ layout: DOCK_LAYOUT }} className="relative">
              <Link
                to={item.path}
                className="relative block"
                onClick={item.path === "/start" ? trackOffersNavClick : undefined}
                onMouseEnter={dropdownKey ? () => openDropdown(dropdownKey) : () => closeDropdownSoon()}
                onFocus={dropdownKey ? () => openDropdown(dropdownKey, true) : undefined}
                aria-expanded={dropdownKey ? isOpen : undefined}
                aria-haspopup={dropdownKey ? "true" : undefined}
                aria-controls={dropdownKey ? "nav-panel" : undefined}
              >
                <span
                  className={`relative isolate flex items-center gap-1 whitespace-nowrap rounded-full transition-colors duration-300 ${
                    isOpen && !isDocked ? "before:absolute before:-inset-x-3.5 before:-inset-y-2 before:-z-10 before:rounded-full before:bg-white/[0.06]" : ""
                  } ${
                    isDocked ? "px-3.5 py-2.5 text-[14px]" : "px-0 py-1 text-[15px]"
                  } font-medium tracking-[-0.01em] ${
                    active
                      ? `text-foreground ${isDocked ? "bg-white/[0.055]" : ""}`
                      : item.path === "/start"
                        ? "text-foreground/85 hover:text-foreground"
                        : "text-muted-foreground/70 hover:text-foreground/90"
                  }`}
                >
                  {item.path === "/start" && (
                    <span aria-hidden="true" className="relative mr-1.5 flex h-[5px] w-[5px]">
                      <span className="absolute inset-0 rounded-full bg-primary/60 motion-safe:animate-ping [animation-duration:2.4s]" />
                      <span className="relative h-[5px] w-[5px] rounded-full bg-primary" />
                    </span>
                  )}
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
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          layout
          animate={{ opacity: isDocked ? 0 : 1 }}
          transition={{ duration: 0.4, ease: EASE, layout: DOCK_LAYOUT }}
          className={`flex-shrink-0 py-1 ${isDocked ? "w-px overflow-hidden pointer-events-none" : ""}`}
          aria-hidden={isDocked || undefined}
          {...({ inert: isDocked ? "" : undefined } as Record<string, string | undefined>)}
        >
          {(
              <Link
                to="/contact"
                onMouseEnter={closeDropdownSoon}
                tabIndex={isDocked ? -1 : undefined}
                className="btn-sheen group flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-primary/[0.9] pl-6 pr-5 py-3 ml-8 text-[15px] font-semibold text-primary-foreground whitespace-nowrap"
              >
                Let&apos;s talk
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/[0.12] group-hover:bg-black/[0.18] transition-colors duration-300">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </span>
              </Link>
          )}
        </motion.div>

        {/* The shared panel. Lives inside the pill so the pointer never
            leaves the shell on the way down; the top padding is the hover
            bridge across the visual gap. Always in the document (hidden
            when closed, inert so it never catches focus) so every page's
            markup carries these links for crawlers and prefetchers. */}
        <motion.div
          id="nav-panel"
          initial={false}
          animate={
            openMenu
              ? { opacity: 1, y: 0, visibility: "visible" as const }
              : { opacity: 0, y: -6, transitionEnd: { visibility: "hidden" as const } }
          }
          transition={openMenu ? PANEL_SHOW : PANEL_HIDE}
          style={{ x: "-50%", visibility: openMenu ? "visible" : "hidden" }}
          className={`absolute left-1/2 top-full z-[70] pt-3 ${openMenu ? "pointer-events-auto" : "pointer-events-none"}`}
          onMouseEnter={() => openMenu && openDropdown(openMenu, true)}
          {...({ inert: openMenu ? undefined : "" } as Record<string, string | undefined>)}
        >
          <motion.div
            initial={false}
            animate={{ width: PANEL_WIDTH[shownMenu], height: panelHeights[shownMenu] || "auto" }}
            transition={shouldReduceMotion ? { duration: 0 } : PANEL_MORPH}
            style={{ background: "#0C0B0A", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85), 0 14px 32px -14px rgba(0,0,0,0.6)" }}
            className="relative overflow-hidden rounded-[24px] border border-white/[0.08]"
          >
            {PANEL_KEYS.map((key) => {
              const Panel = PANELS[key];
              const active = shownMenu === key;
              return (
                <motion.div
                  key={key}
                  data-panel={key}
                  ref={(node) => {
                    panelRefs.current[key] = node;
                  }}
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, visibility: active ? ("visible" as const) : ("hidden" as const) }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
                  style={{ width: PANEL_WIDTH[key] }}
                  className={active ? "relative" : "absolute left-0 top-0 pointer-events-none"}
                  aria-hidden={!active}
                  {...({ inert: active ? undefined : "" } as Record<string, string | undefined>)}
                >
                  <Panel live={openMenu === key} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile — same wide-to-docked logic, no CTA to add/remove here
          since the mobile menu itself is the action surface. */}
      <motion.div
        layout
        initial={shouldReduceMotion ? undefined : { y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: isDocked ? SHELL_SHADOW_DOCKED : SHELL_SHADOW_WIDE,
        }}
        transition={{ duration: 0.55, ease: EASE, layout: DOCK_LAYOUT }}
        // Same FLIP treatment as the desktop shell: geometry in style/classes,
        // the morph on transform, zero layout shift while docking.
        style={{
          background: "linear-gradient(180deg, #16140F 0%, #0A0908 100%)",
          width: "100%",
          maxWidth: isDocked ? 380 : 560,
          borderRadius: 999,
        }}
        className={`lg:hidden flex items-center justify-between border border-white/[0.04] ${
          isDocked ? "pl-3.5 pr-2 py-2" : "pl-5 pr-3 py-3"
        }`}
      >
        <Link to="/" aria-label="Zumetrix Labs home" className="flex items-center overflow-hidden">
          <motion.img
            layout
            transition={{ layout: DOCK_LAYOUT }}
            className={`w-auto select-none ${isDocked ? "h-6" : "h-[30px]"}`}
            src="/logo/zumetrix-email.webp"
            alt="Zumetrix Labs"
            width="288"
            height="70"
            decoding="async"
            fetchpriority="high"
          />
        </Link>
        <motion.button
          layout="position"
          transition={{ layout: DOCK_LAYOUT }}
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
          className="btn-sheen relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 before:absolute before:-inset-1.5 before:content-['']"
        >
          <span className="flex flex-col items-center justify-center gap-[5px]">
            <span className="block h-px w-4 bg-foreground/90" aria-hidden="true" />
            <span className="block h-px w-4 bg-foreground/90" aria-hidden="true" />
          </span>
        </motion.button>
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

            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 sm:px-8">
              <div className="flex flex-col gap-1">
                {[{ name: "Home", path: "/" }, ...NAV_ITEMS].map(
                  (item, index) => {
                    const active = item.path === "/" ? location.pathname === "/" : isActiveRoute(item.path);
                    // Service pages and the three doors are one tap away on
                    // desktop (mega-menu) and were two taps away on mobile —
                    // where paid traffic lands. Same destinations, listed under
                    // their parent.
                    const subItems =
                      item.path === "/services"
                        ? [
                            ...services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })),
                            { name: rescueService.title, path: `/services/${rescueService.slug}` },
                          ]
                        : item.path === "/start"
                          ? [
                              { name: "I have a product and it's stuck", path: "/product-rescue?from=mobile-nav" },
                              { name: "I have an idea and nothing built yet", path: "/contact?service=saas-mvp-development&situation=nothing-built" },
                              { name: "My team still does this by hand", path: "/contact?service=ai-automation-solutions&situation=manual-workflow" },
                            ]
                          : item.path === "/portfolio"
                            ? [
                                { name: "Clients on film", path: "/client-stories" },
                                { name: "Every project", path: "/portfolio/all" },
                              ]
                            : null;
                    return (
                      <motion.div
                        key={item.name}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 + index * 0.04, ease: EASE }}
                      >
                        <Link
                          to={item.path}
                          onClick={item.path === "/start" ? trackOffersNavClick : undefined}
                          className={`flex items-center gap-3 py-1.5 font-bold tracking-[-0.02em] leading-none text-[8.5vw] sm:text-[2.4rem] transition-colors duration-200 ${
                            active ? "text-foreground" : item.path === "/start" ? "text-foreground/80" : "text-muted-foreground/75 hover:text-foreground/80"
                          }`}
                        >
                          {item.path === "/start" && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                          {item.name}
                        </Link>
                        {subItems && (
                          <ul className="mt-1 mb-2.5 ml-1 border-l border-white/[0.08] pl-4 space-y-1">
                            {subItems.map((sub) => (
                              <li key={sub.path}>
                                <Link
                                  to={sub.path}
                                  className={`block py-px text-[14px] transition-colors duration-200 ${
                                    location.pathname === sub.path.split("?")[0]
                                      ? "text-primary"
                                      : "text-muted-foreground/70 hover:text-foreground"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
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
    </motion.nav>
  );
};

export default Navigation;
