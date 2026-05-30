import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVite,
  SiFigma,
  SiNodedotjs,
  SiGit,
} from 'react-icons/si';

interface CometDef {
  Icon: IconType;
  color: string;
  iconColor?: string;
  /** Posisi tetap (fraksi lebar/tinggi viewport) — tersebar di seluruh layar */
  bx: number;
  by: number;
  size: number;
  /** Durasi 1 siklus mengambang (detik) */
  floatDur: number;
  floatDelay: number;
  /** Urutan masuk saat intro */
  introDelay: number;
}

// Tersebar lebar di seluruh viewport (di belakang konten saat idle).
const comets: CometDef[] = [
  { Icon: SiReact, color: '#61DAFB', bx: 0.10, by: 0.18, size: 64, floatDur: 8.5, floatDelay: 0.0, introDelay: 0.0 },
  { Icon: SiTypescript, color: '#3178C6', bx: 0.88, by: 0.20, size: 56, floatDur: 10, floatDelay: 0.8, introDelay: 0.1 },
  { Icon: SiJavascript, color: '#F7DF1E', iconColor: '#15151a', bx: 0.07, by: 0.54, size: 50, floatDur: 9, floatDelay: 1.4, introDelay: 0.2 },
  { Icon: SiTailwindcss, color: '#22B7E6', bx: 0.91, by: 0.49, size: 58, floatDur: 11, floatDelay: 0.4, introDelay: 0.3 },
  { Icon: SiVite, color: '#7C82FF', bx: 0.15, by: 0.82, size: 54, floatDur: 9.5, floatDelay: 1.1, introDelay: 0.4 },
  { Icon: SiFigma, color: '#A259FF', bx: 0.86, by: 0.80, size: 50, floatDur: 8, floatDelay: 1.8, introDelay: 0.5 },
  { Icon: SiNodedotjs, color: '#5FA04E', bx: 0.31, by: 0.32, size: 46, floatDur: 10.5, floatDelay: 2.2, introDelay: 0.6 },
  { Icon: SiGit, color: '#F05032', bx: 0.69, by: 0.66, size: 44, floatDur: 9.8, floatDelay: 2.6, introDelay: 0.7 },
];

interface FieldCometProps {
  def: CometDef;
  vw: number;
  vh: number;
  smoothVel: MotionValue<number>;
}

function FieldComet({ def, vw, vh, smoothVel }: FieldCometProps) {
  const { Icon, color, iconColor = '#FFFFFF', bx, by, size, floatDur, floatDelay, introDelay } = def;

  // Geser TERBATAS searah scroll lalu balik (tidak hilang, bukan hujan).
  const yOffset = useTransform(smoothVel, (v) => Math.max(-130, Math.min(130, v * 0.05)));
  // Ekor komet saat scroll: panjang & arah sesuai kecepatan/arah scroll.
  const tailScale = useTransform(smoothVel, (v) => 1 + Math.min(Math.abs(v) / 300, 9));
  const tailOpacity = useTransform(smoothVel, (v) => Math.min(Math.abs(v) / 700, 0.85));
  const tailFlip = useTransform(smoothVel, (v) => (v < -10 ? 180 : 0));

  const left = bx * vw - size / 2;
  const top = by * vh - size / 2;
  // Semua mulai dari luar tepi KIRI (≈ -260px) lalu melintas ke kanan menuju posisinya.
  const introStartX = -260 - left;

  return (
    <motion.div
      style={{ position: 'absolute', left, top, width: size, height: size }}
      initial={{ x: introStartX, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: introDelay, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Offset komet saat scroll (balik ke 0 saat berhenti) */}
      <motion.div style={{ y: yOffset }} className="relative w-full h-full">
        {/* Mengambang sendiri (idle float: x, y, rotate) */}
        <motion.div
          animate={{ x: [0, 9, 0, -9, 0], y: [0, -14, 0, 11, 0], rotate: [0, 4, 0, -4, 0] }}
          transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
          className="relative w-full h-full will-change-transform"
        >
          {/* Ekor INTRO — horizontal, menjuntai ke kiri (komet melintas ke kanan) */}
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              right: '50%',
              top: '25%',
              width: size * 1.8,
              height: size * 0.5,
              transformOrigin: 'right center',
              background: `linear-gradient(to left, ${color}, transparent)`,
            }}
            className="rounded-full blur-md"
            initial={{ scaleX: 18, opacity: 0.9 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ delay: introDelay, duration: 1.15, ease: 'easeOut' }}
          />
          {/* Ekor SCROLL — vertikal, mengikuti kecepatan & arah scroll */}
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              left: '25%',
              bottom: '50%',
              width: size * 0.5,
              height: size * 1.7,
              scaleY: tailScale,
              opacity: tailOpacity,
              rotate: tailFlip,
              transformOrigin: 'bottom center',
              background: `linear-gradient(to top, transparent, ${color})`,
            }}
            className="rounded-full blur-md"
          />
          {/* Tile app glossy */}
          <div
            style={{
              background: `linear-gradient(150deg, ${color} 0%, color-mix(in srgb, ${color} 42%, #05070d) 100%)`,
              boxShadow: `0 14px 34px -8px ${color}, 0 4px 12px rgba(0,0,0,0.45)`,
            }}
            className="absolute inset-0 rounded-2xl grid place-items-center rotate-6 ring-1 ring-white/25 overflow-hidden"
          >
            <span className="absolute inset-x-1.5 top-1.5 h-1/3 rounded-t-xl bg-white/25 blur-[2px]" />
            <Icon
              style={{ fontSize: size * 0.5, color: iconColor, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.45))' }}
              className="relative z-10"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Logo web tersebar di seluruh viewport.
 * - INTRO: semua logo melintas dari KIRI ke KANAN di DEPAN konten (z-30) seperti
 *   komet, lalu mendarat menyebar di posisinya. Setelah itu turun ke BELAKANG
 *   konten (z-0) agar tidak mengganggu.
 * - IDLE: tiap logo mengambang sendiri (drift x/y + rotate).
 * - SCROLL: meluncur terbatas + ekor mengikuti arah scroll (tidak hilang/hujan).
 */
export function CometField() {
  const [dim, setDim] = useState(() => ({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1440,
    vh: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));
  // Saat intro berlangsung → di depan konten; setelah mendarat → di belakang.
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const onResize = () => setDim({ vw: window.innerWidth, vh: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    // Intro terakhir mendarat ≈ introDelay max (0.7) + durasi (1.15) ≈ 1.85s.
    const t = setTimeout(() => setIntroDone(true), 1900);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVel = useSpring(velocity, { stiffness: 90, damping: 18, mass: 0.6 });

  return (
    <div
      aria-hidden
      className={`hidden lg:block fixed inset-0 overflow-hidden pointer-events-none ${introDone ? 'z-0' : 'z-[110]'}`}
    >
      {comets.map((c, i) => (
        <FieldComet key={i} def={c} vw={dim.vw} vh={dim.vh} smoothVel={smoothVel} />
      ))}
    </div>
  );
}
