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
      // Step 0: Terminal vibe
      await new Promise(r => setTimeout(r, 1000));
      setStep(1);
      // Step 1: Glitch Name
      await new Promise(r => setTimeout(r, 1500));
      setStep(2);
      // Step 2: Gen Z Catchphrase
      await new Promise(r => setTimeout(r, 1200));
      setStep(3); // Trigger exit
      
      setTimeout(() => onComplete(), 600); // Wait for slide-up exit
    };

    sequence();
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && step < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }} // Exit slide up (shutter effect)
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#030014] flex flex-col items-center justify-center font-mono overflow-hidden"
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] z-0" />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
                transition={{ duration: 0.3 }}
                className="text-cyan-400 text-sm md:text-base tracking-[0.3em] uppercase relative z-10"
              >
                <motion.span
                  animate={{ opacity: [0, 1, 0, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.2, 0.5, 1] }}
                >
                  &gt; fetching_vibes... 100%
                </motion.span>
              </motion.div>
            )}
            
            {step === 1 && (
              <motion.div
                key="step1"
                className="relative flex items-center justify-center z-10"
              >
                {/* RGB Split / Glitch effect (Red/Purple Layer) */}
                <motion.h1
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ 
                    x: [-5, 5, -8, 2, 0], 
                    opacity: [1, 0.8, 1, 0.9, 1] 
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute text-5xl md:text-8xl font-black text-neon-purple uppercase tracking-tighter opacity-70 mix-blend-screen ml-2 mt-1"
                >
                  FARHAN_IZDIYAD
                </motion.h1>

                {/* RGB Split / Glitch effect (Cyan Layer) */}
                <motion.h1
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ 
                    x: [5, -5, 8, -2, 0], 
                    opacity: [1, 0.8, 1, 0.9, 1] 
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute text-5xl md:text-8xl font-black text-cyan-400 uppercase tracking-tighter opacity-70 mix-blend-screen -ml-2 -mt-1"
                >
                  FARHAN_IZDIYAD
                </motion.h1>

                {/* Main White Text */}
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.3 }}
                  className="relative text-5xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                  FARHAN_IZDIYAD
                </motion.h1>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex items-center gap-4 relative z-10"
              >
                <div className="w-3 h-3 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff] animate-pulse" />
                <h2 className="text-xl md:text-2xl text-gray-300 lowercase tracking-widest font-sans font-semibold">
                  let's dive in. ⚡
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
