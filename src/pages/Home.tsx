import { motion } from 'framer-motion';
import { About } from './About';
import { Projects } from './Projects';
import { Contact } from './Contact';

export function Home() {
  const experiences = [
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

  return (
    <div className="flex flex-col items-center w-full gap-32 pb-20">
      
      {/* Home Section (Hero Only) */}
      <section id="home" className="w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center min-h-[70vh] text-center w-full"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 relative rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-[0_0_30px_rgba(0,243,255,0.4)]"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black">
                <img 
                  src="/assets/foto-profil.png" 
                  alt="Farhan Izdiyad Profile" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300 filter grayscale-[20%] contrast-125"
                />
              </div>
            </motion.div>

            <h2 className="text-neon-blue tracking-[0.3em] uppercase text-sm mb-4 font-mono font-bold mt-2">
              System Access Granted
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              FARHAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">IZDIYAD</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed mb-12 glass-panel p-6 rounded-2xl"
          >
            Halo! Saya Farhan Izdiyad, seorang mahasiswa Sistem dan Teknologi Informasi di Institut Teknologi Bandung (ITB). Saya memiliki minat besar dalam pengembangan perangkat lunak, khususnya sebagai Front-End Developer, serta rekayasa sistem yang efisien. Dalam keseharian, saya terbiasa bekerja dengan TypeScript, Python, dan C, baik untuk membangun antarmuka digital maupun merancang prototipe IoT berbasis mikrokontroler.
            <br/><br/>
            Hal yang paling memotivasi saya adalah menjembatani antara solusi teknis dan kebutuhan bisnis. Pengalaman saya sebagai Front-End Developer untuk Wisuda April ITB (WISPRIL) 2026 mengasah kemampuan saya dalam mengeksekusi proyek pengembangan web skala besar. Di sisi lain, peran saya di divisi Human Resources pada AMI 2026 telah memperkuat kemampuan saya dalam manajemen tim, evaluasi performa, dan perencanaan strategis.
          </motion.p>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
          >
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              // @ts-ignore
              if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo('#about', { offset: -100, duration: 1.5 });
              } else {
                const el = document.getElementById('about');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }
            }} className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-transparent border border-neon-blue rounded-full hover:bg-neon-blue hover:text-black hover:shadow-[0_0_20px_#00f3ff] overflow-hidden">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative uppercase tracking-widest text-sm">Initialize Sequence</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl pt-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-glow text-neon-blue font-mono">
            // EXPERIENCE_LOG
          </h2>
          
          <div className="relative border-l border-cyan-500/30 ml-4 md:ml-0">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="mb-10 ml-8 relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-cyan-500 bg-black group-hover:bg-cyan-500 transition-colors duration-300 shadow-[0_0_10px_#00f3ff]" />
                
                <div className="glass-panel p-6 rounded-2xl border-l-2 border-l-cyan-500 hover:border-l-neon-purple transition-colors duration-300 flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Photo / Logo Placeholder */}
                  {exp.logo && (
                    <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-cyan-500/30 bg-black/50 shadow-[0_0_15px_rgba(0,243,255,0.1)] group-hover:border-neon-purple/50 transition-colors duration-300">
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-xs font-mono text-cyan-400 mb-2 block">{exp.date} &nbsp;|&nbsp; {exp.location}</span>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-glow group-hover:text-neon-blue transition-all">{exp.title}</h3>
                    <h4 className="text-md text-gray-300 mb-4">{exp.company}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    
                    {/* Skill Badges */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="px-3 py-1 text-[10px] sm:text-xs font-mono rounded-full border border-neon-blue/30 bg-neon-blue/10 text-cyan-300 shadow-[0_0_5px_rgba(0,243,255,0.2)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

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
