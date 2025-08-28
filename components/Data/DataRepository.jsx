// components/Data/DataRepository.jsx - Fixed version
import { useState } from "react";
import { motion } from "framer-motion";
import DataCard from "./DataCard";

const dataCategories = [
  {
    category: "Research Papers",
    items: [
      {
        id: "paper-1",
        title: "Corporate Networks in Mining Industries",
        description:
          "Comprehensive analysis of ownership structures and partnerships",
        fileType: "PDF",
        fileSize: "4.2 MB",
        lastUpdated: "2025-01-15",
        downloads: 1243,
        tags: ["Academic", "Networks", "Analysis"],
      },
      {
        id: "paper-2",
        title: "Environmental Impact Assessment 2024",
        description:
          "Annual report on mining activities and ecological consequences",
        fileType: "PDF",
        fileSize: "6.8 MB",
        lastUpdated: "2024-12-20",
        downloads: 892,
        tags: ["Environment", "Annual Report"],
      },
    ],
  },
  {
    category: "Datasets",
    items: [
      {
        id: "data-1",
        title: "Mining Company Relationships Dataset",
        description: "JSON/CSV files containing network connection data",
        fileType: "ZIP",
        fileSize: "12.5 MB",
        lastUpdated: "2025-01-10",
        downloads: 2156,
        tags: ["JSON", "CSV", "Network Data"],
      },
      {
        id: "data-2",
        title: "Geographic Mining Activity Data",
        description: "State-by-state mining operation statistics and locations",
        fileType: "CSV",
        fileSize: "3.1 MB",
        lastUpdated: "2025-01-05",
        downloads: 1678,
        tags: ["Geographic", "Statistics"],
      },
    ],
  },
  {
    category: "Audio Commentary",
    items: [
      {
        id: "audio-1",
        title: "Expert Analysis: Mining Trends 2025",
        description: "Industry expert discussion on current mining trends",
        fileType: "MP3",
        fileSize: "45.2 MB",
        lastUpdated: "2025-01-12",
        downloads: 567,
        tags: ["Audio", "Expert Analysis"],
      },
    ],
  },
  {
    category: "Visualization Assets",
    items: [
      {
        id: "viz-1",
        title: "D3.js Visualization Templates",
        description:
          "Source code for interactive network and map visualizations",
        fileType: "ZIP",
        fileSize: "8.7 MB",
        lastUpdated: "2025-01-08",
        downloads: 934,
        tags: ["Code", "D3.js", "Templates"],
      },
    ],
  },
];

export default function DataRepository() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const allItems = dataCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-all ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                  : "bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/50"
              }`}
            >
              All
            </button>
            {dataCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition-all ${
                  activeCategory === cat.category
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                    : "bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/50"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-slate-400">
        Showing{" "}
        <span className="text-cyan-400 font-semibold">
          {filteredItems.length}
        </span>{" "}
        resources
      </div>

      {/* Data grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DataCard data={item} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No resources found
          </h3>
          <p className="text-slate-400">
            Try adjusting your search terms or selected category.
          </p>
        </div>
      )}
    </div>
  );
}
