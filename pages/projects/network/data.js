// pages/projects/network/data.js
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHero from '@/components/Layout/PageHero';

export default function NetworkDataPage() {
  return (
    <>
      <Head>
        <title>Raw Data | Network Analysis | D_Mining Lab</title>
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="📊 Raw Data"
            title="Network Analysis Data"
            text="Access the datasets used in our network analysis visualizations. These datasets contain node and edge information for the mining and data mining company networks."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <span className="text-gray-600">›</span>
                <Link href="/projects/network" className="hover:text-white transition-colors">Network Analysis</Link>
                <span className="text-gray-600">›</span>
                <span className="text-accent-neon">Raw Data</span>
              </div>

              <div className="space-y-6">
                {/* Dataset 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8"
                >
                  <h2 className="text-lg font-semibold text-white mb-2">Mining Companies Network</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Nodes and edges for the mining companies relationship graph. Includes company names, positions, and relationship weights.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      285 nodes · 840 edges
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      Format: JSON
                    </span>
                  </div>
                </motion.div>

                {/* Dataset 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8"
                >
                  <h2 className="text-lg font-semibold text-white mb-2">Mining & Data Mining Co-occurrence Network</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Co-occurrence data mapping relationships between mining companies and data mining/tech companies. Includes URL references, country associations, and frequency data.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      540 nodes · 59 edges
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      Format: JSON / CSV
                    </span>
                  </div>
                </motion.div>

                {/* Globe data */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8"
                >
                  <h2 className="text-lg font-semibold text-white mb-2">Company Geolocation Data</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Geolocation data for Mining, Data Mining, and AI companies used in the 3D globe visualization.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      3 datasets (Mining, Data Mining, AI)
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      Format: CSV
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8">
                <Link
                  href="/projects/network"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span>←</span> Back to Network Analysis
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
