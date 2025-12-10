import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

useEffect(() => {
  setTimeout(() => {
    // Window scroll
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Layout scroll (if any)
    const layout = document.getElementById("mainLayout");
    if (layout) {
      layout.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 0);
}, [pathname]);


  return null;
};

export default ScrollToTop;