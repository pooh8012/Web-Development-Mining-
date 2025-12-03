import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/visualizations', label: 'Visualizations' },
  { href: '/#about', label: 'About' },
  { href: '/games', label: 'Games' },
  { href: '/#team', label: 'Team' },
  { href: '/project', label: 'Project' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveHref(router.pathname);
  }, [router.pathname]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClick = (e, href) => {
    setMobileMenuOpen(false);
    setActiveHref(href);

    if (href === '/') {
      if (router.pathname === '/') {
        e.preventDefault();
        scrollToTop();
        return;
      }
      return;
    }

    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');

      if ((path === '' || path === '/') && router.pathname === '/') {
        scrollToSection(hash);
        return;
      }

      router.push('/').then(() => {
        setTimeout(() => scrollToSection(hash), 100);
      });

      return;
    }
  };

  const isActive = (itemHref) => activeHref === itemHref;

  return (
    <>
      {/* DESKTOP NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* ⭐ LEFT LOGO - OUTSIDE THE BOX ⭐ */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/Logo.png"
              alt="MiningLab Logo"
              className="w-12 h-12 object-contain rounded-full shadow-sm"
            />
          </Link>

          {/* ⭐ CENTER NAV BOX ⭐ */}
          <div
            className={`glass-panel px-8 xl:px-12 py-4 transition-all duration-300 ${
              scrolled ? 'scale-95' : ''
            }`}
          >
            <ul className="flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`text-sm xl:text-base font-medium transition-all duration-300 relative group ${
                      isActive(item.href)
                        ? 'text-accent-neon'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-neon transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
