import { useEffect, useMemo, useRef, useState } from "react";

// Parses a leading number out of "80+", "50+", "100%", "30,000+" so it can
// count up on scroll-in. Values with no leading digit ("Founder-led",
// "Fully Automated") return null — callers should render those as plain
// static text rather than forcing a fake count.
const parseValue = (value: string) => {
  const match = value.match(/^(\d[\d,]*)/);
  if (!match) return null;
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = value.slice(match[0].length);
  return { target, suffix };
};

export const useCountUp = (value: string, isInView: boolean, delay = 0) => {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(parsed ? 0 : null);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || !parsed || started.current) return;
    started.current = true;
    const duration = 1100;
    let raf: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * parsed.target));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [isInView, parsed, delay]);

  if (!parsed) return value;
  return `${(display ?? 0).toLocaleString()}${parsed.suffix}`;
};
