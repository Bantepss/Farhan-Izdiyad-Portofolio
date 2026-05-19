import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LoadingScreen } from '../components/LoadingScreen';
import { Footer } from '../components/Footer';
import Lenis from 'lenis';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2, // Sedikit lebih cepat agar terasa responsif seperti SaaS
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // @ts-ignore
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      // @ts-ignore
      window.lenis = undefined;
    };
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} isVisible={loading} />
      
      {!loading && (
        <div className="min-h-screen flex flex-col relative z-10">
          <Navbar />
          <main className="flex-grow pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
