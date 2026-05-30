import { motion } from 'framer-motion';
import { SocialLinks } from '../components/SocialLinks';

export function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <div className="saas-card p-10 md:p-14 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-4 text-ink">
          Ready to collaborate?
        </h1>

        <p className="text-ink-muted text-lg mb-10 max-w-xl mx-auto">
          I'm always open to discussing product design work, new projects, or partnership opportunities. Let's create something great together.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a href="mailto:farhanizdiyad2@gmail.com" className="btn-primary w-full sm:w-auto">
            Email Me
          </a>
          <a href="mailto:18225074@mahasiswa.itb.ac.id" className="px-6 py-3 rounded-xl font-medium text-ink bg-surface-2 border border-line hover:border-accent/40 hover:text-accent transition-colors shadow-sm w-full sm:w-auto">
            Campus Email
          </a>
        </div>

        <div className="pt-8 border-t border-line">
          <p className="text-sm font-semibold text-ink-subtle uppercase tracking-wider mb-6">Connect with me</p>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
