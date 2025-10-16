import { motion } from 'framer-motion';
import NeonButton from '../UI/NeonButton';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20 md:pt-0">
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display font-bold mb-3 sm:mb-6 leading-tight">
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl animate-glitch neon-text">
              Web Development Mining
            </span>
            <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-3 gradient-text">
              and Data mining + AI
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-8 md:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed"
          >
            Interactive Research Platform for Mining ↔ Data Mining Connections
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2"
          >
            <NeonButton
              href="/visualizations"
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4"
            >
              Explore Visualizations
            </NeonButton>
            <NeonButton
              href="/games"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4"
            >
              Explore Games
            </NeonButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
