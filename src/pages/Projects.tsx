import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export function Projects() {
  const projects = [
    {
      title: "Project Alpha",
      description: "Deskripsi singkat mengenai proyek ini. Jelaskan masalah yang diselesaikan dan solusi yang ditawarkan. Kamu bisa mengedit teks ini kapan saja.",
      image: "/assets/proyek-1.png", 
      techStack: ["React", "Tailwind CSS", "TypeScript"], 
      githubLink: "https://github.com/Bantepss/project-alpha", 
      liveLink: "https://project-alpha.com" 
    },
    {
      title: "Project Beta",
      description: "Deskripsi singkat mengenai proyek kedua. Fokus pada arsitektur dan teknologi yang digunakan untuk membuat sistem menjadi efisien.",
      image: "/assets/proyek-2.png",
      techStack: ["Python", "Flask", "IoT"],
      githubLink: "https://github.com/Bantepss/project-beta",
      liveLink: "" 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto py-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-glow text-neon-blue font-mono">
        // PROJECT_ARCHIVE
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="glass-panel rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300 flex flex-col"
          >
            {/* Project Image */}
            <div className="relative h-48 sm:h-60 w-full overflow-hidden border-b border-white/10">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-80" />
            </div>

            {/* Project Info */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 text-[10px] sm:text-xs font-mono rounded-md bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links / Actions */}
              <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={16} /> Source Code
                  </a>
                )}
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-neon-blue transition-colors"
                  >
                    <FaExternalLinkAlt size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
