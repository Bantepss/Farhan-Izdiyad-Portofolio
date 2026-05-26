import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

// ========================================================
// Konten intro. Ubah teks di sini.
// ========================================================
const NAME = 'Farhan Izdiyad';
const SUB = 'Portfolio · 2026';

// power4.out GSAP ≡ cubic-bezier(0.165, 0.84, 0.44, 1)
const POWER4_OUT = [0.165, 0.84, 0.44, 1] as const;

// Tempo
const REVEAL_DUR = 1.2;    // durasi mask-reveal tiap huruf (detik)
const STAGGER = 0.045;     // jeda antar huruf
const SUB_DELAY = 0.9;     // sub-teks muncul
const LINE_DELAY = 1.05;   // garis aksen mulai
const HOLD_MS = 700;       // diam setelah elemen masuk semua
const EXIT_DUR = 1.2;      // durasi slide-up exit

const LETTERS = NAME.split('');

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'in' | 'exit' | 'done'>('in');

  useEffect(() => {
    if (!isVisible) return;

    const inEnd = (0.1 + LETTERS.length * STAGGER + REVEAL_DUR * 0.6) * 1000;

    const t1 = setTimeout(() => setPhase('exit'), inEnd + HOLD_MS);
    const t2 = setTimeout(
      () => {
        setPhase('done');
        onComplete();
      },
      inEnd + HOLD_MS + EXIT_DUR * 1000,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible, onComplete]);

  if (phase === 'done') return null;

  const letterVariants = {
    hidden: { y: '110%' },
    visible: (i: number) => ({
      y: '0%',
      transition: {
        delay: 0.1 + i * STAGGER,
        duration: REVEAL_DUR,
        ease: POWER4_OUT,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={false}
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: EXIT_DUR, ease: POWER4_OUT }}
          className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col items-center justify-center px-6 overflow-hidden select-none"
        >
          {/* Wordmark serif — mask reveal per huruf */}
          <h1
            aria-label={NAME}
            className="font-['Playfair_Display'] text-white font-semibold tracking-tight leading-[1] text-center text-5xl sm:text-7xl md:text-8xl flex"
          >
            {LETTERS.map((ch, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden"
                style={{ marginRight: ch === ' ' ? '0.22em' : undefined }}
              >
                <motion.span
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block will-change-transform"
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Garis aksen tipis di bawah wordmark — draw kiri ke kanan */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: LINE_DELAY, duration: 1.0, ease: POWER4_OUT }}
            className="mt-8 block w-24 h-px bg-white/40 origin-left"
          />

          {/* Sub-teks — fade + translateY halus */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: SUB_DELAY, duration: 1.0, ease: POWER4_OUT }}
            className="mt-5 font-['Quicksand'] text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/60"
          >
            {SUB}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
