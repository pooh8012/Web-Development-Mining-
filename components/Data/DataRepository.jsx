// components/Data/DataRepository.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import DataCard from "./DataCard";
import NeonButton from "../UI/NeonButton";

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
    <div>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-glass-white border border-glass-border rounded-lg px-4 py-3 
                text-white placeholder-gray-400 focus:border-accent-neon transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker"
                  : "glass-panel text-gray-300 hover:text-white"
              }`}
            >
              All
            </button>
            {dataCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat.category
                    ? "bg-gradient-to-r from-accent-neon to-accent-purple text-primary-darker"
                    : "glass-panel text-gray-300 hover:text-white"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-gray-400"
      >
        Showing {filteredItems.length} resources
      </motion.div>

      {/* Data grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <DataCard data={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
