import { motion } from 'framer-motion';
import NeonButton from '../UI/NeonButton';
import VisualizationContainer from '../Visualization/VisualizationContainer';
import GlobeAnimated from '../Visualization/GlobeAnimated';

export default function HeroSection() {
  return (
    <section
      className="
        relative min-h-screen
        grid grid-rows-[auto_1fr]
        items-start
        overflow-hidden
        px-4 sm:px-6 lg:px-8
        pt-20  
      "
    >
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto pt-10">
        <span
          className="
    block font-extrabold leading-tight
    text-[clamp(1.75rem,4vw,3rem)] sm:text-[clamp(2rem,3.8vw,3.25rem)]
    bg-gradient-to-r from-[#60efff] via-[#b3a6ff] to-[#ff2ea6]
    bg-clip-text text-transparent
    drop-shadow-[0_0_18px_rgba(96,239,255,.25)]
    gradient-animate
    relative
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
    after:-bottom-2 after:h-[2px] after:w-24
    after:bg-[radial-gradient(closest-side,rgba(96,239,255,.9),transparent)]
    after:opacity-70
  "
        >
          Data mining / Mining
        </span>
      </div>

      {/* Globe fills the remaining viewport height */}
      <div className="w-full max-w-6xl mx-auto mt-5  h-[50vh] md:h-[52vh] lg:h-[54vh]">
        <GlobeAnimated />
      </div>
      {/* Header */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="mt-2 text-[clamp(0.95rem,1.6vw,1.15rem)] text-gray-300 max-w-3xl mx-auto"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{' '}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <NeonButton
            href="/visualizations"
            size="lg"
            className="w-full sm:w-auto px-6 py-3"
          >
            Explore Visualizations
          </NeonButton>
          <NeonButton
            href="/games"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-6 py-3"
          >
            Explore Games
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
}
