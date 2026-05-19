import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800));
      setStep(1);
      await new Promise(r => setTimeout(r, 1200));
      setStep(2); // Trigger exit
      setTimeout(() => onComplete(), 600); // Wait for fade out
    };

    sequence();
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && step < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center font-sans overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full border-4 border-[#135CC5] border-t-transparent animate-spin" />
                <span className="text-[#0F172A] font-semibold tracking-wide">Loading workspace...</span>
              </motion.div>
            )}
            
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                  Farhan Izdiyad
                </h1>
                <p className="text-[#475569] mt-2 font-medium">Frontend Developer</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
