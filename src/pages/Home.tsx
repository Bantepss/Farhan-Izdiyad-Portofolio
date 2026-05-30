import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import fotoProfil from '../assets/FotoBantep1.jpeg';
import { About } from './About';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { Education } from './Education';
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

// --- Komponen Kartu Experience 3D ---
function ExperienceCard({ exp, onClick, layoutIdPrefix }: { exp: Experience, onClick: () => void, layoutIdPrefix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      className="cursor-pointer perspective-[1000px] shrink-0 w-[300px] sm:w-[350px] md:w-[400px] h-full"
    >
      <motion.div
        layoutId={`${layoutIdPrefix}-container`}
        className="saas-card p-6 flex flex-col h-full relative group"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          {exp.logo && (
            <motion.div
              layoutId={`${layoutIdPrefix}-logo-container`}
              className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-line bg-surface-2 flex items-center justify-center"
            >
              <motion.img
                layoutId={`${layoutIdPrefix}-logo`}
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          )}
          <div>
            <motion.span layoutId={`${layoutIdPrefix}-date`} className="text-[10px] sm:text-xs font-bold text-accent block tracking-wide uppercase">
              {exp.date}
            </motion.span>
            <motion.h4 layoutId={`${layoutIdPrefix}-company`} className="text-sm sm:text-md font-medium text-ink-muted line-clamp-1">
              {exp.company}
            </motion.h4>
          </div>
        </div>

        <motion.h3 layoutId={`${layoutIdPrefix}-title`} className="text-lg sm:text-xl font-bold text-ink mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          {exp.title}
        </motion.h3>

        <motion.p layoutId={`${layoutIdPrefix}-desc`} className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-4 line-clamp-3 flex-1">
          {exp.description}
        </motion.p>

        <motion.div layoutId={`${layoutIdPrefix}-skills`} className="flex flex-wrap gap-2 pt-4 border-t border-line mt-auto">
          {exp.skills.slice(0, 3).map((skill, skillIndex) => (
            <span key={skillIndex} className="badge-blue text-[10px]">
              {skill}
            </span>
          ))}
          {exp.skills.length > 3 && (
            <span className="badge-blue text-[10px] opacity-70">+{exp.skills.length - 3}</span>
          )}
        </motion.div>
      </motion.div>
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
  // selectedKey = DOM-index card yang diklik. Karena marquee menduplikasi cards 3x,
  // tiap copy butuh layoutId unik (`exp-${index}`). Modal pakai layoutId yang sama
  // dengan card yang diklik, supaya morph berangkat dari posisi yang benar.
  const [selectedKey, setSelectedKey] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  // wasDraggingRef ditandai TRUE saat user benar-benar drag (>5px), dipakai onClick
  // card untuk membedakan tap-asli dari akhir-drag.
  const wasDraggingRef = useRef(false);

  // --- Marquee Slider: native scrollLeft + auto-drift via RAF ---
  // Pendekatan native: container pakai overflow-x-auto, scrollLeft di-poke RAF tiap
  // frame. Touch swipe, trackpad horizontal scroll, dan scrollbar drag SEMUA otomatis
  // bekerja karena browser yang handle. Mouse drag ditambahkan via pointer events.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0); // lebar 1 set experiences
  // Pause RAF: bila false → drift berjalan, true → drift berhenti.
  // Tidak pakai spring smooth-speed lagi karena scrollLeft tidak terlihat "kaku"
  // saat di-start/stop — beda dengan transform yang transisinya tajam.
  const isPausedRef = useRef(false);
  // Jeda re-resume setelah user terakhir interact: 800ms.
  const interactionCooldownRef = useRef(0);

  useEffect(() => {
    isPausedRef.current = isHovered || !!selectedExp;
  }, [isHovered, selectedExp]);

  // Ukur lebar 1 set. Track diisi 3x experiences → setWidth = scrollWidth/3.
  useEffect(() => {
    if (!scrollerRef.current) return;
    const measure = () => {
      if (scrollerRef.current) {
        const w = scrollerRef.current.scrollWidth / 3;
        setSetWidth(w);
        // Mulai dari awal set tengah, supaya drag kiri & kanan punya runway.
        if (scrollerRef.current.scrollLeft === 0) {
          scrollerRef.current.scrollLeft = w;
        }
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scrollerRef.current);
    return () => ro.disconnect();
  }, []);

  // Wrap: jaga scrollLeft tetap di range [setWidth, 2*setWidth] (set tengah).
  // Karena 3 set duplikat identik, lompat ±setWidth tidak terlihat.
  const wrapScroll = (c: HTMLDivElement) => {
    if (setWidth === 0) return;
    if (c.scrollLeft >= setWidth * 2) c.scrollLeft -= setWidth;
    else if (c.scrollLeft < setWidth) c.scrollLeft += setWidth;
  };

  // Bedakan scrollLeft yang diset oleh RAF vs oleh user. Flag ini diset TRUE tepat
  // sebelum RAF poke scrollLeft, lalu dibaca di scroll handler agar tidak men-trigger
  // cooldown pause yang false-positive.
  const programmaticScrollRef = useRef(false);

  useAnimationFrame((_t, delta) => {
    const c = scrollerRef.current;
    if (!c || setWidth === 0) return;
    if (isPausedRef.current) return;
    // Cooldown setelah user interaksi: tunggu 800ms baru lanjut drift.
    if (interactionCooldownRef.current > 0) {
      interactionCooldownRef.current = Math.max(0, interactionCooldownRef.current - delta);
      return;
    }
    const SPEED = 75; // px/detik
    const px = (SPEED * delta) / 1000;
    programmaticScrollRef.current = true;
    c.scrollLeft += px;
    wrapScroll(c);
  });

  // Listener scroll: handle wrap saat user yang melakukan scroll (touch/trackpad/drag).
  useEffect(() => {
    const c = scrollerRef.current;
    if (!c) return;
    const onScroll = () => {
      if (programmaticScrollRef.current) {
        programmaticScrollRef.current = false;
        return;
      }
      // User-initiated scroll → tunda drift berikutnya.
      interactionCooldownRef.current = 800;
      wrapScroll(c);
    };
    c.addEventListener('scroll', onScroll, { passive: true });
    return () => c.removeEventListener('scroll', onScroll);
  }, [setWidth]);

  // Mouse drag: native overflow-x-auto tidak melayani drag-mouse di area card
  // (browser tidak punya UX itu by default). Kita tambah pointer events untuk mouse.
  // Touch & pen biarkan native handle (overflow-x-auto sudah jalan).
  //
  // PENTING: kita TIDAK pakai setPointerCapture — itu akan men-redirect event ke
  // scroller dan membuat click di card tidak fire. Window listener saja sudah
  // cukup untuk track gerakan ke manapun cursor pergi.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const c = scrollerRef.current;
    if (!c) return;
    const startX = e.clientX;
    const startScroll = c.scrollLeft;
    wasDraggingRef.current = false;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) <= 5) return; // tap kecil → biarkan, jangan trigger drag
      wasDraggingRef.current = true;
      programmaticScrollRef.current = true;
      c.scrollLeft = startScroll - dx;
      interactionCooldownRef.current = 800;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      // Reset flag setelah click yang mungkin nyusul (untuk membedakan tap dari drag).
      setTimeout(() => {
        wasDraggingRef.current = false;
      }, 120);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

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
    <div className="flex flex-col items-center w-full gap-24 pb-20 relative">
      
      {/* Home Section (Hero) — komposisi ala Figma: teks kiri, panel kaca kanan */}
      <section id="home" className="w-full bg-transparent min-h-[88vh] flex items-center justify-center pt-24 pb-12 relative">
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

            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight uppercase leading-[1.05] text-ink">
              FARHAN<br className="hidden sm:block" /> IZDIYAD
            </h1>

            <h2 className="font-ui text-lg sm:text-xl md:text-lg lg:text-xl font-semibold text-accent mb-6 tracking-wide uppercase">
              System And Information Technology
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

      {/* Experience Auto-Scrolling Slider Section */}
      <section id="experience" className="w-full flex flex-col items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full pt-12"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink">Experience</h2>
            <p className="text-ink-muted mt-3">My professional journey. Hover to pause, click to expand.</p>
          </div>
          
          {/* Marquee Slider Container */}
          <div
            className="w-full relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Fade Edges */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[var(--color-bg-page)] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[var(--color-bg-page)] to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollerRef}
              onPointerDown={handlePointerDown}
              className="flex gap-6 py-10 items-stretch overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
            >
              {[...experiences, ...experiences, ...experiences].map((exp, index) => (
                <div key={index} className="h-full py-4 shrink-0">
                  <ExperienceCard
                    exp={exp}
                    onClick={() => {
                      if (wasDraggingRef.current) return;
                      setSelectedExp(exp);
                      setSelectedKey(index);
                    }}
                    layoutIdPrefix={`exp-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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
              className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm z-[100]"
            />

            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 md:p-10">
              <motion.div
                layoutId={`exp-${selectedKey}-container`}
                className="w-full max-w-2xl max-h-[90vh] bg-surface border border-line rounded-3xl overflow-y-auto pointer-events-auto flex flex-col shadow-2xl relative p-8 md:p-12"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-surface-2 rounded-full flex items-center justify-center text-ink-muted hover:text-red-500 transition-colors shadow-sm"
                >
                  <FaTimes />
                </motion.button>

                <div className="flex items-center gap-6 mb-8">
                  {selectedExp.logo && (
                    <motion.div
                      layoutId={`exp-${selectedKey}-logo-container`}
                      className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-line bg-surface-2 flex items-center justify-center"
                    >
                      <motion.img
                        layoutId={`exp-${selectedKey}-logo`}
                        src={selectedExp.logo}
                        alt={`${selectedExp.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                  <div>
                    <motion.span
                      layoutId={`exp-${selectedKey}-date`}
                      className="text-xs font-bold text-accent block tracking-wide uppercase mb-1"
                    >
                      {selectedExp.date} &nbsp;&bull;&nbsp; {selectedExp.location}
                    </motion.span>
                    <motion.h4
                      layoutId={`exp-${selectedKey}-company`}
                      className="text-lg font-medium text-ink-muted"
                    >
                      {selectedExp.company}
                    </motion.h4>
                  </div>
                </div>

                <motion.h3
                  layoutId={`exp-${selectedKey}-title`}
                  className="font-display text-3xl md:text-4xl font-extrabold text-ink mb-6"
                >
                  {selectedExp.title}
                </motion.h3>

                <motion.div
                  layoutId={`exp-${selectedKey}-skills`}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {selectedExp.skills.map((skill, idx) => (
                    <span key={idx} className="badge-blue px-3 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </motion.div>

                <motion.p
                  layoutId={`exp-${selectedKey}-desc`}
                  className="text-ink-muted text-base md:text-lg leading-relaxed whitespace-pre-wrap"
                >
                  {selectedExp.description}
                </motion.p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="w-full">
        <About />
      </section>

      {/* Education Section */}
      <section id="education" className="w-full">
        <Education />
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full">
        <Contact />
      </section>

    </div>
  );
}