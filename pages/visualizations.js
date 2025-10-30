// // pages/visualizations.js
// import { useState } from 'react';
// import SectionTitle from '../components/UI/SectionTitle';
// import VisualizationContainer from '../components/Visualization/VisualizationContainer';
// import Globe3D from '../components/Visualization/Globe3D';
// import NetworkGraph from '../components/Visualization/NetworkGraph';
// import { motion } from 'framer-motion';

// export default function Visualizations() {
//   const [activeView, setActiveView] = useState('globe');
//   const [confidenceThreshold, setConfidenceThreshold] = useState(50);

//   return (
//     <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <SectionTitle subtitle="Explore global mining activity and analyze corporate network connections through interactive 3D visualizations">
//           Interactive Visualizations
//         </SectionTitle>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col sm:flex-row justify-center gap-4 mb-6 sm:mb-8"
//         >
//           <button
//             onClick={() => setActiveView('globe')}
//             className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ${
//               activeView === 'globe'
//                 ? 'bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker'
//                 : 'glass-panel text-gray-300 hover:text-white'
//             }`}
//           >
//             3D Global Mining
//           </button>
//           <button
//             onClick={() => setActiveView('network')}
//             className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ${
//               activeView === 'network'
//                 ? 'bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker'
//                 : 'glass-panel text-gray-300 hover:text-white'
//             }`}
//           >
//             Network Analysis
//           </button>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           <div className="lg:col-span-2 order-2 lg:order-1">
//             <VisualizationContainer>
//               {activeView === 'globe' ? (
//                 <Globe3D />
//               ) : (
//                 <NetworkGraph confidenceThreshold={confidenceThreshold} />
//               )}
//             </VisualizationContainer>
//           </div>

//           <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="glass-panel p-4 sm:p-6"
//             >
//               <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//                 {activeView === 'globe' ? 'Globe Controls' : 'Network Controls'}
//               </h3>
//               {activeView === 'globe' ? (
//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm text-gray-400 mb-2">
//                       Visualization Mode
//                     </label>
//                     <select className="w-60 bg-glass-white border border-glass-border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-white">
//                       <option>Mining Activity Heatmap</option>
//                       <option>Environmental Impact</option>
//                       <option>Corporate Presence</option>
//                       <option>Resource Distribution</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm text-gray-400 mb-2">
//                       Data Layer
//                     </label>
//                     <div className="space-y-2">
//                       <label className="flex items-center text-sm">
//                         <input
//                           type="checkbox"
//                           className="mr-2"
//                           defaultChecked
//                         />
//                         <span>Mining Sites</span>
//                       </label>
//                       <label className="flex items-center text-sm">
//                         <input
//                           type="checkbox"
//                           className="mr-2"
//                           defaultChecked
//                         />
//                         <span>Data Centers</span>
//                       </label>
//                       <label className="flex items-center text-sm">
//                         <input type="checkbox" className="mr-2" />
//                         <span>Trade Routes</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm text-gray-400 mb-2">
//                       Confidence Threshold: {confidenceThreshold}%
//                     </label>
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={confidenceThreshold}
//                       onChange={(e) => setConfidenceThreshold(e.target.value)}
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm text-gray-400 mb-2">
//                       Node Type
//                     </label>
//                     <div className="space-y-2">
//                       <label className="flex items-center text-sm">
//                         <input
//                           type="checkbox"
//                           className="mr-2"
//                           defaultChecked
//                         />
//                         <span>Mining Companies</span>
//                       </label>
//                       <label className="flex items-center text-sm">
//                         <input
//                           type="checkbox"
//                           className="mr-2"
//                           defaultChecked
//                         />
//                         <span>Data Companies</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6 }}
//               className="glass-panel p-4 sm:p-6"
//             >
//               <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//                 {activeView === 'globe'
//                   ? 'Global Statistics'
//                   : 'Network Statistics'}
//               </h3>
//               {activeView === 'globe' ? (
//                 <div className="space-y-2 sm:space-y-3">
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-400">Countries</span>
//                     <span className="font-semibold text-accent-neon">195</span>
//                   </div>
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-400">Mining Sites</span>
//                     <span className="font-semibold text-accent-neon">
//                       3,847
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-400">Active Regions</span>
//                     <span className="font-semibold text-accent-neon">82</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-2 sm:space-y-3">
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-400">Total Nodes</span>
//                     <span className="font-semibold text-accent-neon">147</span>
//                   </div>
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-400">Connections</span>
//                     <span className="font-semibold text-accent-neon">523</span>
//                   </div>
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-400">Avg. Confidence</span>
//                     <span className="font-semibold text-accent-neon">76%</span>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/visualizations.js
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
          {/* Page header / intro */}
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

          {/* Controls + Viz + Sidepanels */}
          <section className="pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Toggle buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
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

              {/* Layout grid: main viz + right sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* MAIN VISUALIZATION */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <VisualizationContainer>
                    {activeView === 'globe' ? (
                      <Globe3D />
                    ) : (
                      <NetworkGraph confidenceThreshold={confidenceThreshold} />
                    )}
                  </VisualizationContainer>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6 order-1 lg:order-2">
                  {/* Control Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
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
                              setConfidenceThreshold(e.target.value)
                            }
                            className="w-full accent-pink-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                            Node Type
                          </label>
                          <div className="space-y-2 text-sm">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-2 accent-pink-500"
                                defaultChecked
                              />
                              <span>Mining Companies</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-2 accent-pink-500"
                                defaultChecked
                              />
                              <span>Data Companies</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Metrics / Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
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
                        <RowStat label="Total Nodes" value="147" />
                        <RowStat label="Connections" value="523" />
                        <RowStat label="Avg. Confidence" value="76%" />
                      </div>
                    )}
                  </motion.div>
                </div>
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
