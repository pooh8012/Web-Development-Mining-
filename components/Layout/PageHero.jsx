// components/Layout/PageHero.jsx
import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
      {/* subtle backdrop glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,128,0.15)_0%,transparent_60%)]" />

      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs sm:text-sm font-medium tracking-wide text-pink-400/80 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
          >
            {eyebrow}
          </motion.div>
        )}

        <motion.h1
          className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
