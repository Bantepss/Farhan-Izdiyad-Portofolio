import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center font-mono"
        >
          <div className="w-64 max-w-[80vw]">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-neon-blue mb-4 text-sm tracking-widest uppercase flex justify-between"
            >
              <span>System Initialization</span>
              <span>{Math.min(progress, 100)}%</span>
            </motion.div>
            
            {/* Progress Bar Container */}
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-neon-blue shadow-[0_0_10px_#00f3ff]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                layout
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 text-xs text-gray-500 text-center uppercase tracking-widest"
            >
              Loading Holographic Interface...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
