import { motion } from 'framer-motion';
import { SocialLinks } from '../components/SocialLinks';

export function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <div className="saas-card p-10 md:p-14 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#0F172A]">
          Ready to collaborate?
        </h1>
        
        <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
          I'm always open to discussing product design work, new projects, or partnership opportunities. Let's create something great together.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a href="mailto:farhanizdiyad2@gmail.com" className="btn-primary w-full sm:w-auto">
            Email Me
          </a>
          <a href="mailto:18225074@mahasiswa.itb.ac.id" className="px-6 py-3 rounded-xl font-medium text-[#0F172A] bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm w-full sm:w-auto">
            Campus Email
          </a>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Connect with me</p>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
