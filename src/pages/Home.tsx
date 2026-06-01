import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import fotoProfil from '../assets/FotoBantep1.jpeg';
import { About } from './About';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { Education } from './Education';
import { SectionReveal } from '../components/SectionReveal';
import { LogoMarquee } from '../components/LogoMarquee';

const scrollToId = (id: string) => {
  // Lenis instance ditaruh di window oleh RootLayout (lihat src/types/global.d.ts)
  if (window.__lenis) window.__lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// --- Tipe Data ---
interface Experience {
  title: string;
  company: string;
  date: string;
  location: string;
  description: string;
  logo: string;
  skills: string[];
}

// --- Komponen Kartu Experience Timeline 3D (matching Education style) ---
function ExperienceTimelineCard({
  exp,
  index,
  isLeft,
  onClick,
}: {
  exp: Experience;
  index: number;
  isLeft: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{
        opacity: 0,
        x: isLeft ? -80 : 80,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="perspective-[1200px] w-full cursor-pointer"
    >
      {/* Comet border wrapper */}
      <div className="comet-border">
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden group
                     hover:shadow-[0_0_30px_rgba(79,141,240,0.3)] transition-shadow duration-500"
        >
          {/* Decorative meteor trail accent inside card */}
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500">
            <div
              className="absolute top-3 right-3 w-1 h-16 rounded-full"
              style={{
                background: 'linear-gradient(180deg, var(--accent), transparent)',
                transform: 'rotate(-35deg)',
                transformOrigin: 'top center',
              }}
            />
            <div
              className="absolute top-2 right-6 w-0.5 h-10 rounded-full"
              style={{
                background: 'linear-gradient(180deg, var(--accent-strong), transparent)',
                transform: 'rotate(-25deg)',
                transformOrigin: 'top center',
              }}
            />
            {/* Meteor head glow */}
            <div
              className="absolute top-2 right-3 w-2 h-2 rounded-full"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 0 8px 3px var(--accent), 0 0 20px 6px rgba(79,141,240,0.3)',
              }}
            />
          </div>

          {/* Card content */}
          <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
            {/* Logo with orbit ring */}
            {exp.logo && (
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-2 rounded-full border border-dashed animate-orbit"
                  style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
                />
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-line bg-surface-2 flex items-center justify-center shadow-md relative">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-bold text-accent tracking-wide uppercase">
                  {exp.date}
                </span>
              </div>
              <h4 className="text-sm font-medium text-ink-muted mb-1 line-clamp-1">
                {exp.company}
              </h4>
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                {exp.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-4 line-clamp-3">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-line/50">
                {exp.skills.slice(0, 3).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="badge-blue text-[10px] hover:shadow-[0_0_12px_rgba(79,141,240,0.35)] transition-shadow"
                  >
                    {skill}
                  </span>
                ))}
                {exp.skills.length > 3 && (
                  <span className="badge-blue text-[10px] opacity-70">+{exp.skills.length - 3}</span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom shimmer line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.5 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: index * 0.2 + 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}


// --- Komponen Home Utama ---
export function Home() {
  const experiences: Experience[] = [
    {
      title: "Head of Liaison Officer Division",
      company: "IMPACT 6.0",
      date: "Mar 2026 - Present",
      location: "Bandung, West Java, Indonesia",
      description: "Led a dedicated team to ensure seamless communication and an exceptional experience for attendees. Managed LO staff, developed planning schedules, and oversaw participant registration and guidance.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Leadership", "Communication", "Event Management"]
    },
    {
      title: "Front-End Developer",
      company: "Parade Wisuda April 2026",
      date: "Feb 2026 - Apr 2026",
      location: "Bandung, West Java, Indonesia",
      description: "Translated UI/UX designs into functional, highly responsive web interfaces. Managed codebase repository and enforced strict version control for the engineering team.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["React", "TypeScript", "Version Control", "Tailwind", "Front-end structure"]
    },
    {
      title: "Staff of Human Resource Management",
      company: "Aku Masuk ITB (AMI) 2026",
      date: "Nov 2025 - Mar 2026",
      location: "Bandung, West Java, Indonesia",
      description: "Monitored and evaluated the performance of the Logistics division staff. Conducted performance assessments and determined the 'Best Staff of the Month'.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Human Resources", "Performance Evaluation", "Team Management"]
    },
    {
      title: "Staff of Internal Relation",
      company: "STEI-K 25 Cohort Board",
      date: "Oct 2025 - Present",
      location: "Kecamatan Jatinangor, West Java",
      description: "Managed internal dynamics and fostered a cohesive community. Served as Lead Coordinator for the Cohort Forum to address student needs and resolve internal matters.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Public Relations", "Internal Relations", "Coordination"]
    },
    {
      title: "Staff of Logistic",
      company: "STEI KAMP 2025",
      date: "Oct 2025",
      location: "Bandung, West Java, Indonesia",
      description: "Managed logistics and on-site operations for the STEI KAMP event.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Logistics", "Operations", "Problem Solving"]
    },
    {
      title: "Staff of Publication and Documentary",
      company: "STEI-K 25 Gathering",
      date: "Aug 2025",
      location: "Kecamatan Jatinangor, West Java",
      description: "Handled documentation and publication materials for the gathering.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Photography", "Design", "Publication"]
    },
    {
      title: "Public Relations in ICT",
      company: "OSIS SMAN 5 Kota Bekasi",
      date: "Feb 2024 - Feb 2025",
      location: "Kota Bekasi, West Java, Indonesia",
      description: "Managed public relations and information communication technology initiatives.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Public Relations", "Information Technology", "Communication"]
    },
    {
      title: "Staff of Publication and Documentation",
      company: "Festifive 2024",
      date: "Aug 2024 - Oct 2024",
      location: "SMAN 5 Bekasi",
      description: "Created and managed publication content and documentation for the Festifive event.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Content Creation", "Documentation", "Social Media"]
    },
    {
      title: "Secretary of ICT Extracurricular",
      company: "SMAN 5 Kota Bekasi",
      date: "Jan 2023 - Feb 2024",
      location: "Kota Bekasi, West Java, Indonesia",
      description: "Managed administrative duties and communications for the ICT extracurricular.",
      logo: "/assets/logo-placeholder.svg",
      skills: ["Administration", "Organization", "Information Technology"]
    }
  ];

  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  // Efek Ketikan
  const [typedText, setTypedText] = useState("");
  const fullText = "System And Information Technology undergraduate student at Institut Teknologi Bandung (ITB), passionate about software engineering, IoT, and system analysis.";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(type, 35); 
      }
    };

    const startDelay = setTimeout(type, 600);

    return () => {
      clearTimeout(timeout);
      clearTimeout(startDelay);
    };
  }, []);


  return (
    <div className="flex flex-col items-center w-full gap-0 pb-20 relative">

      {/* ===== SECTION 01 — HOME (hero + tools + experience) ===== */}
      <section id="home" className="w-full bg-transparent min-h-screen flex flex-col justify-center pt-28 pb-12 relative">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 items-center relative z-10 gap-10 md:gap-8">

          {/* Bagian Teks (Kiri) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 w-full flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Eyebrow badge — sentuhan tambahan */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-line bg-surface/60 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-ui text-xs font-semibold tracking-wide text-ink-muted">
                Open to collaboration · ITB STEI-K
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black mb-4 tracking-[-0.04em] uppercase leading-[0.92] text-gradient-accent">
              FARHAN<br className="hidden sm:block" /> IZDIYAD
            </h1>

            <h2 className="font-ui text-sm sm:text-base font-semibold text-accent mb-6 tracking-[0.22em] uppercase">
              System &amp; Information Technology
            </h2>

            <p className="text-ink-muted italic font-light leading-relaxed mb-10 max-w-md text-sm md:text-base min-h-[80px]">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle"
              />
            </p>

            {/* CTA — tombol "Get started" ala Figma (panah), warna biru */}
            <div className="flex flex-col sm:flex-row gap-3 mb-9 w-full sm:w-auto">
              <button
                onClick={() => scrollToId('contact')}
                className="btn-primary group flex items-center justify-center gap-2"
              >
                Get in touch
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToId('projects')}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-ink border border-line bg-surface/60 backdrop-blur-sm hover:border-accent/50 hover:text-accent transition-colors"
              >
                View projects
                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <div className="flex gap-5 text-ink-subtle text-lg">
              <a href="https://www.linkedin.com/in/farhan-izdiyad-726a80337/" className="hover:text-[#0A66C2] transition-colors"><FaLinkedin /></a>
              <a href="https://www.instagram.com/farhanizdiyad/" className="hover:text-[#E1306C] transition-colors"><FaInstagram /></a>
              <a href="https://github.com/Bantepss" className="hover:text-accent transition-colors"><FaGithub /></a>
            </div>
          </motion.div>

          {/* Bagian Foto Profil (Kanan) — panel glassmorphism rounded-[40px] ala Figma */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1 md:order-2 w-full flex justify-center md:justify-end"
          >
            <div className="glass-panel rounded-[40px] p-3 w-full max-w-xs sm:max-w-sm relative">
              <div className="group relative overflow-hidden rounded-[28px] h-[440px] sm:h-[500px] md:h-[540px] bg-gradient-to-b from-surface-2 to-surface">
                {/* Backdrop glow di belakang figure — mengisi area transparan cutout */}
                <div className="absolute inset-0 flex items-start justify-center pt-8 pointer-events-none">
                  <div
                    className="w-[85%] h-[70%] rounded-full opacity-80"
                    style={{ background: 'radial-gradient(circle at 50% 40%, var(--glow-1), transparent 68%)', filter: 'blur(28px)' }}
                  />
                </div>
                <img
                  src={fotoProfil}
                  alt="Farhan Izdiyad Profile"
                  className="absolute inset-0 z-[1] w-full h-full object-cover object-top grayscale contrast-110 brightness-95 opacity-95 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100 cursor-pointer"
                />
                {/* Fade tipis di bawah agar kaki/torso menyatu mulus ke panel + chip */}
                <div className="absolute inset-x-0 bottom-0 h-28 z-[2] bg-gradient-to-t from-surface to-transparent pointer-events-none" />
                {/* Floating chip */}
                <div className="absolute bottom-3 left-3 right-3 z-[3] glass-panel rounded-2xl px-4 py-3 flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-ui text-xs font-semibold text-ink">Bandung, Indonesia</p>
                    <p className="font-ui text-[10px] text-ink-subtle uppercase tracking-wider">Undergraduate · ITB</p>
                  </div>
                  <span className="badge-blue text-[10px]">STI</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Tech marquee — efek "Infinite Scroll" Figma, isi: tools & teknologi */}
      <section className="w-full -mt-8">
        <p className="text-center font-ui text-xs font-semibold uppercase tracking-[0.3em] text-ink-subtle mb-4">
          Tools &amp; technologies I work with
        </p>
        <LogoMarquee />
      </section>

      {/* Experience Timeline Section (Comet Trail style, matching Education) */}
      <section id="experience" className="w-full relative overflow-hidden">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20 relative z-10 pt-12"
        >
          <motion.h2
            className="font-display text-4xl md:text-5xl font-extrabold text-ink mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience
          </motion.h2>

          {/* Glowing accent underline bar */}
          <motion.div
            className="mx-auto h-1 rounded-full relative"
            style={{ width: '80px' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--accent), var(--accent-strong), var(--accent))',
                boxShadow: '0 0 12px 3px var(--accent), 0 0 30px 6px color-mix(in srgb, var(--accent) 40%, transparent)',
              }}
            />
          </motion.div>

          <motion.p
            className="text-ink-muted mt-5 text-base md:text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My professional journey through the cosmos. Click to expand.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          {/* Central vertical comet trail line */}
          <div
            className="comet-trail absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full z-0"
          />

          {/* Timeline entries */}
          <div className="flex flex-col gap-12 md:gap-16 relative">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Glow Node on the timeline */}
                  <motion.div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                  >
                    {/* Outer pulse ring */}
                    <div className="absolute -inset-3 rounded-full bg-accent/10 animate-ping" />
                    {/* Glow node */}
                    <div
                      className="glow-node w-3 h-3 rounded-full relative"
                      style={{ background: 'var(--accent)' }}
                    >
                      <div className="absolute inset-0.5 rounded-full bg-white/60" />
                    </div>
                  </motion.div>

                  {/* Card positioning */}
                  <div
                    className={`
                      w-full pl-16 md:pl-0
                      md:w-[calc(50%-32px)]
                      ${isLeft
                        ? 'md:mr-auto md:pr-12'
                        : 'md:ml-auto md:pl-12'
                      }
                    `}
                  >
                    {/* Connecting horizontal line from node to card (desktop only) */}
                    <div
                      className={`
                        hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-8 z-10
                        ${isLeft ? 'right-[calc(50%+6px)]' : 'left-[calc(50%+6px)]'}
                      `}
                      style={{
                        background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 20%, transparent))',
                      }}
                    />

                    {/* Mobile connecting line */}
                    <div
                      className="md:hidden absolute left-[30px] top-1/2 -translate-y-1/2 h-[2px] w-8 z-10"
                      style={{
                        background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 20%, transparent))',
                      }}
                    />

                    <ExperienceTimelineCard
                      exp={exp}
                      index={index}
                      isLeft={isLeft}
                      onClick={() => setSelectedExp(exp)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal comet node at bottom of timeline */}
          <motion.div
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -bottom-4 z-20"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 0 8px 2px var(--accent)',
              }}
            />
          </motion.div>
        </div>

        {/* Decorative floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`exp-particle-${i}`}
            className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
            style={{
              background: 'var(--accent)',
              top: `${15 + i * 18}%`,
              left: `${10 + i * 20}%`,
              boxShadow: '0 0 4px 1px var(--accent)',
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </section>

      {/* Expandable Modal Overlay for Experience */}
      <AnimatePresence>
        {selectedExp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md z-[100]"
            />

            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 md:p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-2xl max-h-[90vh] glass-panel border border-accent/20 rounded-3xl overflow-y-auto pointer-events-auto flex flex-col shadow-[0_0_60px_-12px_rgba(79,141,240,0.3)] relative"
              >
                {/* Glowing top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl z-10"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-strong), var(--accent), transparent)',
                    boxShadow: '0 0 12px 2px var(--accent), 0 2px 20px 4px rgba(79,141,240,0.3)',
                  }}
                />

                <div className="p-8 md:p-12">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-ink-muted hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all shadow-sm"
                  >
                    <FaTimes />
                  </motion.button>

                  <div className="flex items-center gap-6 mb-8">
                    {selectedExp.logo && (
                      <div className="relative shrink-0">
                        <div
                          className="absolute -inset-2 rounded-2xl border border-dashed animate-orbit"
                          style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
                        />
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-line bg-surface-2 flex items-center justify-center">
                          <img
                            src={selectedExp.logo}
                            alt={`${selectedExp.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-accent block tracking-wide uppercase mb-1">
                        {selectedExp.date} &nbsp;&bull;&nbsp; {selectedExp.location}
                      </span>
                      <h4 className="text-lg font-medium text-ink-muted">
                        {selectedExp.company}
                      </h4>
                    </div>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-extrabold text-ink mb-6">
                    {selectedExp.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedExp.skills.map((skill, idx) => (
                      <span key={idx} className="badge-blue px-3 py-1 text-xs hover:shadow-[0_0_12px_rgba(79,141,240,0.35)] transition-shadow">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-ink-muted text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedExp.description}
                  </p>
                </div>

                {/* Bottom shimmer line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ===== SECTION 02 — ABOUT ===== */}
      <SectionReveal>
        <section id="about" className="w-full min-h-screen flex flex-col justify-center py-12">
          <About />
        </section>
      </SectionReveal>

      {/* ===== SECTION 03 — EDUCATION ===== */}
      <SectionReveal>
        <section id="education" className="w-full min-h-screen flex flex-col justify-center py-12">
          <Education />
        </section>
      </SectionReveal>

      {/* ===== SECTION 04 — PROJECTS ===== */}
      <SectionReveal>
        <section id="projects" className="w-full min-h-screen flex flex-col justify-center py-12">
          <Projects />
        </section>
      </SectionReveal>

      {/* ===== SECTION 05 — CONTACT ===== */}
      <SectionReveal>
        <section id="contact" className="w-full min-h-screen flex flex-col justify-center py-12">
          <Contact />
        </section>
      </SectionReveal>

    </div>
  );
}