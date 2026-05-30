import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { LoadingScreen } from '../components/LoadingScreen';
import { Footer } from '../components/Footer';
import { BackgroundFX } from '../components/BackgroundFX';
import { CometField } from '../components/CometField';
import Lenis from 'lenis';

// intro  : wordmark intro tampil (home belum mount)
// reveal : home + komet mount; komet melesat masuk di ATAS overlay intro yang memudar
// done   : overlay intro dilepas; tampilan normal
type Phase = 'intro' | 'reveal' | 'done';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('intro');

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
  // lalu lepas overlay intro setelah memudar.
  const handleIntroComplete = useCallback(() => {
    setPhase('reveal');
    setTimeout(() => setPhase('done'), 1200);
  }, []);

  return (
    <>
      {phase !== 'done' && <LoadingScreen onComplete={handleIntroComplete} fading={phase === 'reveal'} />}

      {phase !== 'intro' && (
        <>
          <BackgroundFX />
          <CometField />
          <div className="min-h-screen flex flex-col relative z-10">
            <Navbar />
            <main className="flex-grow pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
              {children}
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
