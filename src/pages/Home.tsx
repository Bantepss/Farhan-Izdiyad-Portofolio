import { motion } from 'framer-motion';

export function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(5px)" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-neon-blue tracking-[0.3em] uppercase text-sm mb-4 font-mono font-bold">
          System Access Granted
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          FARHAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">IZDIYAD</span>
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed mb-12 glass-panel p-6 rounded-2xl"
      >
        Welcome to my digital space. I am passionate about crafting futuristic and seamless user experiences on the web. Exploring the intersection of design, code, and innovation.
      </motion.p>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <a href="/about" className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-transparent border border-neon-blue rounded-full hover:bg-neon-blue hover:text-black hover:shadow-[0_0_20px_#00f3ff] overflow-hidden">
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative uppercase tracking-widest text-sm">Initialize Sequence</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
