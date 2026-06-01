import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

// Komponen Card Terpisah untuk logika 3D Hover
function ProjectCard({ project, onClick, layoutIdPrefix }: { project: Project, onClick: () => void, layoutIdPrefix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animation for smooth return to center
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation (-10 to 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalize mouse position between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="cursor-pointer perspective-[1000px]"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Shooting star comet-border wrapper */}
      <div className="comet-border">
        <motion.div
          layoutId={`${layoutIdPrefix}-container`}
          className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full relative group"
          style={{ transform: "translateZ(30px)" }} // Pop out effect
        >
          {/* Project Image */}
          <motion.div
            layoutId={`${layoutIdPrefix}-image-container`}
            className="relative h-48 sm:h-60 w-full overflow-hidden bg-surface-2 border-b border-line"
          >
            <motion.img 
              layoutId={`${layoutIdPrefix}-image`}
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Warp-speed hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
              {/* Primary warp streak */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[200%]"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)',
                  animation: 'warp-flash 0.8s ease-out forwards',
                }}
              />
              {/* Secondary streak offset left */}
              <div
                className="absolute top-0 left-[30%] w-[2px] h-[200%]"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(79,141,240,0.6) 40%, rgba(79,141,240,0.8) 50%, rgba(79,141,240,0.6) 60%, transparent 100%)',
                  animation: 'warp-flash 0.9s ease-out 0.1s forwards',
                }}
              />
              {/* Tertiary streak offset right */}
              <div
                className="absolute top-0 left-[70%] w-[2px] h-[200%]"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(79,141,240,0.5) 40%, rgba(79,141,240,0.7) 50%, rgba(79,141,240,0.5) 60%, transparent 100%)',
                  animation: 'warp-flash 0.9s ease-out 0.15s forwards',
                }}
              />
              {/* Ambient glow wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div 
            layoutId={`${layoutIdPrefix}-info`}
            className="p-8 flex flex-col flex-1"
          >
            <motion.h3 layoutId={`${layoutIdPrefix}-title`} className="font-display text-2xl font-bold text-ink mb-3">
              {project.title}
            </motion.h3>
            <motion.p layoutId={`${layoutIdPrefix}-desc`} className="text-ink-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {project.description}
            </motion.p>

            {/* Tech stack badges */}
            <motion.div layoutId={`${layoutIdPrefix}-tech`} className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="badge-blue transition-shadow duration-300 hover:shadow-[0_0_12px_2px_color-mix(in_srgb,var(--accent)_50%,transparent)]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom accent glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Project Alpha",
      description: "Deskripsi singkat mengenai proyek ini. Jelaskan masalah yang diselesaikan dan solusi yang ditawarkan. Kamu bisa mengedit teks ini kapan saja. Pada versi tampilan Expand ini, kamu bisa menulis deskripsi yang jauh lebih panjang dari sebelumnya agar pengunjung bisa membaca detail studi kasusmu secara penuh.",
      image: "/assets/project-placeholder.svg",
      techStack: ["React", "Tailwind CSS", "TypeScript"], 
      githubLink: "https://github.com/Bantepss/project-alpha", 
      liveLink: "https://project-alpha.com" 
    },
    {
      title: "Project Beta",
      description: "Deskripsi singkat mengenai proyek kedua. Fokus pada arsitektur dan teknologi yang digunakan untuk membuat sistem menjadi efisien. Saat kartu ini diklik, animasi transisi mulus akan membawanya ke tengah layar seperti contoh animasi Dribbble Discover.",
      image: "/assets/project-placeholder.svg",
      techStack: ["Python", "Flask", "IoT"],
      githubLink: "https://github.com/Bantepss/project-beta",
      liveLink: "" 
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 relative overflow-hidden">

      {/* ============ Section Header ============ */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative"
      >
        <motion.h2
          className="font-display text-3xl md:text-5xl font-extrabold text-ink inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Selected Projects
        </motion.h2>

        {/* Glowing accent underline */}
        <motion.div
          className="mx-auto mt-4 h-[3px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--accent) 30%, var(--accent-strong) 50%, var(--accent) 70%, transparent 100%)',
            boxShadow: '0 0 12px 2px color-mix(in srgb, var(--accent) 50%, transparent), 0 0 30px 4px color-mix(in srgb, var(--accent) 25%, transparent)',
          }}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 160, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          className="text-ink-muted mt-5 text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          A showcase of my recent work. Click to expand.
        </motion.p>
      </motion.div>

      {/* ============ Projects Grid ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => setSelectedProject(project)}
            layoutIdPrefix={`project-${index}`}
          />
        ))}
      </div>

      {/* ============ Expandable Modal Overlay ============ */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop with deeper blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md z-[100]"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 md:p-10">
              <motion.div
                layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-container`}
                className="w-full max-w-3xl max-h-[90vh] glass-panel rounded-3xl overflow-y-auto pointer-events-auto flex flex-col shadow-2xl relative"
              >
                {/* Glowing top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] z-20 rounded-t-3xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, var(--accent) 20%, var(--accent-strong) 50%, var(--accent) 80%, transparent 100%)',
                    boxShadow: '0 0 16px 3px color-mix(in srgb, var(--accent) 60%, transparent), 0 2px 30px 6px color-mix(in srgb, var(--accent) 30%, transparent)',
                  }}
                />

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 z-10 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-ink-muted hover:text-red-500 hover:shadow-[0_0_14px_2px_rgba(239,68,68,0.4)] transition-all duration-300"
                >
                  <FaTimes />
                </motion.button>

                {/* Modal Image */}
                <motion.div
                  layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-image-container`}
                  className="w-full h-64 md:h-80 shrink-0 bg-surface-2 relative overflow-hidden"
                >
                  <motion.img 
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-image`}
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Bottom fade into content */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--glass-bg)] to-transparent" />
                </motion.div>

                {/* Modal Info */}
                <motion.div
                  layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-info`}
                  className="p-8 md:p-12 flex flex-col"
                >
                  <motion.h3
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-title`}
                    className="font-display text-3xl md:text-4xl font-extrabold text-ink mb-4"
                  >
                    {selectedProject.title}
                  </motion.h3>

                  {/* Tech stack with badge-blue + hover glow */}
                  <motion.div
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-tech`}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="badge-blue transition-shadow duration-300 hover:shadow-[0_0_14px_3px_color-mix(in_srgb,var(--accent)_55%,transparent)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-desc`}
                    className="text-ink-muted text-base md:text-lg leading-relaxed mb-10 whitespace-pre-wrap"
                  >
                    {selectedProject.description}
                  </motion.p>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-line"
                  >
                    {selectedProject.githubLink && (
                      <a 
                        href={selectedProject.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary btn-comet flex items-center justify-center gap-2"
                      >
                        <FaGithub size={18} /> View Source Code
                      </a>
                    )}
                    {selectedProject.liveLink && (
                      <a 
                        href={selectedProject.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl font-medium text-accent bg-surface border border-accent hover:bg-accent-soft hover:shadow-[0_0_20px_4px_color-mix(in_srgb,var(--accent)_30%,transparent)] transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                      >
                        Live Demo <FaExternalLinkAlt size={14} />
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
