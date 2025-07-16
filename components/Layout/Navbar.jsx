import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/visualizations", label: "Visualizations" },
  { href: "/games", label: "Games" },
  { href: "/data", label: "Data" },
  { href: "/#team", label: "Team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    // Handle hash navigation
    if (href.includes("#")) {
      e.preventDefault();
      const [path, hash] = href.split("#");

      if (path === "" || path === "/") {
        // Same page navigation
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page first, then scroll
        router.push("/").then(() => {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "top-3" : "top-5"
      }`}
    >
      <div
        className={`glass-panel px-8 md:px-12 py-4 transition-all duration-300 ${
          scrolled ? "scale-95" : ""
        }`}
      >
        <ul className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`text-sm md:text-base font-medium transition-all duration-300 relative group ${
                  router.pathname === item.href
                    ? "text-accent-neon"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-neon transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
