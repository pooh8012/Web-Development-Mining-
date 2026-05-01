// pages/projects/network.js
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHero from '@/components/Layout/PageHero';
import NetworkGraphMining from '@/components/Visualization/NetworkGraphMining';
import NetworkGraphExperiment2 from '@/components/Visualization/NetworkGraphExperiment2';

export default function NetworkAnalysisPage() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);

  return (
    <>
      <Head>
        <title>Network Analysis | D_Mining Lab Projects</title>
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="🕸️ Project 2"
            title="Network Analysis"
            text="Network analysis and visualizations are used to identify key players in the development, implementation and adoption of mining as a process of extraction. These visualizations showcase centrality and interconnectedness so we can visually identify how one industry is closely connected to the other."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <span className="text-gray-600">›</span>
                <span className="text-accent-neon">Network Analysis</span>
              </div>
            </div>
          </section>

          {/* ── Network 1: Mining Companies ── */}
          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                  Mining Companies and Their Network
                  <span className="text-xs font-normal text-gray-400 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full">
                    Network 1
                  </span>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                  This visualization maps the relationships between mining companies — their ownership structures, partnerships, and influence networks. Each node is a company or entity; each edge is a relationship. Drag to explore, hover to inspect.
                </p>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <label className="text-xs sm:text-sm text-gray-400">
                    Confidence Threshold: <span className="text-white font-medium">{confidenceThreshold}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-48 accent-pink-500"
                  />
                </div>

                <div className="rounded-xl bg-black/30 border border-white/10 p-4 min-h-[400px]">
                  <NetworkGraphMining confidenceThreshold={confidenceThreshold} />
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-white font-medium text-sm mb-1">Why this matters</div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      Power is rarely public. Network structure exposes which companies quietly coordinate, and which ones act as hubs between multiple regions or industries.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-white font-medium text-sm mb-1">How to read it</div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      Drag nodes to pull clusters apart. Hover to highlight direct connections. Look for bridges between clusters. Zoom with scroll wheel.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Network 2: Mining + Data Mining Companies ── */}
          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                  Network of Mining and Data Mining Companies
                  <span className="text-xs font-normal text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    In Development
                  </span>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                  This network maps the co-occurrence relationships between mining companies and data mining/tech companies. It reveals how extractive industries in the physical and digital realms overlap and interconnect through shared infrastructure, capital, and influence.
                </p>

                <div className="rounded-xl bg-black/30 border border-white/10 p-4 min-h-[450px]">
                  <NetworkGraphExperiment2 />
                </div>

                {/* Link to raw data sub-page */}
                <div className="mt-6">
                  <Link
                    href="/projects/network/data"
                    className="inline-flex items-center gap-2 text-sm text-accent-neon hover:text-white transition-colors bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 hover:bg-white/10"
                  >
                    📊 View Raw Data
                    <span className="text-[11px]">→</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Navigation to other projects */}
          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Other Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/projects/games" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                  <span className="text-lg mb-1 block">🎮</span>
                  <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Games</span>
                </Link>
                <Link href="/projects/collage" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                  <span className="text-lg mb-1 block">🖼️</span>
                  <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Collage</span>
                </Link>
                <Link href="/projects/rhetorical" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                  <span className="text-lg mb-1 block">📝</span>
                  <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Rhetorical Analysis</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
