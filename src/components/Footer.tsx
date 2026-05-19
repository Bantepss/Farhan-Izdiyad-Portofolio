export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Bagian Kiri: Text */}
        <div className="flex flex-col items-center md:items-start text-xs sm:text-sm text-slate-500 font-medium">
          <span className="tracking-wide mb-1 text-[#135CC5]">FARHAN IZDIYAD</span>
          <span>
            © {currentYear} All rights reserved.
          </span>
        </div>

        {/* Bagian Kanan: Link kecil */}
        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
          <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#0F172A] transition-colors">Terms of Service</a>
        </div>

      </div>
    </footer>
  );
}
