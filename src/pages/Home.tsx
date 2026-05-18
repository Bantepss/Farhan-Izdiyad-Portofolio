import { motion } from 'framer-motion';

export function Home() {
  const experiences = [
    {
      title: "Head of Liaison Officer Division",
      company: "IMPACT 6.0",
      date: "Mar 2026 - Present",
      location: "Bandung, West Java, Indonesia",
      description: "Led a dedicated team to ensure seamless communication and an exceptional experience for attendees. Managed LO staff, developed planning schedules, and oversaw participant registration and guidance."
    },
    {
      title: "Front-End Developer",
      company: "Parade Wisuda April 2026",
      date: "Feb 2026 - Apr 2026",
      location: "Bandung, West Java, Indonesia",
      description: "Translated UI/UX designs into functional, highly responsive web interfaces. Managed codebase repository and enforced strict version control for the engineering team."
    },
    {
      title: "Staff of Human Resource Management",
      company: "Aku Masuk ITB (AMI) 2026",
      date: "Nov 2025 - Mar 2026",
      location: "Bandung, West Java, Indonesia",
      description: "Monitored and evaluated the performance of the Logistics division staff. Conducted performance assessments and determined the 'Best Staff of the Month'."
    },
    {
      title: "Staff of Internal Relation",
      company: "STEI-K 25 Cohort Board",
      date: "Oct 2025 - Present",
      location: "Kecamatan Jatinangor, West Java",
      description: "Managed internal dynamics and fostered a cohesive community. Served as Lead Coordinator for the Cohort Forum to address student needs and resolve internal matters."
    },
    {
      title: "Staff of Logistic",
      company: "STEI KAMP 2025",
      date: "Oct 2025",
      location: "Bandung, West Java, Indonesia",
      description: "Managed logistics and on-site operations for the STEI KAMP event."
    },
    {
      title: "Staff of Publication and Documentary",
      company: "STEI-K 25 Gathering",
      date: "Aug 2025",
      location: "Kecamatan Jatinangor, West Java",
      description: "Handled documentation and publication materials for the gathering."
    },
    {
      title: "Public Relations in ICT",
      company: "OSIS SMAN 5 Kota Bekasi",
      date: "Feb 2024 - Feb 2025",
      location: "Kota Bekasi, West Java, Indonesia",
      description: "Managed public relations and information communication technology initiatives."
    },
    {
      title: "Staff of Publication and Documentation",
      company: "Festifive 2024",
      date: "Aug 2024 - Oct 2024",
      location: "SMAN 5 Bekasi",
      description: "Created and managed publication content and documentation for the Festifive event."
    },
    {
      title: "Secretary of ICT Extracurricular",
      company: "SMAN 5 Kota Bekasi",
      date: "Jan 2023 - Feb 2024",
      location: "Kota Bekasi, West Java, Indonesia",
      description: "Managed administrative duties and communications for the ICT extracurricular."
    }
  ];

  return (
    <div className="flex flex-col items-center pb-20 w-full">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, filter: "blur(5px)" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center min-h-[70vh] text-center"
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
                src="https://github.com/Bantepss.png?v=update1" 
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
          <a href="/about" className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-transparent border border-neon-blue rounded-full hover:bg-neon-blue hover:text-black hover:shadow-[0_0_20px_#00f3ff] overflow-hidden">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative uppercase tracking-widest text-sm">Initialize Sequence</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Experience Timeline Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mt-24"
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
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="mb-10 ml-8 relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-cyan-500 bg-black group-hover:bg-cyan-500 transition-colors duration-300 shadow-[0_0_10px_#00f3ff]" />
              
              <div className="glass-panel p-6 rounded-2xl border-l-2 border-l-cyan-500 hover:border-l-neon-purple transition-colors duration-300">
                <span className="text-xs font-mono text-cyan-400 mb-2 block">{exp.date} &nbsp;|&nbsp; {exp.location}</span>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-glow group-hover:text-neon-blue transition-all">{exp.title}</h3>
                <h4 className="text-md text-gray-300 mb-4">{exp.company}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
