// pages/visualizations.js
import { useState } from "react";
import SectionTitle from "../components/UI/SectionTitle";
import VisualizationContainer from "../components/Visualization/VisualizationContainer";
import Globe3D from "../components/Visualization/Globe3D";
import NetworkGraph from "../components/Visualization/NetworkGraph";
import { motion } from "framer-motion";

export default function Visualizations() {
  const [activeView, setActiveView] = useState("globe");
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Explore global mining activity and analyze corporate network connections through interactive 3D visualizations">
          Interactive Visualizations
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-6 sm:mb-8"
        >
          <button
            onClick={() => setActiveView("globe")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === "globe"
                ? "bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker"
                : "glass-panel text-gray-300 hover:text-white"
            }`}
          >
            3D Global Mining
          </button>
          <button
            onClick={() => setActiveView("network")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === "network"
                ? "bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker"
                : "glass-panel text-gray-300 hover:text-white"
            }`}
          >
            Network Analysis
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <VisualizationContainer>
              {activeView === "globe" ? (
                <Globe3D />
              ) : (
                <NetworkGraph confidenceThreshold={confidenceThreshold} />
              )}
            </VisualizationContainer>
          </div>

          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                {activeView === "globe" ? "Globe Controls" : "Network Controls"}
              </h3>
              {activeView === "globe" ? (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Visualization Mode
                    </label>
                    <select className="w-60 bg-glass-white border border-glass-border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-white">
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
                    <div className="space-y-2">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span>Mining Sites</span>
                      </label>
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span>Data Centers</span>
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" />
                        <span>Trade Routes</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Confidence Threshold: {confidenceThreshold}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={confidenceThreshold}
                      onChange={(e) => setConfidenceThreshold(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Node Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span>Mining Companies</span>
                      </label>
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span>Data Companies</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                {activeView === "globe"
                  ? "Global Statistics"
                  : "Network Statistics"}
              </h3>
              {activeView === "globe" ? (
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Countries</span>
                    <span className="font-semibold text-accent-neon">195</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Mining Sites</span>
                    <span className="font-semibold text-accent-neon">
                      3,847
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Active Regions</span>
                    <span className="font-semibold text-accent-neon">82</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Total Nodes</span>
                    <span className="font-semibold text-accent-neon">147</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Connections</span>
                    <span className="font-semibold text-accent-neon">523</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Avg. Confidence</span>
                    <span className="font-semibold text-accent-neon">76%</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
