import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { IoSchoolOutline } from 'react-icons/io5';

export function SocialLinks() {
  const links = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/farhan-izdiyad-726a80337', label: 'LinkedIn', color: 'hover:text-[#0A66C2] hover:bg-[#EFF6FF]' },
    { icon: FaGithub, href: 'https://github.com/Bantepss', label: 'GitHub', color: 'hover:text-[#24292F] hover:bg-slate-100' },
    { icon: FaInstagram, href: 'https://www.instagram.com/farhanizdiyad/', label: 'Instagram', color: 'hover:text-[#E4405F] hover:bg-pink-50' },
    { icon: FiMail, href: 'mailto:farhanizdiyad2@gmail.com', label: 'Email', color: 'hover:text-[#EA4335] hover:bg-red-50' },
    { icon: IoSchoolOutline, href: 'mailto:18225074@mahasiswa.itb.ac.id', label: 'Campus Email', color: 'hover:text-[#135CC5] hover:bg-[#EFF6FF]' }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`text-slate-500 bg-white border border-slate-200 transition-all duration-300 p-3 rounded-xl shadow-sm ${link.color}`}
            title={link.label}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
    </div>
  );
}
