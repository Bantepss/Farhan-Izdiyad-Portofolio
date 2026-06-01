import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';

// ----------------------------------------------------
// ORBIT ANIMATION (Galaxy/Comet Orbit System)
// ----------------------------------------------------
class OrbitStar {
  angle: number;
  radius: number;
  speed: number;
  yOffset: number;
  size: number;
  color: string;
  
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  
  introDelay: number = 0;
  currentEase: number = 0;
  
  constructor() {
    this.angle = Math.random() * Math.PI * 2;
    // Inner radius 160 to avoid text, max radius based on screen to cover corners
    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.2;
    this.radius = 160 + Math.pow(Math.random(), 1.5) * maxRadius;
    
    // Slower Kepler-like speed: closer = faster
    this.speed = (Math.random() * 0.004 + 0.001) * (200 / this.radius);
    // 90% go same direction, 10% retrograde
    if (Math.random() > 0.9) this.speed *= -1; 

    // Elliptical thickness (tighter in the center, wider at edges)
    this.yOffset = (Math.random() - 0.5) * (this.radius * 0.25); 
    this.size = Math.random() * 1.5 + 0.5;

    // Stagger entrance delay based on radius (center forms first, sweeps outward)
    const normalizedRadius = (this.radius - 160) / maxRadius;
    this.introDelay = normalizedRadius * 1500 + Math.random() * 600;

    const colors = ['#4F8DF0', '#61DAFB', '#FFFFFF', '#7C82FF', '#22B7E6'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  explode() {
    // Explode outward with high speed
    const speed = 25 + Math.random() * 45;
    const dist = Math.sqrt(this.x * this.x + this.y * this.y);
    if (dist > 0) {
      this.vx = (this.x / dist) * speed + (Math.random() - 0.5) * 10;
      this.vy = (this.y / dist) * speed + (Math.random() - 0.5) * 10;
    }
  }

  update(isFading: boolean, timeElapsed: number) {
    if (isFading) {
      this.x += this.vx;
      this.y += this.vy;
      this.currentEase = 1;
    } else {
      // Intro Formation Animation
      const starElapsed = Math.max(0, timeElapsed - this.introDelay);
      const introProgress = Math.min(starElapsed / 2200, 1.0); // 2.2s to form
      
      // Premium Expo Ease-Out
      const ease = introProgress === 1 ? 1 : 1 - Math.pow(2, -10 * introProgress);
      this.currentEase = ease;

      this.angle -= this.speed;
      
      // Add a dramatic extra vortex spin during formation
      const introSpin = (1 - ease) * Math.PI * 6; // 3 extra rotations
      const currentAngle = this.angle + introSpin * Math.sign(this.speed);
      
      // Scale radius outward from center
      const currentRadius = this.radius * ease;

      const flatX = Math.cos(currentAngle) * currentRadius;
      const flatZ = Math.sin(currentAngle) * currentRadius;
      
      // Tilt the galaxy by ~40 degrees to give 3D depth
      const tilt = Math.PI * 0.22;
      this.x = flatX;
      // Start perfectly flat and expand to 3D thickness
      this.y = (flatZ * Math.cos(tilt)) + (this.yOffset * ease);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.currentEase === 0) return; // Don't draw if hasn't started forming

    ctx.globalAlpha = this.currentEase;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.currentEase, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

class GalaxySystem {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stars: OrbitStar[] = [];
  width: number = 0;
  height: number = 0;
  isFading: boolean = false;
  rafId: number = 0;
  startTime: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.startTime = Date.now();
    this.resize();
    this.initStars();
    this.render = this.render.bind(this);
    this.rafId = requestAnimationFrame(this.render);
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  initStars() {
    this.stars = [];
    const numStars = window.innerWidth < 768 ? 800 : 2000;
    for (let i = 0; i < numStars; i++) {
      this.stars.push(new OrbitStar());
    }
  }

  triggerScatter() {
    this.isFading = true;
    for (const star of this.stars) {
      star.explode();
    }
  }

  render() {
    // Trails effect
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgba(6, 9, 16, 0.25)'; // Blend with #060910
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.save(); // Save DPR scale state
    this.ctx.translate(this.width / 2, this.height / 2);

    const timeElapsed = Date.now() - this.startTime;

    for (const star of this.stars) {
      star.update(this.isFading, timeElapsed);
      star.draw(this.ctx);
    }

    this.ctx.restore(); // Restore back to original DPR scale
    this.rafId = requestAnimationFrame(this.render);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
  }
}

function OrbitAnimation({ fading }: { fading: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galaxyRef = useRef<GalaxySystem | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    galaxyRef.current = new GalaxySystem(canvasRef.current);

    const handleResize = () => {
      galaxyRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      galaxyRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (fading && galaxyRef.current) {
      galaxyRef.current.triggerScatter();
    }
  }, [fading]);

  return (
    <div className="relative w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

// ----------------------------------------------------
// COMBINED LOADING SCREEN (Wordmark + Orbit + Comet Burst)
// ----------------------------------------------------

interface LoadingScreenProps {
  onComplete: () => void;
  fading: boolean;
}

const NAME = 'Farhan Izdiyad';
const SUB = 'Portfolio · 2026';
const POWER4_OUT = [0.165, 0.84, 0.44, 1] as const;

const REVEAL_DUR = 1.2;
const STAGGER = 0.045;
const SUB_DELAY = 0.9;
const LINE_DELAY = 1.05;
const LETTERS = NAME.split('');

function generateBurstComets(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + (Math.random() * 20 - 10),
    length: 150 + Math.random() * 250,
    delay: Math.random() * 0.1,
    duration: 0.5 + Math.random() * 0.3,
  }));
}

function generateWarpLines(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i,
    width: 60 + Math.random() * 140,
    delay: Math.random() * 0.1,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

export function LoadingScreen({ onComplete, fading }: LoadingScreenProps) {
  const [startVisible, setStartVisible] = useState(false);
  const burstComets = useMemo(() => generateBurstComets(16), []);
  const warpLines = useMemo(() => generateWarpLines(24), []);

  useEffect(() => {
    // Reveal the Enter button after wordmark finishes animating
    const inEnd = (0.1 + LETTERS.length * STAGGER + REVEAL_DUR * 0.6) * 1000;
    const timer = setTimeout(() => {
      setStartVisible(true);
    }, inEnd + 400);

    return () => clearTimeout(timer);
  }, []);

  const letterVariants = {
    hidden: { y: '110%' },
    visible: (i: number) => ({
      y: '0%',
      transition: {
        delay: 0.1 + i * STAGGER,
        duration: REVEAL_DUR,
        ease: POWER4_OUT,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 1.0, ease: POWER4_OUT }}
      style={{ pointerEvents: fading ? 'none' : 'auto' }}
      className="fixed inset-0 z-[100] w-full h-full overflow-hidden bg-[#060910] select-none"
    >
      {/* 3D Orbit Galaxy Background Overlay */}
      <div className="absolute inset-0 opacity-80">
        <OrbitAnimation fading={fading} />
      </div>

      {/* Comet Burst (fires when clicking Enter / fading starts) */}
      {fading && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {burstComets.map((comet) => (
            <motion.div
              key={comet.id}
              className="absolute top-1/2 left-1/2"
              style={{
                width: comet.length,
                height: 2,
                transformOrigin: 'left center',
                rotate: comet.angle,
                marginTop: -1,
                marginLeft: 0,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0.8, 0], x: comet.length * 0.5 }}
              transition={{
                duration: comet.duration,
                delay: comet.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="w-full h-full rounded-full blur-[1px]"
                style={{
                  background: 'linear-gradient(90deg, var(--accent, #4F8DF0), white, transparent)',
                  boxShadow: '0 0 8px 2px var(--accent, #4F8DF0)',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Warp Lines (fires when fading starts) */}
      {fading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {warpLines.map((line) => (
            <motion.div
              key={line.id}
              className="absolute top-1/2 left-1/2"
              style={{
                width: line.width,
                height: 1,
                transformOrigin: 'left center',
                rotate: line.angle,
                marginTop: -0.5,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, line.opacity, 0] }}
              transition={{
                duration: 0.8,
                delay: 0.1 + line.delay,
                ease: 'easeOut',
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,0.6), rgba(79,141,240,${line.opacity}), transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Foreground Overlay (Wordmark + Button) */}
      <motion.div
        animate={{
          opacity: fading ? 0 : 1,
          scale: fading ? 1.5 : 1,
          filter: fading ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ duration: 1.0, ease: POWER4_OUT }}
        className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
      >
        {/* Wordmark with glow flare */}
        <h1
          aria-label={NAME}
          className="font-['Playfair_Display'] text-white font-semibold tracking-tight leading-[1] text-center text-5xl sm:text-7xl md:text-8xl flex pointer-events-auto"
        >
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ marginRight: ch === ' ' ? '0.22em' : undefined }}
            >
              <motion.span
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block will-change-transform"
                style={{
                  animation: `letter-flare 1.2s ease-out ${0.1 + i * STAGGER + REVEAL_DUR * 0.5}s forwards`,
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Accent line */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: LINE_DELAY, duration: 1.0, ease: POWER4_OUT }}
          className="mt-8 block w-24 h-px origin-left pointer-events-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent, #4F8DF0), transparent)',
            boxShadow: '0 0 8px 1px var(--accent, #4F8DF0)',
          }}
        />

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ delay: SUB_DELAY, duration: 1.0, ease: POWER4_OUT }}
          className="mt-5 font-['Quicksand'] text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/60 pointer-events-auto"
        >
          {SUB}
        </motion.p>

        {/* Enter Button */}
        <div
          className={`
            mt-12 transition-all duration-1500 ease-out pointer-events-auto
            ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <button
            onClick={onComplete}
            className="
              px-8 py-3 rounded-full border border-white/20 bg-black/30 backdrop-blur-md
              text-white text-sm tracking-[0.2em] uppercase font-semibold
              transition-all duration-500
              hover:bg-[#4F8DF0]/20 hover:border-[#4F8DF0] hover:shadow-[0_0_20px_rgba(79,141,240,0.5)]
              hover:tracking-[0.3em] hover:scale-105
            "
          >
            Enter Universe
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
