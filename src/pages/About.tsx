import { motion, type Variants } from 'framer-motion';
import fotoProfil2 from '../assets/FotoBantep2.jpeg';

export function About() {
  // ----------------------------------------------------------------------
  // DATA TECH ARSENAL (KEMAMPUAN TEKNIS BERDASARKAN KATEGORI)
  // Kamu bisa menambahkan, menghapus, atau mengedit isi dari 'skills'
  // di masing-masing kategori di bawah ini.
  // ----------------------------------------------------------------------
  const techArsenal = [
    {
      category: "Language",
      skills: ["TypeScript", "JavaScript", "Python", "C"]
    },
    {
      category: "Design",
      skills: ["UI/UX Design", "Figma", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Business",
      skills: ["Product Strategy", "Agile", "Management"]
    },
    {
      category: "Hardware",
      skills: ["IoT", "Microcontrollers", "Arduino"]
    },
    {
      category: "Problem Solving",
      skills: ["System Architecture", "Algorithms", "Debugging"]
    },
    {
      category: "Project Management",
      skills: ["Leadership", "Staff Organisation", "Human Management", "Human Resource"]
    }
  ];

  // Stagger variants for bio paragraphs
  const bioContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const bioItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto py-16 px-4"
      >
        {/* ====== Section Header ====== */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-ink">
            About Me
          </h2>
          <p className="text-ink-muted mt-3 text-lg">
            My background and technical expertise.
          </p>
          {/* Decorative glowing accent bar */}
          <div className="flex justify-center mt-4">
            <div
              className="h-1 w-20 rounded-full"
              style={{
                background: 'var(--accent)',
                boxShadow:
                  '0 0 12px var(--accent), 0 0 30px color-mix(in srgb, var(--accent) 50%, transparent)',
              }}
            />
          </div>
        </motion.div>

        {/* ====== Main Content ====== */}
        <div className="flex flex-col gap-10">
          {/* ---- Background / Bio Card ---- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="glass-panel border border-line/50 rounded-2xl p-8 md:p-10"
          >
            <h3 className="font-display text-xl font-bold mb-8 text-ink flex items-center gap-3">
              <span
                className="inline-block w-2 h-6 rounded-full"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px var(--accent)',
                }}
              />
              Background
            </h3>

            {/* Flex for photo + text */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Photo with Orbit Ring */}
              <div className="relative w-52 h-52 md:w-64 md:h-64 shrink-0 flex items-center justify-center">
                {/* Rotating orbit ring */}
                <div className="animate-orbit absolute inset-0 rounded-2xl">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0%, transparent 25%, var(--accent) 45%, var(--accent-strong) 55%, transparent 75%, transparent 100%)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      padding: '3px',
                    }}
                  />
                </div>

                {/* Static photo */}
                <div className="relative w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-2xl overflow-hidden border-2 border-surface ring-1 ring-line shadow-lg bg-surface-2">
                  <img
                    src={fotoProfil2}
                    alt="Farhan Izdiyad"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Ambient glow behind photo */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
                  style={{
                    background: 'var(--accent)',
                    filter: 'blur(40px)',
                    opacity: 0.15,
                  }}
                />
              </div>

              {/* Bio Text with staggered animations */}
              <motion.div
                className="flex-1"
                variants={bioContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-50px' }}
              >
                <motion.p
                  variants={bioItemVariants}
                  className="text-ink-muted leading-relaxed mb-4"
                >
                  Hello everyone! Let me introduce myself, my name is Farhan Izdiyad, but you can just call me Farhan. I was born on June 17, 2007, so I'm currently 18 years old. I'm originally from Bekasi; I went to elementary school at SDIT Nur Hikmah, continued my middle school at SMPIT Nur Hikmah, and spent my high school years at SMAN 5 Kota Bekasi. Currently, I'm an undergraduate student at Institut Teknologi Bandung (ITB), specifically majoring in Information Systems and Technology (STI) under the School of Electrical Engineering and Informatics (STEI).
                </motion.p>
                <motion.p
                  variants={bioItemVariants}
                  className="text-ink-muted leading-relaxed mb-4"
                >
                  Outside of my regular studies, I'm pretty active in various activities. From my experience as a student council (OSIS) officer back in high school, to my campus life where I served as a Human Resources staff member for AMI 2026 evaluating the IT staff's performance, handling UI/UX design for the April Graduation Parade (WISPRIL) 2026 committee, interning at the KM ITB student cabinet, and now I'm busy being part of the IMPACT 6.0 organizing committee.
                </motion.p>
                <motion.p
                  variants={bioItemVariants}
                  className="text-ink-muted leading-relaxed"
                >
                  When it comes to tech, I really enjoy exploring software development using C, Python, or TypeScript, as well as building IoT prototypes using Arduino and ESP32. But don't worry, I'm not always glued to my laptop! In my free time, I love hanging out at coffee shops, playing PC/mobile games like Valorant, going to live music concerts, editing videos on CapCut, or just playing cards and grabbing local food with my friends. Nice to meet you all, I hope we can get to know each other quickly and have a great time working together!
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* ---- Tech Arsenal Categories Card ---- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-panel border border-line/50 rounded-2xl p-8 md:p-10 flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display text-xl font-bold mb-1 text-ink flex items-center gap-3">
                <span
                  className="inline-block w-2 h-6 rounded-full"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent)',
                  }}
                />
                Skill Experience
              </h3>
              <p className="text-sm text-ink-subtle ml-5">
                My Skill, Based On My Experience.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {techArsenal.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-30px' }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  {/* Category title with comet-trail decorator */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="comet-trail rounded-full"
                      style={{ width: '3px', height: '40px' }}
                    />
                    <h4 className="text-xs font-bold text-accent uppercase tracking-widest">
                      {section.category}
                    </h4>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2.5 pl-[15px]">
                    {section.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.35,
                          delay: idx * 0.08 + index * 0.05,
                        }}
                        className="glass-panel text-ink-muted px-4 py-2 rounded-xl text-xs font-medium cursor-default transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,141,240,0.4)] hover:-translate-y-1 hover:text-accent hover:border-accent/50"
                        style={{
                          border: '1px solid var(--glass-border)',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}