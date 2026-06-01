import { motion } from 'framer-motion';
import ThermodynamicGrid from '../components/ui/interactive-thermodynamic-grid';

/**
 * Section interaktif "Playground" — sengaja bertema gelap (magma) terlepas dari
 * light/dark mode situs, sebagai showcase canvas interaktif. Grid termal mengisi
 * background; teks di atasnya dibuat pointer-events-none agar seluruh area bisa
 * "dipanaskan" oleh kursor.
 */
export function Playground() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="relative w-full min-h-[78vh] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
        {/* Background: interactive thermodynamic grid */}
        <ThermodynamicGrid resolution={14} coolingFactor={0.97} />

        {/* Vignette agar teks tetap terbaca di tepi */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.65) 100%)' }}
        />

        {/* Overlay konten — pointer-events-none supaya kursor sampai ke grid */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[78vh] px-6 pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="font-ui mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Interactive
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Heat It Up
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/55"
          >
            Move your cursor across the grid to leave a glowing trail of heat — a
            little real-time thermodynamics toy built on a single HTML canvas.
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-ui mt-10 text-[11px] uppercase tracking-[0.3em] text-white/35"
          >
            ↖ Drag your cursor here
          </motion.span>
        </div>
      </div>
    </div>
  );
}
