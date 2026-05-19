import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import fotoProfil from '../assets/FotoBantep1.jpeg';
import fotoProfil2 from '../assets/FotoBantep2.jpeg';
import { About } from './About';
import { Projects } from './Projects';
import { Contact } from './Contact';

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
        className="saas-card p-6 flex flex-col h-full bg-white relative group"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          {exp.logo && (
            <motion.div 
              layoutId={`${layoutIdPrefix}-logo-container`}
              className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center"
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
            <motion.span layoutId={`${layoutIdPrefix}-date`} className="text-[10px] sm:text-xs font-bold text-[#135CC5] block tracking-wide uppercase">
              {exp.date}
            </motion.span>
            <motion.h4 layoutId={`${layoutIdPrefix}-company`} className="text-sm sm:text-md font-medium text-slate-600 line-clamp-1">
              {exp.company}
            </motion.h4>
          </div>
        </div>

        <motion.h3 layoutId={`${layoutIdPrefix}-title`} className="text-lg sm:text-xl font-bold text-[#0F172A] mb-3 line-clamp-2 group-hover:text-[#135CC5] transition-colors">
          {exp.title}
        </motion.h3>
        
        <motion.p layoutId={`${layoutIdPrefix}-desc`} className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 flex-1">
          {exp.description}
        </motion.p>
        
        <motion.div layoutId={`${layoutIdPrefix}-skills`} className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-auto">
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
      logo: "/assets/logo-placeholder.png",
      skills: ["Leadership", "Communication", "Event Management"]
    },
    {
      title: "Front-End Developer",
      company: "Parade Wisuda April 2026",
      date: "Feb 2026 - Apr 2026",
      location: "Bandung, West Java, Indonesia",
      description: "Translated UI/UX designs into functional, highly responsive web interfaces. Managed codebase repository and enforced strict version control for the engineering team.",
      logo: "/assets/logo-placeholder.png",
      skills: ["React", "TypeScript", "Version Control", "Tailwind", "Front-end structure"]
    },
    {
      title: "Staff of Human Resource Management",
      company: "Aku Masuk ITB (AMI) 2026",
      date: "Nov 2025 - Mar 2026",
      location: "Bandung, West Java, Indonesia",
      description: "Monitored and evaluated the performance of the Logistics division staff. Conducted performance assessments and determined the 'Best Staff of the Month'.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Human Resources", "Performance Evaluation", "Team Management"]
    },
    {
      title: "Staff of Internal Relation",
      company: "STEI-K 25 Cohort Board",
      date: "Oct 2025 - Present",
      location: "Kecamatan Jatinangor, West Java",
      description: "Managed internal dynamics and fostered a cohesive community. Served as Lead Coordinator for the Cohort Forum to address student needs and resolve internal matters.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Public Relations", "Internal Relations", "Coordination"]
    },
    {
      title: "Staff of Logistic",
      company: "STEI KAMP 2025",
      date: "Oct 2025",
      location: "Bandung, West Java, Indonesia",
      description: "Managed logistics and on-site operations for the STEI KAMP event.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Logistics", "Operations", "Problem Solving"]
    },
    {
      title: "Staff of Publication and Documentary",
      company: "STEI-K 25 Gathering",
      date: "Aug 2025",
      location: "Kecamatan Jatinangor, West Java",
      description: "Handled documentation and publication materials for the gathering.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Photography", "Design", "Publication"]
    },
    {
      title: "Public Relations in ICT",
      company: "OSIS SMAN 5 Kota Bekasi",
      date: "Feb 2024 - Feb 2025",
      location: "Kota Bekasi, West Java, Indonesia",
      description: "Managed public relations and information communication technology initiatives.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Public Relations", "Information Technology", "Communication"]
    },
    {
      title: "Staff of Publication and Documentation",
      company: "Festifive 2024",
      date: "Aug 2024 - Oct 2024",
      location: "SMAN 5 Bekasi",
      description: "Created and managed publication content and documentation for the Festifive event.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Content Creation", "Documentation", "Social Media"]
    },
    {
      title: "Secretary of ICT Extracurricular",
      company: "SMAN 5 Kota Bekasi",
      date: "Jan 2023 - Feb 2024",
      location: "Kota Bekasi, West Java, Indonesia",
      description: "Managed administrative duties and communications for the ICT extracurricular.",
      logo: "/assets/logo-placeholder.png",
      skills: ["Administration", "Organization", "Information Technology"]
    }
  ];

  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto Scroll Logic (Setiap 2.5 Detik)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (!isHovered && !selectedExp) {
      interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const firstChild = container.children[0] as HTMLElement;
          const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : 350; 
          
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
          }
        }
      }, 2500);
    }

    return () => clearInterval(interval);
  }, [isHovered, selectedExp]);

  return (
    <div className="flex flex-col items-center w-full gap-24 pb-20 relative">
      
      {/* Home Section (Hero - Style Referensi dengan Perubahan Monokrom) */}
      {/* bg-transparent agar menyatu dengan background off-white website */}
      <section id="home" className="w-full bg-transparent min-h-[90vh] flex items-end justify-center pt-20 overflow-hidden relative">
        {/* Container Split Layout: flex-col-reverse agar teks di atas foto di mobile, md:flex-row untuk kiri-kanan di desktop */}
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-end justify-between h-full relative z-10">
          
          {/* Bagian Foto Profil (Kiri) - Setengah Badan, Wajah Terlihat & Efek Hover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center md:justify-start items-end mt-10 md:mt-0"
          >
            {/* PERBAIKAN: Tinggi container ditingkatkan secara signifikan agar menunjukkan setengah badan tanpa wajah terpotong */}
            {/* Saya meningkatkan tinggi dari h-[400px] md:h-[520px] menjadi h-[500px] md:h-[650px] */}
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg flex items-start justify-center overflow-hidden h-[500px] md:h-[650px]">
              <img 
                src={fotoProfil} 
                alt="Farhan Izdiyad Profile" 
                // Gunakan 'h-full object-cover object-top' agar kepala (bagian atas) yang difokuskan.
                // EFEK HOVER: Saat di-hover, grayscale-0 dan warnanya kembali terang dengan transisi halus
                className="w-full h-full object-cover object-top relative z-0 grayscale contrast-125 brightness-[0.8] opacity-90 transition-all duration-500 hover:grayscale-0 hover:contrast-100 hover:brightness-100 hover:opacity-100 cursor-pointer"
              />
              
              {/* Efek Gradient memudar di bagian paling bawah pinggang agar potongannya halus */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>
            </div>
          </motion.div>
          {/* Bagian Teks (Kanan) - Warna gelap agar kontras dengan background terang */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 pb-10 md:pb-32 flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Tombol Back */}
            <a href="#" className="text-sm text-slate-400 hover:text-[#0F172A] transition-colors mb-4 md:mb-6 flex items-center gap-2 tracking-wider">
              &lt; back
            </a>
            
            {/* Nama / Judul Utama - Satu Baris */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 tracking-wide uppercase leading-tight text-[#0F172A] md:whitespace-nowrap">
              FARHAN IZDIYAD
            </h1>

            {/* Sub-judul Jurusan di bawah Nama */}
            <h2 className="text-lg md:text-xl font-bold text-[#135CC5] mb-6 tracking-wide uppercase">
              System And Information Technology
            </h2>

            {/* Deskripsi (Italic) dengan Efek Ketik */}
            <p className="text-slate-600 italic font-light leading-relaxed mb-10 max-w-md text-sm md:text-base min-h-[80px]">
              {typedText}
              {/* Kursor Berkedip */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[2px] h-[1em] bg-slate-400 ml-1 align-middle"
              />
            </p>

            {/* Garis Pemisah (Divider) */}
            <div className="w-12 h-[2px] bg-slate-300 mb-10"></div>

            {/* Ikon Sosial Media - Warna gelap */}
            <div className="flex gap-6 text-slate-400 text-lg">
              <a href="#" className="hover:text-[#135CC5] transition-colors"><FaLinkedin /></a>
              <a href="#" className="hover:text-[#E1306C] transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-[#1DA1F2] transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-[#FF0000] transition-colors"><FaYoutube /></a>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Experience Auto-Scrolling Slider Section */}
      <section id="experience" className="w-full flex flex-col items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full pt-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Experience</h2>
            <p className="text-[#475569] mt-3">My professional journey. Hover to pause, click to expand.</p>
          </div>
          
          {/* Horizontal Slider Container */}
          <div 
            className="w-full relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Fade Edges */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[var(--color-bg-page)] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[var(--color-bg-page)] to-transparent z-10 pointer-events-none" />

            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar py-10 px-12 md:px-32 snap-x snap-mandatory items-stretch"
              style={{ scrollBehavior: 'smooth' }}
            >
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  className="snap-center stretch h-full py-4 origin-center"
                  initial={{ opacity: 0.3, scale: 0.85, filter: "blur(2px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ root: scrollContainerRef, amount: 0.4 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ExperienceCard 
                    exp={exp} 
                    onClick={() => setSelectedExp(exp)} 
                    layoutIdPrefix={`exp-${index}`} 
                  />
                </motion.div>
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />

            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 md:p-10">
              <motion.div
                layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-container`}
                className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto pointer-events-auto flex flex-col shadow-2xl relative p-8 md:p-12"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 hover:text-red-500 hover:bg-slate-200 transition-colors shadow-sm"
                >
                  <FaTimes />
                </motion.button>

                <div className="flex items-center gap-6 mb-8">
                  {selectedExp.logo && (
                    <motion.div 
                      layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-logo-container`}
                      className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center"
                    >
                      <motion.img 
                        layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-logo`}
                        src={selectedExp.logo} 
                        alt={`${selectedExp.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                  <div>
                    <motion.span 
                      layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-date`} 
                      className="text-xs font-bold text-[#135CC5] block tracking-wide uppercase mb-1"
                    >
                      {selectedExp.date} &nbsp;&bull;&nbsp; {selectedExp.location}
                    </motion.span>
                    <motion.h4 
                      layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-company`} 
                      className="text-lg font-medium text-slate-600"
                    >
                      {selectedExp.company}
                    </motion.h4>
                  </div>
                </div>

                <motion.h3 
                  layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-title`} 
                  className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6"
                >
                  {selectedExp.title}
                </motion.h3>
                
                <motion.div 
                  layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-skills`} 
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {selectedExp.skills.map((skill, idx) => (
                    <span key={idx} className="badge-blue px-3 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </motion.div>

                <motion.p 
                  layoutId={`exp-${experiences.findIndex(p => p.title === selectedExp.title)}-desc`} 
                  className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap"
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