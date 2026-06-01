import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { LoadingScreen } from '../components/LoadingScreen';
import { Footer } from '../components/Footer';
import { BackgroundFX } from '../components/BackgroundFX';
import { CometField } from '../components/CometField';
import { CursorGlow } from '../components/CursorGlow';
import Lenis from 'lenis';

// intro  : wordmark intro tampil (home belum mount)
// reveal : home + komet mount; komet melesat masuk di ATAS overlay intro yang memudar
// warp   : short warp-in transition — content scales & deblurs into place
// done   : overlay intro dilepas; tampilan normal
type Phase = 'intro' | 'reveal' | 'warp' | 'done';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const contentRef = useRef<HTMLDivElement>(null);

  // Pengaman: setelah warp ('done'), pastikan tak ada sisa transform/filter di
  // wrapper. Nilai transform/filter sekecil apa pun membuat containing-block,
  // yang membuat overlay `fixed` di dalam konten (modal Experience/Projects)
  // salah posisi saat halaman sudah di-scroll. Warp kini hanya scale+opacity,
  // jadi ini murni jaring pengaman. rAF agar jalan setelah frame Framer terakhir.
  useEffect(() => {
    if (phase !== 'done') return;
    const el = contentRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.style.filter = 'none';
      el.style.transform = 'none';
      el.style.willChange = 'auto';
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2, // Sedikit lebih cepat agar terasa responsif seperti SaaS
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Dipicu saat wordmark intro selesai: mulai transisi komet (reveal),
  // lalu warp-in konten, lalu lepas overlay intro.
  const handleIntroComplete = useCallback(() => {
    setPhase('reveal');
    setTimeout(() => setPhase('warp'), 1000);
    setTimeout(() => setPhase('done'), 1600);
  }, []);

  return (
    <>
      {(phase === 'intro' || phase === 'reveal') && (
        <LoadingScreen onComplete={handleIntroComplete} fading={phase === 'reveal'} />
      )}

      {phase !== 'intro' && (
        <>
          <BackgroundFX />
          <CometField />
          <CursorGlow />
          {/* Navbar di LUAR wrapper beranimasi: wrapper menyisakan filter/transform
              yang membuat containing-block, sehingga elemen `fixed` di dalamnya ikut
              ter-scroll. Di luar → navbar benar-benar fixed ke viewport. */}
          <Navbar />
          <motion.div
            ref={contentRef}
            className="min-h-screen flex flex-col relative z-10"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={
              phase === 'warp' || phase === 'done'
                ? { scale: 1, opacity: 1 }
                : { scale: 1.05, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <main className="flex-grow pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
              {children}
            </main>
            <Footer />
          </motion.div>
        </>
      )}
    </>
  );
}
