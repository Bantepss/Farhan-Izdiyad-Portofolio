import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { IoSchoolOutline } from 'react-icons/io5';

export function SocialLinks() {
  const links = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/farhan-izdiyad-726a80337', label: 'LinkedIn', color: 'hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' },
    { icon: FaGithub, href: 'https://github.com/Bantepss', label: 'GitHub', color: 'hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
    { icon: FaInstagram, href: 'https://www.instagram.com/farhanizdiyad/', label: 'Instagram', color: 'hover:text-pink-500 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' },
    { icon: FiMail, href: 'mailto:farhanizdiyad2@gmail.com', label: 'Email', color: 'hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' },
    { icon: IoSchoolOutline, href: 'mailto:18225074@mahasiswa.itb.ac.id', label: 'Campus Email', color: 'hover:text-neon-blue hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]' }
  ];

  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`text-gray-400 transition-all duration-300 p-3 glass-panel rounded-full ${link.color}`}
            title={link.label}
          >
            <Icon size={24} />
          </motion.a>
        );
      })}
    </div>
  );
}
