import { motion, type Variants } from 'framer-motion';
import { SocialLinks } from '../components/SocialLinks';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Contact() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* ── Decorative watermark text ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-display font-extrabold tracking-widest uppercase"
          style={{
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            color: 'var(--ink)',
            opacity: 0.04,
            lineHeight: 1,
          }}
        >
          CONTACT
        </span>
      </div>

      {/* ── Main card ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-80px' }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div
          className="glass-panel rounded-3xl p-14 md:p-20 text-center border border-line/30"
        >
          {/* ── Transmission signal dot ── */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span
              className="glow-node inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </motion.div>

          {/* ── Title ── */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-ink"
          >
            Ready to collaborate?
          </motion.h1>

          {/* ── Accent underline bar ── */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span
              className="inline-block mt-3 h-1 w-16 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent), transparent)',
              }}
            />
          </motion.div>

          {/* ── Subtitle ── */}
          <motion.p
            variants={itemVariants}
            className="text-ink-muted text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
          >
            I'm always open to discussing product design work, new projects, or
            partnership opportunities. Let's create something great together.
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14"
          >
            <a
              href="mailto:farhanizdiyad2@gmail.com"
              className="btn-primary btn-comet w-full sm:w-auto text-center"
            >
              Email Me
            </a>
            <a
              href="mailto:18225074@mahasiswa.itb.ac.id"
              className="glass-panel px-6 py-3 rounded-xl font-medium text-ink hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_-4px_rgba(79,141,240,0.35)] transition-all duration-300 w-full sm:w-auto text-center"
            >
              Campus Email
            </a>
          </motion.div>

          {/* ── Divider with glowing center dot ── */}
          <motion.div variants={itemVariants} className="relative mb-10">
            <div className="border-t border-accent/20" />
            <span
              className="glow-node absolute left-1/2 -translate-x-1/2 -top-[5px] inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </motion.div>

          {/* ── Social links ── */}
          <motion.div variants={itemVariants}>
            <p className="text-sm font-semibold text-ink-subtle uppercase tracking-wider mb-6">
              Connect with me
            </p>
            <div className="flex justify-center">
              <SocialLinks />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
