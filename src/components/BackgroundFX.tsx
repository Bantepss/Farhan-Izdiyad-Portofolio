import { motion } from 'framer-motion';

/**
 * Latar ambient yang meniru efek Figma: "noisy-gradients" (blob glow blur 100px)
 * + "Layer blur" kiri/kanan. Versi ini dibuat ulang dengan palet biru (bukan hijau)
 * memakai CSS radial-gradient agar themeable & otomatis berganti di dark mode.
 *
 * Dipasang fixed di belakang seluruh konten (z-0). Konten utama berada di z-10.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
      {/* Grid halus */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--line) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--line) 60%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 35%, transparent 75%)',
        }}
      />

      {/* Glow utama kanan-atas (noisy-gradients Figma) */}
      <motion.div
        className="fx-glow"
        style={{
          top: '-8%',
          right: '-6%',
          width: '46vw',
          height: '46vw',
          maxWidth: 640,
          maxHeight: 640,
          background:
            'radial-gradient(circle at 30% 30%, var(--glow-1), var(--glow-2) 45%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 1, 1.04, 1], opacity: [0.12, 0.9, 0.28, 1, 0.12] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.78, 1] }}
      />

      {/* Layer blur kiri */}
      <motion.div
        className="fx-glow"
        style={{
          top: '38%',
          left: '-12%',
          width: '40vw',
          height: '40vw',
          maxWidth: 560,
          maxHeight: 560,
          background:
            'radial-gradient(circle at 50% 50%, var(--glow-3), var(--glow-1) 50%, transparent 72%)',
        }}
        animate={{ scale: [1, 1.08, 1, 1.05, 1], opacity: [0.1, 0.85, 0.22, 0.95, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6, times: [0, 0.3, 0.5, 0.85, 1] }}
      />

      {/* Glow bawah, mengiringi section akhir */}
      <motion.div
        className="fx-glow"
        style={{
          bottom: '-10%',
          left: '40%',
          width: '38vw',
          height: '38vw',
          maxWidth: 520,
          maxHeight: 520,
          background:
            'radial-gradient(circle at 50% 50%, var(--glow-2), transparent 70%)',
        }}
        animate={{ scale: [1, 1.07, 1, 1.05, 1], opacity: [0.1, 0.95, 0.25, 0.8, 0.1] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1.1, times: [0, 0.2, 0.55, 0.8, 1] }}
      />
    </div>
  );
}
