import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ isDark, toggleDarkMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/projects', label: 'Proyectos' },
    { path: '/about', label: 'Sobre mí' },
    { path: '/contact', label: 'Contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-paper/85 dark:bg-paper-dark/85 backdrop-blur-md border-b border-ink-200/60 dark:border-ink-800/60'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-mono text-sm text-ink-900 dark:text-ink-50">
            tomas vergara
            <span className="text-ink-400 dark:text-ink-500">/dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-mono text-sm transition-colors ${
                  location.pathname === link.path
                    ? 'text-ink-900 dark:text-ink-50'
                    : 'text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-50'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-ink-900 dark:bg-ink-50"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-paper dark:bg-paper-dark border-t border-ink-200 dark:border-ink-800"
          >
            <div className="container-custom py-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2 py-3 font-mono text-sm border-b border-ink-200 dark:border-ink-800 last:border-b-0 transition-colors ${
                      location.pathname === link.path
                        ? 'text-ink-900 dark:text-ink-50'
                        : 'text-ink-500 dark:text-ink-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
