import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface SectionRevealProps {
  children: React.ReactNode;
  /** Additional className for the wrapper */
  className?: string;
}

/**
 * Wraps a section with a Penderecki-style scroll-driven reveal:
 * - Scale 0.96 → 1 + opacity 0 → 1
 * - Horizontal light streak shoots across the top on first entry
 * - Subtle glow pulse on first reveal
 */
export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const [hasRevealed, setHasRevealed] = useState(false);
  const [showStreak, setShowStreak] = useState(false);

  useEffect(() => {
    if (isInView && !hasRevealed) {
      setHasRevealed(true);
      setShowStreak(true);
      // Remove streak after animation completes
      const t = setTimeout(() => setShowStreak(false), 1200);
      return () => clearTimeout(t);
    }
  }, [isInView, hasRevealed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative w-full ${className}`}
    >
      {/* Horizontal light streak on first reveal */}
      {showStreak && (
        <div
          className="section-reveal-streak"
          style={{
            animation: 'reveal-streak 1s ease-out forwards',
          }}
        />
      )}

      {/* Subtle top glow pulse on reveal */}
      {hasRevealed && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] rounded-full pointer-events-none z-40"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.6, 0], scaleX: [0, 1, 1.2] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            boxShadow: '0 0 20px 4px var(--accent)',
          }}
        />
      )}

      {children}
    </motion.div>
  );
}
