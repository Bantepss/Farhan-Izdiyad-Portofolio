import { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Shooting Stars – spawns a random streak every 4-8s (max 3 active) */
/* ------------------------------------------------------------------ */

interface Star {
  id: number;
  x: number;      // % from left
  y: number;      // % from top (within top 30%)
  angle: number;  // degrees 15-75
}

let _starId = 0;

function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  const spawn = useCallback(() => {
    setStars((prev) => {
      if (prev.length >= 3) return prev;
      const id = ++_starId;
      return [
        ...prev,
        {
          id,
          x: Math.random() * 90 + 5,          // 5-95%
          y: Math.random() * 30,               // 0-30%
          angle: Math.random() * 60 + 15,      // 15-75°
        },
      ];
    });
  }, []);

  /* Remove a star after its animation ends (1.8s) */
  const remove = useCallback((id: number) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    const tick = () => {
      spawn();
      const next = 4000 + Math.random() * 4000; // 4-8s
      timer = window.setTimeout(tick, next);
    };
    let timer = window.setTimeout(tick, 2000); // first one after 2s
    return () => clearTimeout(timer);
  }, [spawn]);

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          onAnimationEnd={() => remove(s.id)}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `rotate(${s.angle}deg)`,
          }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Background FX                                                */
/* ------------------------------------------------------------------ */

export function BackgroundFX() {
  /* ---------- Starfield (generated once) ---------- */
  const starDots = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1-3px
      duration: `${Math.random() * 4 + 2}s`, // 2-6s
      delay: `${Math.random() * 6}s`,
    }));
  }, []);

  /* ---------- Scroll-driven parallax ---------- */
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, (v) => v * 0.05);
  const blob2Y = useTransform(scrollY, (v) => v * -0.03);
  const blob3Y = useTransform(scrollY, (v) => v * 0.04);

  return (
    <div aria-hidden className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">

      {/* ============ 1. GRID LAYER (kept exactly as-is) ============ */}
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

      {/* ============ 2. STARFIELD LAYER ============ */}
      <div className="fixed inset-0">
        {starDots.map((star) => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              opacity: 0.4,
              animation: `star-twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
              willChange: 'opacity, transform',
            }}
          />
        ))}
      </div>

      {/* ============ 3. NEBULA CLOUD LAYER ============ */}
      {/* Nebula 1 – top-right, warm glow-1 */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-10%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 40% 40%, var(--glow-1), var(--glow-2) 50%, transparent 72%)',
          filter: 'blur(120px)',
          opacity: 0.10,
          animation: 'nebula-drift 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Nebula 2 – left-center */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '-15%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 55% 55%, var(--glow-3), var(--glow-1) 55%, transparent 75%)',
          filter: 'blur(140px)',
          opacity: 0.08,
          animation: 'nebula-drift 25s ease-in-out infinite',
          animationDelay: '-8s',
          willChange: 'transform',
        }}
      />
      {/* Nebula 3 – bottom-center */}
      <div
        style={{
          position: 'absolute',
          bottom: '-8%',
          left: '30%',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, var(--glow-2), var(--glow-3) 45%, transparent 70%)',
          filter: 'blur(130px)',
          opacity: 0.07,
          animation: 'nebula-drift 18s ease-in-out infinite',
          animationDelay: '-4s',
          willChange: 'transform',
        }}
      />

      {/* ============ 4. PARALLAX GLOW BLOBS (enhanced existing) ============ */}
      {/* Glow 1 – top-right */}
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
          y: blob1Y,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow 2 – left-center */}
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
          y: blob2Y,
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Glow 3 – bottom */}
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
          y: blob3Y,
        }}
        animate={{ scale: [1, 1.09, 1], opacity: [0.04, 0.10, 0.04] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* ============ 5. SHOOTING STARS ============ */}
      <ShootingStars />
    </div>
  );
}
