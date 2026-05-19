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
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Expose lenis globally so components like Navbar can use its scrollTo
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
          
          {/* Futuristic grid background overlay */}
          <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
               style={{
                 backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)`,
                 backgroundSize: '40px 40px'
               }}
          />
        </div>
      )}
    </>
  );
}
