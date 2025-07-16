import { useState } from "react";
import GlassCard from "../UI/GlassCard";
import NeonButton from "../UI/NeonButton";
import { motion } from "framer-motion";

export default function GameCard({ game }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // In a real app, this would load the game iframe or module
  };

  return (
    <GlassCard className="h-full">
      <div className="relative">
        {/* Game thumbnail placeholder */}
        <div
          className={`h-48 rounded-lg bg-gradient-to-br ${game.color} opacity-20 mb-6 relative overflow-hidden group`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-50">🎮</span>
          </div>

          {/* Play overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
            onClick={handlePlay}
          >
            <div className="w-16 h-16 rounded-full bg-accent-neon/20 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Game info */}
        <h3 className="text-2xl font-semibold mb-3">{game.title}</h3>
        <p className="text-gray-400 mb-4">{game.description}</p>

        {/* Game metadata */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-accent-neon">⏱</span> {game.playTime}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-accent-purple">📊</span> {game.difficulty}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-glass-white border border-glass-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action button */}
        <NeonButton onClick={handlePlay} className="w-full">
          {isPlaying ? "Loading Game..." : "Play Now"}
        </NeonButton>
      </div>
    </GlassCard>
  );
}
