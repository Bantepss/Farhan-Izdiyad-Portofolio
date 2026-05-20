import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'text' | 'exit'>('counting');

  // ========================================================
  // UBAH KATA-KATA INTRO DI SINI
  // ========================================================
  const introWord = "Farhan Izdiyad."; 
  
  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = 100;
    const duration = 1400; 
    const incrementTime = (duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
        setTimeout(() => setPhase('text'), 300);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    if (phase === 'text') {
      setTimeout(() => setPhase('exit'), 1200); 
    } else if (phase === 'exit') {
      setTimeout(() => onComplete(), 1000); 
    }
  }, [phase, onComplete]);

  // PERBAIKAN: Menggunakan ': any' untuk mem-bypass error TS yang cerewet
  const containerVariants: any = {
    animate: {
      transition: {
        staggerChildren: 0.04, 
      }
    }
  };

  const letterVariants: any = {
    initial: { y: "100%" },
    animate: { 
      y: "0%", // PERBAIKAN: Disamakan menjadi string (teks) agar TS tidak bingung
      transition: { duration: 0.7, ease: [0.215, 0.610, 0.355, 1] } 
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col justify-between p-8 md:p-12 font-sans overflow-hidden text-white select-none"
        >
          {/* Bagian Atas / Ornamen Teks */}
          <div className="flex justify-between items-start">
             <motion.span 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 0.6, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase font-['Quicksand']"
             >
               Portfolio
             </motion.span>
             <motion.span 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 0.6, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase font-['Quicksand']"
             >
               2026©
             </motion.span>
          </div>

          {/* Bagian Tengah / Teks Utama */}
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            <AnimatePresence mode="wait">
              {phase === 'counting' ? (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -40, transition: { duration: 0.3 } }}
                  transition={{ type: "spring", stiffness: 70 }}
                  className="text-6xl md:text-8xl lg:text-9xl font-['Quicksand'] font-bold text-[#135CC5]"
                >
                  {count}%
                </motion.div>
              ) : (
                /* Animasi Huruf Mengalir */
                <motion.h1
                  key="text"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  className="flex flex-wrap justify-center text-4xl md:text-6xl lg:text-7xl tracking-tight font-['Quicksand'] font-bold text-center px-4 overflow-hidden py-2"
                >
                  {introWord.split("").map((char, index) => (
                    <span 
                      key={index} 
                      className="inline-block overflow-hidden relative"
                      style={{ verticalAlign: "bottom" }}
                    >
                      <motion.span
                        variants={letterVariants}
                        className="inline-block"
                        style={{ marginRight: char === " " ? "0.25em" : "0" }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
          
          {/* Bagian Bawah / Loading Bar */}
          <div className="w-full">
            <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
               <motion.div 
                 className="absolute top-0 left-0 bottom-0 bg-white"
                 initial={{ width: "0%" }}
                 animate={{ width: `${count}%` }}
                 transition={{ ease: "linear", duration: 0.05 }}
               />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}