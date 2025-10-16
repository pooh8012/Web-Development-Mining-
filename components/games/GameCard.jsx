import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../UI/GlassCard";
import NeonButton from "../UI/NeonButton";
import GameEmbed from "./GameEmbed";
import Link from "next/link";

export default function GameCard({ game }) {
  const [showGameModal, setShowGameModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handlePlayClick = () => setShowGameModal(true);

  return (
    <>
      <div className="relative">
        {/* Game thumbnail */}
        <div
          className={`h-40 sm:h-48 rounded-lg bg-gradient-to-br ${game.color} opacity-20 mb-4 sm:mb-6 relative overflow-hidden group`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl opacity-50">
              {game.icon || "🎮"}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
            onClick={handlePlayClick}
          >
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent-neon/20 flex items-center justify-center mx-auto">
                <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] border-l-white border-y-[10px] sm:border-y-[12px] border-y-transparent ml-1" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
          {game.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
          {game.description}
        </p>

        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          {game.playTime && (
            <span className="flex items-center gap-1">
              <span className="text-accent-neon">⏱</span> {game.playTime}
            </span>
          )}
          {game.difficulty && (
            <span className="flex items-center gap-1">
              <span className="text-accent-purple">📊</span> {game.difficulty}
            </span>
          )}
        </div>

        {/* Tags */}
        {/* {game.tags?.length ? (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs rounded-full bg-glass-white border border-glass-border"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null} */}

        {/* Actions */}
        <div>
          <Link href={game?.href} target="_blank" rel="noreferrer">
            <NeonButton onClick={handlePlayClick} className="w-full" size="md">
              Play on site
            </NeonButton>
          </Link>

          <button
            onClick={() => setShowInstructions((v) => !v)}
            className="w-full text-xs text-gray-400 hover:text-accent-neon transition-colors"
          >
            {showInstructions ? "Hide" : "Show"} Instructions
          </button>
        </div>

        {/* Instructions */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              <div className="p-3 bg-glass-white rounded-lg text-xs">
                <h4 className="font-semibold mb-2">How to Play:</h4>
                <ol className="space-y-1 list-decimal list-inside text-gray-300">
                  {game.instructions?.length
                    ? game.instructions.map((t, i) => <li key={i}>{t}</li>)
                    : [
                        "Click Play on site",
                        "Use full-screen for best experience",
                        "Enjoy!",
                      ]}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
