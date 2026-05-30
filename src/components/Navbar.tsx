import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Experience', id: 'experience' },
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
      setScrolled(window.scrollY > 20);

      for (let i = links.length - 1; i >= 0; i--) {
        const section = document.getElementById(links[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [links]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-surface/80 backdrop-blur-lg border-b border-line shadow-sm' : 'py-6 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center gap-4 overflow-x-auto no-scrollbar">
        <div className="font-brand font-semibold text-2xl text-ink mr-4 shrink-0 tracking-tight">
          Farhan<span className="text-accent">.</span>
        </div>

        <ul className="flex space-x-1 sm:space-x-2 font-ui">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={`relative px-4 py-2 transition-all duration-300 rounded-full text-sm font-semibold ${
                    isActive ? 'bg-accent-soft text-accent' : 'text-ink-subtle hover:text-ink hover:bg-surface-2'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Toggle tema light/dark */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          className="shrink-0 relative w-10 h-10 rounded-full grid place-items-center text-ink-muted border border-line bg-surface/60 hover:text-accent hover:border-accent/40 transition-colors overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ y: -16, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 16, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 grid place-items-center"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  );
}
