// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import Visualizations from '@/pages/visualizations';

// const features = [
//   {
//     icon: '📊',
//     title: 'Interactive Visualizations',
//     description:
//       'Explore dynamic network graphs and geographic data with D3.js-powered visualizations that bring complex data to life.',
//     color: 'from-purple-500 to-pink-500',
//     href: '/visualizations',
//   },
//   {
//     icon: '🎮',
//     title: 'Educational Games',
//     description:
//       'Learn through play with our custom browser games that make data-mining concepts accessible and engaging.',
//     color: 'from-pink-500 to-red-500',
//     href: '/games',
//   },
//   {
//     icon: '💾',
//     title: 'Open Data Access',
//     description:
//       'Download white papers, datasets, and audio commentaries to support your own research and analysis.',
//     color: 'from-green-500 to-teal-500',
//     href: '/data',
//   },
//   {
//     icon: '🌐',
//     title: 'Network Analysis',
//     description:
//       'Trace partnerships between mining and tech companies through force-directed graphs with confidence thresholds.',
//     color: 'from-orange-500 to-yellow-500',
//     href: '/visualizations',
//   },
// ];

// export default function FeatureGrid() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <section
//       id="about"
//       className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-red-500/10 mt-16 sm:mt-0"
//     >
//       <div className="mt-5">
//         <Visualizations />
//       </div>

//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-8 sm:mb-12 lg:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
//             Explore Our Platform
//           </h2>
//           <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
//             Discover the intersection of traditional mining and modern
//             data-mining through interactive tools and comprehensive research
//             resources.
//           </p>
//         </motion.div>

//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? 'visible' : 'hidden'}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6"
//         >
//           {features.map((feature, index) => (
//             <motion.div key={index} variants={itemVariants}>
//               <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 h-full hover:bg-white/20 transition-all duration-300">
//                 <div
//                   className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color}
//                   flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-lg`}
//                 >
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// components/Home/FeatureGrid.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const features = [
  {
    icon: '📊',
    label: '3D Globe Visualizations',
    blurb:
      'Explore dynamic network graphs and geographic data with D3.js-powered visualizations that reveal how extraction, capital, and infrastructure connect.',
    color: 'from-purple-500 to-pink-500',
    href: '/visualizations',
  },
  {
    icon: '🎮',
    label: 'Educational Games',
    blurb:
      'Play research-backed simulations that model surveillance, resource pressure, and system collapse — not as theory, but as lived tension.',
    color: 'from-pink-500 to-red-500',
    href: '/gaming',
  },
  {
    icon: '💾',
    label: 'Open Data Access',
    blurb:
      'Download white papers, datasets, and audio walk-throughs designed for students, journalists, and policy work — not just academics.',
    color: 'from-green-500 to-teal-500',
    href: '/data',
  },
  {
    icon: '🌐',
    label: 'Network Analysis',
    blurb:
      'Trace partnerships between mining, logistics, cloud, and AI vendors through force-directed relationship graphs and confidence-ranked links.',
    color: 'from-orange-500 to-yellow-500',
    href: '/network',
  },
];

export default function FeatureGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Section animation
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12 },
    },
  };

  // Individual card animation
  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="about"
      className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top intro / headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* subtle pill */}
          <div className="inline-block text-[10px] sm:text-xs font-medium tracking-wide text-pink-400/80 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm mb-4">
            Platform Overview
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            Four Ways In
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mt-4">
            Discover how we study extraction in both senses — physical mining
            and data-mining through tools you can touch, explore, and reuse.
          </p>
        </motion.div>

        {/* Feature blocks */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="
            grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8
          "
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              variants={itemVariants}
              className="group relative rounded-2xl bg-[rgba(15,15,30,0.6)]/60 backdrop-blur-md border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] p-5 sm:p-6 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_40px_160px_rgba(0,0,0,0.9)] hover:border-white/20 hover:bg-[rgba(30,30,60,0.6)]"
            >
              {/* soft radial glow behind icon */}
              <div
                className={`
                  pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full
                  bg-gradient-to-br ${feature.color} opacity-20 blur-[60px]
                  transition-opacity duration-300 group-hover:opacity-30
                `}
              />

              {/* header row: icon + title */}
              <div className="relative flex items-start gap-4">
                {/* Icon bubble */}
                <div
                  className={`
                    flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color}
                    flex items-center justify-center text-2xl sm:text-3xl font-normal shadow-xl
                    ring-1 ring-white/20
                  `}
                >
                  {feature.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-white text-lg sm:text-xl font-semibold leading-snug flex items-center gap-2">
                    {feature.label}
                    <span className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </span>
                  </h3>

                  <p className="text-[11px] sm:text-xs text-gray-500/80 leading-relaxed">
                    Click to explore this area
                  </p>
                </div>
              </div>

              {/* body text */}
              <p className="relative text-sm sm:text-base text-gray-300 leading-relaxed mt-5">
                {feature.blurb}
              </p>

              {/* footer link */}
              <div className="relative mt-6 flex items-center justify-between text-xs text-gray-400">
                <Link
                  href={feature.href}
                  scroll={true}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-accent-neon group-hover:text-white transition-colors duration-200"
                >
                  <span>Learn more</span>
                  <span
                    className="text-[11px] text-accent-neon group-hover:translate-x-1 group-hover:text-white transition-all duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>

                {/* subtle divider dot row for balance */}
                <div className="flex items-center gap-1 text-[10px] text-gray-600">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                </div>
              </div>

              {/* clickable overlay to make whole card act like link */}
              <Link
                href={feature.href}
                scroll={true}
                className="absolute inset-0"
                aria-label={feature.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
