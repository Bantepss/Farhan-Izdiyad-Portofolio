import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { LoadingScreen } from '../components/LoadingScreen';

export function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate system boot
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} isVisible={loading} />
      
      {!loading && (
        <div className="min-h-screen flex flex-col relative z-10">
          <Navbar />
          <main className="flex-grow pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
          
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
