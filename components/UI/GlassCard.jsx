import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../UI/NeonButton";
import GameEmbed from "../games/GameEmbed";
import { useOSDetection } from "../../hooks/useOSDetection";

// const isGameCompatible = (game, osInfo) => {
//   if (!game?.requirements) return true;
//   if (game.requirements.includes("web")) return true;
//   if (game.requirements.includes("windows") && !osInfo.isWindows) return false;
//   if (game.requirements.includes("mac") && !osInfo.isMac) return false;
//   if (game.requirements.includes("linux") && !osInfo.isLinux) return false;
//   return true;
// };

export default function GameCard({ game }) {
  // If no game yet, render nothing (avoids "reading 'color' of undefined")
  if (!game) return null;

  const [showGameModal, setShowGameModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  // const osInfo = useOSDetection();
  // const compatible = isGameCompatible(game, osInfo);

  // safe defaults
  const gradient = game?.color || "from-neutral-700 to-neutral-900";
  const tags = Array.isArray(game?.tags) ? game.tags : [];

  const handlePlayClick = () => setShowGameModal(true);

  return (
    <>
      <div className="relative">
        {/* Thumbnail / gradient banner */}
        <div
          className={`h-40 sm:h-48 rounded-lg bg-gradient-to-br ${gradient} opacity-20 mb-4 sm:mb-6 relative overflow-hidden group`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl opacity-50">
              {game?.icon || "🎮"}
            </span>
          </div>

          {/* {!compatible && (
              <div className="absolute top-2 right-2 bg-red-500/80 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Not compatible
              </div>
            )} */}

          {/* Play overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
            onClick={handlePlayClick}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent-neon/20 flex items-center justify-center mx-auto">
              <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] border-l-white border-y-[10px] sm:border-y-[12px] border-y-transparent ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
          {game?.title || "Untitled Game"}
        </h3>
        {game?.description && (
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
            {game.description}
          </p>
        )}

        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          {game?.playTime && (
            <span className="flex items-center gap-1">
              <span className="text-accent-neon">⏱</span> {game.playTime}
            </span>
          )}
          {game?.difficulty && (
            <span className="flex items-center gap-1">
              <span className="text-accent-purple">📊</span> {game.difficulty}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs rounded-full bg-glass-white border border-glass-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        {/* <div className="mt-auto space-y-2">
          <NeonButton onClick={handlePlayClick} className="w-full" size="md">
            Play on site
          </NeonButton>
          <button
            onClick={() => setShowInstructions((v) => !v)}
            className="w-full text-xs text-gray-400 hover:text-accent-neon transition-colors"
          >
            {showInstructions ? "Hide" : "Show"} Instructions
          </button>
        </div> */}

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
                  {Array.isArray(game?.instructions) &&
                  game.instructions.length > 0
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

      {/* Modal */}
      <AnimatePresence>
        {showGameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowGameModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#0a0f24] glass-panel rounded-2xl p-4 sm:p-6 max-w-5xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold">
                  {game?.title || "Game"}
                </h3>
                <button
                  onClick={() => setShowGameModal(false)}
                  className="text-gray-400 hover:text-white text-2xl ml-4"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <GameEmbed game={game} />

              {game?.type === "itch" && game?.itch?.pageUrl && (
                <div className="mt-4 text-center">
                  <a
                    href={game.itch.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-500/40 hover:bg-cyan-500/20"
                  >
                    Open on itch.io ↗
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
