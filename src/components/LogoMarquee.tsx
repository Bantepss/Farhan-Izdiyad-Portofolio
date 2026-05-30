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
 * Marquee infinite-scroll (efek namesake file Figma "Infinite Scroll").
 * Dua salinan identik digeser -50% supaya looping mulus. Hover → pause.
 * Tepi kiri/kanan di-fade memakai mask gradient.
 */
export function LogoMarquee() {
  return (
    <div className="marquee-group relative w-full overflow-hidden py-4">
      <div
        className="flex w-max"
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
            className="animate-marquee flex shrink-0 items-center gap-10 sm:gap-16 pr-10 sm:pr-16"
            aria-hidden={dup === 1}
          >
            {techLogos.map(({ name, Icon }) => (
              <li
                key={`${dup}-${name}`}
                className="flex shrink-0 items-center gap-3 text-ink-subtle transition-colors duration-300 hover:text-accent"
                title={name}
              >
                <Icon className="text-3xl sm:text-4xl" />
                <span className="font-ui text-sm font-semibold tracking-wide whitespace-nowrap">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
