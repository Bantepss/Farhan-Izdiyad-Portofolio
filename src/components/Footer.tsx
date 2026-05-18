import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { IoSchoolOutline } from 'react-icons/io5';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/farhan-izdiyad-726a80337',
      icon: <FaLinkedin size={20} />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Bantepss',
      icon: <FaGithub size={20} />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/farhanizdiyad/',
      icon: <FaInstagram size={20} />,
    },
    {
      name: 'Email',
      url: 'mailto:farhanizdiyad2@gmail.com',
      icon: <FiMail size={20} />,
    },
    {
      name: 'Campus Email',
      url: 'mailto:18225074@mahasiswa.itb.ac.id',
      icon: <IoSchoolOutline size={20} />,
    },
  ];

  return (
    <footer className="w-full border-t border-cyan-500/30 bg-black/50 backdrop-blur-md relative z-10">
      {/* Efek garis neon di atas footer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Bagian Kiri: Terminal Text */}
        <div className="flex flex-col items-center md:items-start text-xs sm:text-sm font-mono text-cyan-500/70">
          <span className="tracking-widest mb-1">SYSTEM.STATUS [ONLINE]</span>
          <span className="text-gray-500">
            © {currentYear} FARHAN IZDIYAD. ALL RIGHTS RESERVED.
          </span>
        </div>

        {/* Bagian Kanan: Social Links dengan Framer Motion */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-gray-400 p-2 rounded-full border border-transparent hover:border-cyan-500/50 bg-white/5 hover:bg-cyan-500/10 transition-colors duration-300"
              whileHover={{
                scale: 1.1,
                y: -3,
                boxShadow: "0px 0px 8px rgb(6 182 212 / 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

      </div>
    </footer>
  );
}
