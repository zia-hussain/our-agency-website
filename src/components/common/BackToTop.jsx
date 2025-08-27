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
        duration: 0.15,
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-beige-gradient text-primary-foreground p-3 rounded-full shadow-xl hover:shadow-glow transition-all duration-200"
    >
      <ArrowUp size={20} />
    </motion.button>
  ) : null;
};

export default BackToTop;
