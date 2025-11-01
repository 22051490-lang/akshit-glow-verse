import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("Home");

  const handleClick = (label: string, href: string) => {
    setActiveSection(label);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-6 right-6 z-50 bg-card/70 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg"
    >
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => handleClick(item.label, item.href)}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                activeSection === item.label
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {activeSection === item.label && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-accent to-cyan-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navigation;
