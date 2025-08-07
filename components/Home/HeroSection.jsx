// components/Home/HeroSection.jsx
import { motion } from "framer-motion";
import NeonButton from "../UI/NeonButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated gradient orbs - responsive positioning */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-accent-purple rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-accent-neon rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent-pink rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow" />
      </div>

      <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-glitch neon-text">
              Web Mining
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 gradient-text">
              & Data Insights
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4"
          >
            Interactive Research Platform for Mining ↔ Data-Mining Connections
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <NeonButton
              href="/visualizations"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Visualizations
            </NeonButton>
            <NeonButton
              href="/data"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Access Research Data
            </NeonButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-accent-neon rounded-full p-1">
            <div className="w-1 h-2 sm:h-3 bg-accent-neon rounded-full mx-auto animate-bounce" />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
