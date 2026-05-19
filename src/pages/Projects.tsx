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
    >
      <motion.div 
        layoutId={`${layoutIdPrefix}-container`}
        className="saas-card overflow-hidden flex flex-col h-full bg-white relative group"
        style={{ transform: "translateZ(30px)" }} // Pop out effect
      >
        {/* Project Image */}
        <motion.div 
          layoutId={`${layoutIdPrefix}-image-container`}
          className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-100 border-b border-slate-200"
        >
          <motion.img 
            layoutId={`${layoutIdPrefix}-image`}
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Project Info */}
        <motion.div 
          layoutId={`${layoutIdPrefix}-info`}
          className="p-8 flex flex-col flex-1"
        >
          <motion.h3 layoutId={`${layoutIdPrefix}-title`} className="text-2xl font-bold text-[#0F172A] mb-3">
            {project.title}
          </motion.h3>
          <motion.p layoutId={`${layoutIdPrefix}-desc`} className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
            {project.description}
          </motion.p>

          <motion.div layoutId={`${layoutIdPrefix}-tech`} className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Project Alpha",
      description: "Deskripsi singkat mengenai proyek ini. Jelaskan masalah yang diselesaikan dan solusi yang ditawarkan. Kamu bisa mengedit teks ini kapan saja. Pada versi tampilan Expand ini, kamu bisa menulis deskripsi yang jauh lebih panjang dari sebelumnya agar pengunjung bisa membaca detail studi kasusmu secara penuh.",
      image: "/assets/proyek-1.png", 
      techStack: ["React", "Tailwind CSS", "TypeScript"], 
      githubLink: "https://github.com/Bantepss/project-alpha", 
      liveLink: "https://project-alpha.com" 
    },
    {
      title: "Project Beta",
      description: "Deskripsi singkat mengenai proyek kedua. Fokus pada arsitektur dan teknologi yang digunakan untuk membuat sistem menjadi efisien. Saat kartu ini diklik, animasi transisi mulus akan membawanya ke tengah layar seperti contoh animasi Dribbble Discover.",
      image: "/assets/proyek-2.png",
      techStack: ["Python", "Flask", "IoT"],
      githubLink: "https://github.com/Bantepss/project-beta",
      liveLink: "" 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Selected Projects</h2>
        <p className="text-[#475569] mt-3">A showcase of my recent work. Click to expand.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            onClick={() => setSelectedProject(project)}
            layoutIdPrefix={`project-${index}`}
          />
        ))}
      </div>

      {/* Expandable Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 md:p-10">
              <motion.div
                layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-container`}
                className="w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto pointer-events-auto flex flex-col shadow-2xl relative"
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
                >
                  <FaTimes />
                </motion.button>

                <motion.div 
                  layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-image-container`}
                  className="w-full h-64 md:h-80 shrink-0 bg-slate-100"
                >
                  <motion.img 
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-image`}
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div 
                  layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-info`}
                  className="p-8 md:p-12 flex flex-col bg-white"
                >
                  <motion.h3 
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-title`} 
                    className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4"
                  >
                    {selectedProject.title}
                  </motion.h3>
                  
                  <motion.div 
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-tech`} 
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {selectedProject.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-full bg-[#EFF6FF] text-[#135CC5]">
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p 
                    layoutId={`project-${projects.findIndex(p => p.title === selectedProject.title)}-desc`} 
                    className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 whitespace-pre-wrap"
                  >
                    {selectedProject.description}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-slate-100"
                  >
                    {selectedProject.githubLink && (
                      <a 
                        href={selectedProject.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center justify-center gap-2"
                      >
                        <FaGithub size={18} /> View Source Code
                      </a>
                    )}
                    {selectedProject.liveLink && (
                      <a 
                        href={selectedProject.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl font-medium text-[#135CC5] bg-white border border-[#135CC5] hover:bg-[#EFF6FF] transition-colors shadow-sm flex items-center justify-center gap-2"
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
