import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer'; // Jangan lupa import Footer
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
    // Tambahkan background color dasar dan warna teks di sini
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-cyan-500/30">
      <LoadingScreen onComplete={() => setLoading(false)} isVisible={loading} />
      
      {!loading && (
        <div className="min-h-screen flex flex-col relative z-10">
          <Navbar />
          
          {/* flex-grow memastikan main mengambil sisa ruang dan mendorong footer ke bawah */}
          {/* pt-28 agar konten tidak tertutup Navbar */}
          <main className="flex-grow pt-28 pb-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>

          {/* Letakkan Footer di bagian bawah */}
          <Footer />
          
          {/* Futuristic grid background overlay dari kode aslimu */}
          <div className="fixed inset-0 pointer-events-none z-[0] opacity-20"
               style={{
                 backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)`,
                 backgroundSize: '40px 40px'
               }}
          />
        </div>
      )}
    </div>
  );
}