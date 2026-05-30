export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface/70 backdrop-blur-sm border-t border-line mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Bagian Kiri: Text */}
        <div className="flex flex-col items-center md:items-start text-xs sm:text-sm text-ink-subtle font-medium">
          <span className="font-brand font-semibold tracking-wide mb-1 text-accent">FARHAN IZDIYAD</span>
          <span>
            © {currentYear} All rights reserved.
          </span>
        </div>

        {/* Bagian Kanan: Link kecil */}
        <div className="flex items-center gap-6 text-sm text-ink-subtle font-medium">
          <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
        </div>

      </div>
    </footer>
  );
}
