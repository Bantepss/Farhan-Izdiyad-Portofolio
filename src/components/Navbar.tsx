import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Experience', id: 'experience' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScrollSpy = () => {
      // Menambahkan offset agar menu berganti lebih responsif
      const scrollPosition = window.scrollY + 200;
      
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
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(`#${id}`, { offset: -100, duration: 1.5 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 p-6"
    >
      <div className="max-w-5xl mx-auto glass-panel rounded-full px-8 py-4 flex justify-between items-center overflow-x-auto no-scrollbar">
        <div className="font-bold text-xl text-glow tracking-widest text-neon-blue mr-8 shrink-0">
          FI<span className="text-white opacity-50">.</span>
        </div>

        <ul className="flex space-x-6 sm:space-x-8">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={`relative px-2 py-1 transition-colors duration-300 uppercase text-xs sm:text-sm tracking-wider font-medium ${
                    isActive ? 'text-neon-blue text-glow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_8px_#00f3ff]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
