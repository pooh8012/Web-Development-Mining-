// pages/data.js - Fixed version
import Head from "next/head";
import DataRepository from "../components/Data/DataRepository";
import { motion } from "framer-motion";

export default function Data() {
  const stats = [
    {
      label: "Research Papers",
      count: "24",
      icon: "📄",
      color: "text-blue-400",
    },
    { label: "Datasets", count: "16", icon: "📊", color: "text-green-400" },
    { label: "Audio Files", count: "8", icon: "🎵", color: "text-purple-400" },
    { label: "Code Assets", count: "12", icon: "💻", color: "text-orange-400" },
  ];

  return (
    <>
      <Head>
        <title>Data Repository | Web-Development-Mining</title>
        <meta
          name="description"
          content="Access comprehensive research materials, datasets, and documentation"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Data Repository
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
                Access comprehensive research materials, datasets, and
                documentation to support your analysis of mining and data-mining
                connections
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.count}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Repository */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <DataRepository />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
