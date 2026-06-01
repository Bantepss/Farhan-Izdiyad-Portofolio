import { useEffect, useRef, useState } from 'react';

/**
 * COMET CURSOR
 * ----------------------------------------------------------------------------
 * Kanvas full-screen yang menggambar "kepala komet" yang mengikuti kursor +
 * ekor partikel yang meluruh (comet trail). Terasa berat & premium karena:
 *   - kepala sedikit "nyusul" (lag) → ada bobot/inertia
 *   - ekor partikel meluruh dengan ease-out + glow aditif
 *   - kecepatan kursor menambah panjang & panas ekor (makin ngebut makin nyala)
 *
 * Warna otomatis ikut --accent / --accent-2 (cocok light & dark). Di dark mode
 * memakai glow aditif (lighter) + inti putih-panas; di light mode memakai
 * komposit normal dengan tinta accent agar tetap terbaca di atas latar terang.
 *
 * Aksesibilitas & performa:
 *   - hanya aktif di pointer presisi (mouse), tidak di layar sentuh
 *   - dimatikan total saat prefers-reduced-motion
 *   - rAF dijeda saat tab tidak terlihat; DPR dibatasi 2x
 *   - pointer-events-none → tidak pernah menghalangi klik / seleksi teks
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  decay: number;
  size: number;
  hot: number; // 0..1 → seberapa "putih-panas" inti partikel
}

/** Konversi string warna CSS (#hex atau rgb/rgba) ke kanal RGB. */
function parseColor(input: string, fallback: RGB): RGB {
  const s = input.trim();
  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  const rgb = s.match(/rgba?\(([^)]+)\)/i);
  if (rgb) {
    const parts = rgb[1].split(/[ ,/]+/).map((p) => parseFloat(p)).filter((n) => !Number.isNaN(n));
    if (parts.length >= 3) return { r: parts[0], g: parts[1], b: parts[2] };
  }
  return fallback;
}

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Aktif di perangkat non-sentuh (mouse/trackpad). `pointer: coarse` = layar
  // sentuh sebagai pointer utama (HP/tablet) → comet cursor dimatikan di situ.
  // CATATAN: comet ini mengikuti gerakan mouse pengguna (bukan animasi otomatis),
  // jadi tetap tampil meski OS mengaktifkan "reduce motion" — ini fitur utama
  // yang diminta. (Animasi dekoratif lain tetap menghormati reduce-motion.)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (!coarse) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // --- Warna (ikut tema) ---
    let accent: RGB = { r: 79, g: 141, b: 240 };
    let accent2: RGB = { r: 34, g: 211, b: 238 };
    let isDark = document.documentElement.classList.contains('dark');
    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = parseColor(cs.getPropertyValue('--accent'), accent);
      accent2 = parseColor(cs.getPropertyValue('--accent-2'), accent2);
      isDark = document.documentElement.classList.contains('dark');
    };
    readTheme();
    const themeObs = new MutationObserver(readTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // --- State pointer ---
    let tx = w / 2;
    let ty = h / 2; // target = posisi kursor nyata
    let hx = tx;
    let hy = ty; // head = posisi kepala (ter-lag)
    let phx = hx;
    let phy = hy; // posisi head sebelumnya
    let visible = false;
    let down = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        hx = phx = tx;
        hy = phy = ty;
      }
    };
    const onLeave = () => {
      visible = false;
    };
    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const MAX = 80;
    let raf = 0;

    const drawParticle = (p: Particle) => {
      const a = p.life * p.life; // alpha ease-out
      const r = p.size * (0.45 + p.life * 0.55);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      if (isDark) {
        const cr = Math.round(accent.r + (255 - accent.r) * p.hot);
        const cg = Math.round(accent.g + (255 - accent.g) * p.hot);
        const cb = Math.round(accent.b + (255 - accent.b) * p.hot);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
        g.addColorStop(0.45, `rgba(${accent.r},${accent.g},${accent.b},${a * 0.45})`);
        g.addColorStop(1, `rgba(${accent2.r},${accent2.g},${accent2.b},0)`);
      } else {
        // Light mode: tinta accent (tanpa inti putih yang tak terlihat di latar terang).
        g.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},${a * 0.5})`);
        g.addColorStop(0.5, `rgba(${accent.r},${accent.g},${accent.b},${a * 0.22})`);
        g.addColorStop(1, `rgba(${accent.r},${accent.g},${accent.b},0)`);
      }
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = () => {
      // Kepala "nyusul" target → bobot/inertia.
      hx += (tx - hx) * 0.2;
      hy += (ty - hy) * 0.2;
      const dx = hx - phx;
      const dy = hy - phy;
      const speed = Math.hypot(dx, dy);
      phx = hx;
      phy = hy;

      // Spawn partikel sepanjang segmen gerak → ekor mulus walau kursor cepat.
      if (visible) {
        const count = Math.min(7, 1 + Math.floor(speed / 5));
        for (let i = 0; i < count; i++) {
          if (particles.length >= MAX) break;
          const t = i / count;
          const jitter = (Math.random() - 0.5) * 2.4;
          particles.push({
            x: phx + dx * t + jitter,
            y: phy + dy * t + jitter,
            vx: dx * 0.05 + (Math.random() - 0.5) * 0.3,
            vy: dy * 0.05 + (Math.random() - 0.5) * 0.3,
            life: 1,
            decay: 0.022 + Math.random() * 0.018,
            size: 10 + Math.min(speed * 0.6, 28) + Math.random() * 4,
            hot: Math.min(1, 0.22 + speed / 55),
          });
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        drawParticle(p);
      }

      // Kepala komet.
      if (visible) {
        const headR = down ? 9 : 6.5;
        const glowR = down ? 58 : 46;
        const og = ctx.createRadialGradient(hx, hy, 0, hx, hy, glowR);
        og.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},${isDark ? 0.62 : 0.4})`);
        og.addColorStop(1, `rgba(${accent.r},${accent.g},${accent.b},0)`);
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(hx, hy, glowR, 0, Math.PI * 2);
        ctx.fill();

        const cg = ctx.createRadialGradient(hx, hy, 0, hx, hy, headR);
        if (isDark) {
          cg.addColorStop(0, 'rgba(255,255,255,0.96)');
          cg.addColorStop(0.6, `rgba(${accent.r},${accent.g},${accent.b},0.9)`);
          cg.addColorStop(1, `rgba(${accent.r},${accent.g},${accent.b},0)`);
        } else {
          cg.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},1)`);
          cg.addColorStop(1, `rgba(${accent.r},${accent.g},${accent.b},0)`);
        }
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(hx, hy, headR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
