import { motion } from 'framer-motion';
import { SocialLinks } from '../components/SocialLinks';

export function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-12"
    >
      <div className="glass-panel p-10 rounded-3xl relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neon-blue rounded-tl-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neon-purple rounded-br-3xl opacity-50" />

        <h1 className="text-4xl font-bold mb-6 text-glow text-white">
          ESTABLISH_CONNECTION
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
          Interested in collaborating or have a question? Feel free to reach out through any of the channels below. My inbox is always open.
        </p>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue/50 transition-colors duration-300 group"
          >
            <div className="text-neon-blue font-mono text-sm uppercase tracking-widest w-24">Primary</div>
            <a href="mailto:farhanizdiyad2@gmail.com" className="text-white group-hover:text-neon-blue transition-colors">
              farhanizdiyad2@gmail.com
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-colors duration-300 group"
          >
            <div className="text-neon-purple font-mono text-sm uppercase tracking-widest w-24">Campus</div>
            <a href="mailto:18225074@mahasiswa.itb.ac.id" className="text-white group-hover:text-neon-purple transition-colors">
              18225074@mahasiswa.itb.ac.id
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Social Network</h3>
          <SocialLinks />
        </motion.div>
      </div>
    </motion.div>
  );
}
