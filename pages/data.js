// pages/data.js
import Head from 'next/head';
import { motion } from 'framer-motion';

import DataRepository from '@/components/Data/DataRepository';

export default function DataPage() {
  const stats = [
    {
      label: 'Research Papers',
      count: '24',
      icon: '📄',
      color: 'text-blue-400',
    },
    { label: 'Datasets', count: '16', icon: '📊', color: 'text-green-400' },
    { label: 'Audio Files', count: '8', icon: '🎵', color: 'text-purple-400' },
    { label: 'Code Assets', count: '12', icon: '💻', color: 'text-orange-400' },
  ];

  return (
    <>
      <Head>
        <title>Data Repository | Mining & Data Networks</title>
        <meta
          name="description"
          content="Access research materials, datasets, and audio commentary about mining and data infrastructure."
        />
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          {/* Hero / Intro */}
          <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-xs sm:text-sm font-medium tracking-wide text-pink-400/80 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
              >
                💾 Open Data Access
              </motion.div>

              <motion.h1
                className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Data Repository
              </motion.h1>

              <motion.p
                className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Access research materials, datasets, and documentation to
                support analysis of how physical extraction (mining) and digital
                extraction (data-mining) overlap.
              </motion.p>
            </div>
          </section>

          {/* Stats tiles */}
          <section className="px-4 sm:px-6 lg:px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 text-center shadow-[0_30px_120px_rgba(0,0,0,0.8)] hover:border-accent-neon/50 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.count}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Repository list / coming soon */}
          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <DataRepository />
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
}
