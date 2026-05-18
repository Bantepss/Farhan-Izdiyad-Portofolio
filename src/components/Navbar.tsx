import { NavLink } from 'react-router';
import { motion } from 'framer-motion';

export function Navbar() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 p-6"
    >
      <div className="max-w-5xl mx-auto glass-panel rounded-full px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-glow tracking-widest text-neon-blue">
          FI<span className="text-white opacity-50">.</span>
        </div>
        
        <ul className="flex space-x-8">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path}
                className={({ isActive }) => 
                  `relative px-2 py-1 transition-colors duration-300 ${
                    isActive ? 'text-neon-blue text-glow' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 uppercase text-sm tracking-wider font-medium">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_8px_#00f3ff]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
