// components/Home/FeatureGrid.jsx - Debug version
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GlassCard from "../UI/GlassCard";

const features = [
  {
    icon: "🔬",
    title: "Academic Research",
    description:
      "Deep dive into scholarly findings on corporate networks and their societal implications through our curated research database.",
    color: "from-blue-500 to-cyan-500",
    href: "/data",
  },
  {
    icon: "📊",
    title: "Interactive Visualizations",
    description:
      "Explore dynamic network graphs and geographic data with D3.js-powered visualizations that bring complex data to life.",
    color: "from-purple-500 to-pink-500",
    href: "/visualizations",
  },
  {
    icon: "🎮",
    title: "Educational Games",
    description:
      "Learn through play with our custom browser games that make data-mining concepts accessible and engaging.",
    color: "from-pink-500 to-red-500",
    href: "/games",
  },
  {
    icon: "💾",
    title: "Open Data Access",
    description:
      "Download white papers, datasets, and audio commentaries to support your own research and analysis.",
    color: "from-green-500 to-teal-500",
    href: "/data",
  },
  {
    icon: "🌐",
    title: "Network Analysis",
    description:
      "Trace partnerships between mining and tech companies through force-directed graphs with confidence thresholds.",
    color: "from-orange-500 to-yellow-500",
    href: "/visualizations",
  },
  {
    icon: "🚀",
    title: "Modern Stack",
    description:
      "Built with Next.js, Tailwind CSS, and deployed on Vercel for blazing-fast performance and scalability.",
    color: "from-teal-500 to-blue-500",
    href: "/#tech",
  },
];

export default function FeatureGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  console.log("FeatureGrid rendered, inView:", inView); // Debug log

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-red-500/10" // Added background for debugging
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Explore Our Platform
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
            Discover the intersection of traditional mining and modern
            data-mining through interactive tools and comprehensive research
            resources.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10" // Adjusted gap for better spacing
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 h-full hover:bg-white/20 transition-all duration-300">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} 
                  flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
