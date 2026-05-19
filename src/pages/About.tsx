import { motion } from 'framer-motion';

export function About() {
  const skills = [
    "React", "TypeScript", "Tailwind CSS", "Vite", "Bun", "Framer Motion", "UI/UX Design", "Frontend Architecture"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-glow text-neon-blue">
        // PROFILE_DATA
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">About Me</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Hello, I'm Farhan Izdiyad. I specialize in building highly interactive, performant, and visually striking frontend applications. My approach combines clean code architecture with cutting-edge design paradigms.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I am constantly exploring new technologies to push the boundaries of what is possible on the web, focusing on creating seamless and immersive user experiences.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-8 rounded-2xl border-neon-purple/50"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Tech Arsenal</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span 
                key={skill}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 + (index * 0.1), type: "spring" }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(188,19,254,0.3)" }}
                className="px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-sm font-mono text-gray-200 cursor-default transition-colors duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
