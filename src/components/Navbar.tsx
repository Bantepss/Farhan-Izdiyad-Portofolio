import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm' : 'py-6 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center overflow-x-auto no-scrollbar">
        <div className="font-extrabold text-2xl text-[#0F172A] mr-8 shrink-0 tracking-tight">
          Farhan<span className="text-[#135CC5]">.</span>
        </div>

        <ul className="flex space-x-2 sm:space-x-4">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={`relative px-4 py-2 transition-all duration-300 rounded-full text-sm font-semibold ${
                    isActive ? 'bg-[#EFF6FF] text-[#135CC5]' : 'text-slate-500 hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
