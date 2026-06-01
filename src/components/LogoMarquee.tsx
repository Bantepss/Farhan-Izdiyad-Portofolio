import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiC,
  SiTailwindcss,
  SiFigma,
  SiFramer,
  SiArduino,
  SiEspressif,
  SiGit,
  SiVite,
} from 'react-icons/si';

interface TechLogo {
  name: string;
  Icon: IconType;
}

// Selaras dengan "Tech Arsenal" di section About.
const techLogos: TechLogo[] = [
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Python', Icon: SiPython },
  { name: 'C', Icon: SiC },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Framer Motion', Icon: SiFramer },
  { name: 'Figma', Icon: SiFigma },
  { name: 'Arduino', Icon: SiArduino },
  { name: 'ESP32', Icon: SiEspressif },
  { name: 'Git', Icon: SiGit },
  { name: 'Vite', Icon: SiVite },
];

/**
 * Marquee infinite-scroll menggunakan Framer Motion.
 * Dua salinan identik — animasi translateX dari 0 ke -50% agar looping mulus.
 * Hover → pause. Tepi kiri/kanan di-fade memakai mask gradient.
 */
export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  // Measure the width of one set of logos so we know how far to translate
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden py-4"
    >
      <motion.div
        ref={trackRef}
        className="flex w-max"
        animate={
          trackWidth > 0
            ? { x: [0, -trackWidth] }
            : undefined
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          },
        }}
        whileHover="paused"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-10 sm:gap-16 pr-10 sm:pr-16"
            aria-hidden={dup === 1}
          >
            {techLogos.map(({ name, Icon }) => (
              <li
                key={`${dup}-${name}`}
                className="flex shrink-0 items-center gap-3 text-ink-subtle hover:text-accent"
                title={name}
                style={{ transition: 'color 0.3s' }}
              >
                <Icon className="text-3xl sm:text-4xl" />
                <span className="font-ui text-sm font-semibold tracking-wide whitespace-nowrap">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}
