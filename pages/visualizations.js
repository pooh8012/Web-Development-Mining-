// pages/visualizations.jsx
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';

import SectionTitle from '@/components/UI/SectionTitle';
import VisualizationContainer from '@/components/Visualization/VisualizationContainer';
import Globe3D from '@/components/Visualization/Globe3D';
import NetworkGraph from '@/components/Visualization/NetworkGraph';

export default function VisualizationsPage() {
  const [activeView, setActiveView] = useState('globe');
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);

  return (
    <>
      <Head>
        <title>Interactive Visualizations | Mining & Data Networks</title>
        <meta
          name="description"
          content="Explore global mining activity, corporate influence networks, and data-mining infrastructure through interactive 3D views."
        />
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          {/* Page header */}
          <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-xs sm:text-sm font-medium tracking-wide text-pink-400/80 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
              >
                📊 Interactive Visualizations
              </motion.div>

              <motion.h1
                className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Mining Meets Data Infrastructure
              </motion.h1>

              <motion.p
                className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Explore global mining activity and analyze corporate network
                connections through interactive 3D visualizations. Rotate the
                globe to see extraction sites and infrastructure, or switch to
                the network view to trace how companies connect.
              </motion.p>
            </div>
          </section>

          {/* Viz + controls below */}
          <section className="pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Toggle buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <button
                  onClick={() => setActiveView('globe')}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                    activeView === 'globe'
                      ? 'bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker'
                      : 'glass-panel text-gray-300 hover:text-white'
                  }`}
                >
                  3D Global Mining
                </button>

                <button
                  onClick={() => setActiveView('network')}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                    activeView === 'network'
                      ? 'bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker'
                      : 'glass-panel text-gray-300 hover:text-white'
                  }`}
                >
                  Network Analysis
                </button>
              </motion.div>

              {/* MAIN VISUALIZATION (full width) */}
              <VisualizationContainer>
                {activeView === 'globe' ? (
                  <Globe3D />
                ) : (
                  <NetworkGraph confidenceThreshold={confidenceThreshold} />
                )}
              </VisualizationContainer>

              {/* Controls + stats BELOW the graph */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Control Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-panel p-6 border border-white/10 rounded-2xl bg-white/10 backdrop-blur-sm shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                    {activeView === 'globe'
                      ? 'Globe Controls'
                      : 'Network Controls'}
                  </h3>

                  {activeView === 'globe' ? (
                    <div className="space-y-4 text-white">
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                          Visualization Mode
                        </label>
                        <select className="w-full border border-glass-border rounded-lg px-4 py-2 text-sm sm:text-base text-white bg-white/10 backdrop-blur-sm focus:outline-none">
                          <option>Mining Activity Heatmap</option>
                          <option>Environmental Impact</option>
                          <option>Corporate Presence</option>
                          <option>Resource Distribution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                          Data Layer
                        </label>
                        <div className="space-y-2 text-sm">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2 accent-pink-500"
                              defaultChecked
                            />
                            <span>Mining Sites</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2 accent-pink-500"
                              defaultChecked
                            />
                            <span>Data Centers</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2 accent-pink-500"
                            />
                            <span>Trade Routes</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-white">
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                          Confidence Threshold: {confidenceThreshold}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={confidenceThreshold}
                          onChange={(e) =>
                            setConfidenceThreshold(Number(e.target.value || 0))
                          }
                          className="w-full accent-pink-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                          Node Types (legend)
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-panel p-6 border border-white/10 rounded-2xl bg-white/10 backdrop-blur-sm shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                    {activeView === 'globe'
                      ? 'Global Statistics'
                      : 'Network Statistics'}
                  </h3>

                  {activeView === 'globe' ? (
                    <div className="space-y-3 text-sm sm:text-base">
                      <RowStat label="Countries" value="195" />
                      <RowStat label="Mining Sites" value="3,847" />
                      <RowStat label="Active Regions" value="82" />
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm sm:text-base">
                      {/* These are illustrative; you can hook real counts later */}
                      <RowStat label="Merged Datasets" value="2" />
                      <RowStat label="Node Types" value="Persona, Obra, etc." />
                      <RowStat
                        label="Confidence Filter"
                        value={`${confidenceThreshold}%+`}
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

// Small helper component for stats
function RowStat({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-accent-neon">{value}</span>
    </div>
  );
}
