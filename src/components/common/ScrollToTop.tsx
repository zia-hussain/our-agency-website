import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const layout = document.getElementById("mainLayout");
    if (layout) {
      layout.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
