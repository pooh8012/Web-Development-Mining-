import { motion } from "framer-motion";
import NeonButton from "../UI/NeonButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-purple rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-neon rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-pink rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block animate-glitch neon-text">Web Mining</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 gradient-text">
              & Data Insights
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Interactive Research Platform for Mining ↔ Data-Mining Connections
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NeonButton href="/visualizations" size="lg">
              Explore Visualizations
            </NeonButton>
            <NeonButton href="/data" variant="outline" size="lg">
              Access Research Data
            </NeonButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-accent-neon rounded-full p-1">
            <div className="w-1 h-3 bg-accent-neon rounded-full mx-auto animate-bounce" />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
