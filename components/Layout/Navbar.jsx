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

  const isActive = (itemHref) => {
    return activeHref === itemHref;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 justify-center transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
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
      </motion.nav>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div
          className={`glass-panel px-4 py-3 flex justify-between items-center transition-all duration-300 ${
            scrolled ? 'shadow-lg' : ''
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
              mining
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 relative z-60"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 6 : 0,
              }}
              className="w-6 h-0.5 bg-white transition-all"
            />
            <motion.span
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
              }}
              className="w-6 h-0.5 bg-white transition-all"
            />
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -6 : 0,
              }}
              className="w-6 h-0.5 bg-white transition-all"
            />
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-4 right-4 mt-2 z-50"
            >
              <div className="glass-panel p-4">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className={`block py-2 px-4 rounded-lg transition-all ${
                          isActive(item.href)
                            ? 'bg-accent-neon/20 text-accent-neon'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

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
