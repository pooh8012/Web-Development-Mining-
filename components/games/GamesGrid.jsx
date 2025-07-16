// components/Games/GamesGrid.jsx
import { motion } from "framer-motion";
import GameCard from "./GameCard";

const games = [
  {
    id: "phone-character",
    title: "Phone as Character",
    description:
      "Experience data collection from a phone's perspective in this immersive narrative game",
    thumbnail: "/assets/games/phone-character.jpg",
    playTime: "15-20 mins",
    difficulty: "Easy",
    tags: ["Data Privacy", "Interactive Story"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "data-character",
    title: "Data as Character",
    description:
      "Navigate the journey of data through corporate networks and understand its lifecycle",
    thumbnail: "/assets/games/data-character.jpg",
    playTime: "20-25 mins",
    difficulty: "Medium",
    tags: ["Data Flow", "Network Analysis"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "mining-impact",
    title: "Mining Impact Simulator",
    description:
      "Balance profit and environmental impact in this strategic resource management game",
    thumbnail: "/assets/games/mining-impact.jpg",
    playTime: "30+ mins",
    difficulty: "Hard",
    tags: ["Strategy", "Environmental"],
    color: "from-green-500 to-teal-500",
  },
  {
    id: "network-builder",
    title: "Network Builder",
    description:
      "Create and analyze your own corporate connection networks with real-time feedback",
    thumbnail: "/assets/games/network-builder.jpg",
    playTime: "25-30 mins",
    difficulty: "Medium",
    tags: ["Puzzle", "Analytics"],
    color: "from-orange-500 to-red-500",
  },
];

export default function GamesGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GameCard game={game} />
        </motion.div>
      ))}
    </motion.div>
  );
}
