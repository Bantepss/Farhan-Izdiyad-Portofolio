import { motion } from 'framer-motion';

export function Education() {
  const educationData = [
    {
      institution: "Institut Teknologi Bandung",
      degree: "Engineer's Degree, Information Technology",
      date: "Jul 2025 – Aug 2029",
      logo: "/assets/logo-placeholder.svg", // User can change this later
      grade: ""
    },
    {
      institution: "SMAN 5 Bekasi",
      degree: "High School Diploma", // Standardized to have a degree field or can just be empty string
      date: "Jul 2022 – Jul 2025",
      logo: "/assets/logo-placeholder.svg", // User can change this later
      grade: "Grade: 10-12"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink">Education</h2>
        <p className="text-ink-muted mt-3">My academic background.</p>
      </div>

      <div className="space-y-6">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="saas-card p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:border-accent/40 transition-colors"
          >
            {/* Logo */}
            <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-line bg-surface-2 flex items-center justify-center shadow-sm">
              <img 
                src={edu.logo} 
                alt={`${edu.institution} logo`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-display text-2xl font-bold text-ink mb-2">{edu.institution}</h3>
              {edu.degree && (
                <h4 className="text-lg font-medium text-accent mb-2">{edu.degree}</h4>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-semibold text-ink-subtle uppercase tracking-wide">
                <span>{edu.date}</span>
                {edu.grade && (
                  <>
                    <span className="hidden sm:inline">&bull;</span>
                    <span>{edu.grade}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
