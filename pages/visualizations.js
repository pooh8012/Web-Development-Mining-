// pages/visualizations.js
import { useState } from "react";
import SectionTitle from "../components/UI/SectionTitle";
import VisualizationContainer from "../components/Visualization/VisualizationContainer";
import USMap from "../components/Visualization/USMap";
import NetworkGraph from "../components/Visualization/NetworkGraph";
import { motion } from "framer-motion";

export default function Visualizations() {
  const [activeView, setActiveView] = useState("map");

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Explore mining activity across the United States and analyze corporate network connections through interactive data visualizations">
          Interactive Visualizations
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setActiveView("map")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === "map"
                ? "bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker"
                : "glass-panel text-gray-300 hover:text-white"
            }`}
          >
            US Mining Map
          </button>
          <button
            onClick={() => setActiveView("network")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeView === "network"
                ? "bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker"
                : "glass-panel text-gray-300 hover:text-white"
            }`}
          >
            Network Analysis
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VisualizationContainer>
              {activeView === "map" ? <USMap /> : <NetworkGraph />}
            </VisualizationContainer>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6"
            >
              <h3 className="text-xl font-semibold mb-4">
                {activeView === "map" ? "Map Controls" : "Network Controls"}
              </h3>
              {activeView === "map" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Data Layer
                    </label>
                    <select className="w-full bg-glass-white border border-glass-border rounded-lg px-4 py-2 text-white">
                      <option>Mining Activity</option>
                      <option>Environmental Impact</option>
                      <option>Economic Value</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Time Period
                    </label>
                    <input
                      type="range"
                      min="2010"
                      max="2025"
                      defaultValue="2025"
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Confidence Threshold
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="50"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Node Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Mining Companies</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Data Companies</span>
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
              className="glass-panel p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Nodes</span>
                  <span className="font-semibold text-accent-neon">147</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connections</span>
                  <span className="font-semibold text-accent-neon">523</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Confidence</span>
                  <span className="font-semibold text-accent-neon">76%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
