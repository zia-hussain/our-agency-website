// components/common/BackToTop.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      onClick={scrollToTop}
      className="fixed bottom-12 right-6 z-50 bg-beige-gradient text-primary-foreground p-4 rounded-full shadow-xl hover:shadow-glow"
    >
      <ArrowUp size={26} />
    </motion.button>
  ) : null;
};

export default BackToTop;
