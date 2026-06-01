import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiCalendar, FiAward } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

// --- Education Timeline Card with 3D Parallax Tilt ---
function EducationCard({
  edu,
  index,
  isLeft,
}: {
  edu: { institution: string; degree: string; date: string; logo: string; grade: string };
  index: number;
  isLeft: boolean;
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
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
        delay: index * 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="perspective-[1200px] w-full"
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
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            {/* Logo with orbit ring */}
            <div className="relative shrink-0">
              {/* Orbit ring */}
              <div
                className="absolute -inset-2 rounded-full border border-dashed animate-orbit"
                style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
              />
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-line bg-surface-2 flex items-center justify-center shadow-md relative">
                <img
                  src={edu.logo}
                  alt={`${edu.institution} logo`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Subtle glow behind logo */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2 group-hover:text-accent transition-colors duration-300">
                {edu.institution}
              </h3>

              {edu.degree && (
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <HiOutlineSparkles className="text-accent text-sm shrink-0" />
                  <h4 className="text-base sm:text-lg font-semibold text-accent">
                    {edu.degree}
                  </h4>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                {/* Date badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[color-mix(in_srgb,var(--accent)_20%,transparent)]">
                  <FiCalendar className="text-accent text-xs" />
                  <span className="text-xs font-semibold text-accent tracking-wide">
                    {edu.date}
                  </span>
                </div>

                {/* Grade badge */}
                {edu.grade && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-line">
                    <FiAward className="text-ink-muted text-xs" />
                    <span className="text-xs font-semibold text-ink-muted tracking-wide">
                      {edu.grade}
                    </span>
                  </div>
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
            transition={{ duration: 1.2, delay: index * 0.3 + 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- Main Education Component ---
export function Education() {
  const educationData = [
    {
      institution: "Institut Teknologi Bandung",
      degree: "Engineer's Degree, Information Technology",
      date: "Jul 2025 – Aug 2029",
      logo: "/assets/logo-placeholder.svg",
      grade: ""
    },
    {
      institution: "SMAN 5 Bekasi",
      degree: "High School Diploma",
      date: "Jul 2022 – Jul 2025",
      logo: "/assets/logo-placeholder.svg",
      grade: "Grade: 10-12"
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-4 overflow-hidden">

      {/* ===== Section Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 md:mb-20 relative z-10"
      >
        <motion.h2
          className="font-display text-4xl md:text-5xl font-extrabold text-ink mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Education
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
          My academic journey through the stars of knowledge.
        </motion.p>
      </motion.div>

      {/* ===== Timeline ===== */}
      <div className="relative z-10">
        {/* Central vertical comet trail line */}
        <div
          className="comet-trail absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full z-0"
        />

        {/* Timeline entries */}
        <div className="flex flex-col gap-16 md:gap-20 relative">
          {educationData.map((edu, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-start md:items-center"
              >
                {/* ===== Glow Node on the timeline ===== */}
                <motion.div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                >
                  {/* Outer pulse ring */}
                  <div className="absolute -inset-3 rounded-full bg-accent/10 animate-ping" />
                  {/* Glow node */}
                  <div
                    className="glow-node w-3 h-3 rounded-full relative"
                    style={{
                      background: 'var(--accent)',
                    }}
                  >
                    {/* Inner bright core */}
                    <div className="absolute inset-0.5 rounded-full bg-white/60" />
                  </div>
                </motion.div>

                {/* ===== Card positioning ===== */}
                {/* Desktop: alternating left/right. Mobile: always right of timeline */}
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

                  <EducationCard edu={edu} index={index} isLeft={isLeft} />
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

      {/* ===== Decorative floating particles ===== */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
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
    </div>
  );
}
