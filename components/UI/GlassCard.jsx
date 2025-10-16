import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../UI/NeonButton';
import GameEmbed from '../games/GameEmbed';

export default function GameCard({ game }) {
  if (!game) return null;

  const [showGameModal, setShowGameModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // safe defaults
  const gradient = game?.color || 'from-neutral-700 to-neutral-900';
  const tags = Array.isArray(game?.tags) ? game.tags : [];

  const handlePlayClick = () => setShowGameModal(true);

  return (
    <>
      <div className="relative group">
        {/* Enhanced Thumbnail / gradient banner */}
        <div
          className={`h-48 sm:h-56 lg:h-64 rounded-xl bg-gradient-to-br ${gradient} opacity-30 mb-4 sm:mb-6 relative overflow-hidden transition-all duration-300 group-hover:opacity-50`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl lg:text-6xl opacity-70 transition-transform duration-300 group-hover:scale-110">
              {game?.icon || '🎮'}
            </span>
          </div>

          {/* Enhanced Play overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer backdrop-blur-sm"
            onClick={handlePlayClick}
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-accent-neon/20 flex items-center justify-center mx-auto mb-2">
                <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] lg:border-l-[20px] border-l-white border-y-[8px] sm:border-y-[10px] lg:border-y-[12px] border-y-transparent ml-1" />
              </div>
              <p className="text-white text-xs sm:text-sm font-medium">
                Play Now
              </p>
            </div>
          </motion.div>

          {/* Difficulty badge */}
          {game?.difficulty && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              {game.difficulty}
            </div>
          )}
        </div>

        {/* Enhanced Game Info */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
              {game?.title || 'Untitled Game'}
            </h3>

            {/* Basic description */}
            {game?.description && (
              <p className="text-sm sm:text-base text-gray-400 mb-2 leading-relaxed">
                {game.description}
              </p>
            )}

            {/* Detailed description toggle */}
            {game?.detailedDescription && (
              <div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-xs sm:text-sm text-accent-neon hover:text-accent-purple transition-colors font-medium mb-2"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'} ↓
                </button>

                <AnimatePresence>
                  {showFullDescription && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 sm:p-4 bg-glass-white rounded-lg text-xs sm:text-sm leading-relaxed text-gray-300 mb-4">
                        {game.detailedDescription}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Enhanced Game stats */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            {game?.playTime && (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-glass-white rounded-full">
                <span className="text-accent-neon">⏱</span>
                <span className="font-medium">{game.playTime}</span>
              </span>
            )}
            {game?.difficulty && (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-glass-white rounded-full">
                <span className="text-accent-purple">📊</span>
                <span className="font-medium">{game.difficulty}</span>
              </span>
            )}
          </div>

          {/* Enhanced Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 text-xs rounded-full bg-gradient-to-r from-accent-neon/20 to-accent-purple/20 border border-accent-neon/30 text-accent-neon font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* New Features section */}
          {game?.features && game.features.length > 0 && (
            <div>
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="text-xs sm:text-sm text-gray-300 hover:text-accent-neon transition-colors font-medium mb-2 flex items-center gap-1"
              >
                <span>✨ Key Features</span>
                <span
                  className={`transition-transform duration-200 ${
                    showFeatures ? 'rotate-180' : ''
                  }`}
                >
                  ↓
                </span>
              </button>

              <AnimatePresence>
                {showFeatures && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="p-3 bg-glass-white rounded-lg">
                      <ul className="space-y-1.5">
                        {game.features.map((feature, index) => (
                          <li
                            key={index}
                            className="text-xs sm:text-sm text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-accent-neon mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Enhanced Actions */}
          <div className="mt-auto space-y-3 pt-2">
            <NeonButton onClick={handlePlayClick} className="w-full" size="md">
              <span className="flex items-center justify-center gap-2">
                <span>Play Game</span>
                <span className="text-sm">🚀</span>
              </span>
            </NeonButton>

            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full text-xs sm:text-sm text-gray-400 hover:text-accent-neon transition-colors font-medium py-2"
            >
              {showInstructions ? 'Hide Instructions' : 'How to Play'}
              <span
                className={`ml-1 transition-transform duration-200 ${
                  showInstructions ? 'rotate-180' : ''
                }`}
              >
                ↓
              </span>
            </button>
          </div>

          {/* Enhanced Instructions */}
          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 sm:p-4 bg-glass-white rounded-lg">
                  <h4 className="font-semibold mb-3 text-accent-neon text-sm sm:text-base">
                    How to Play:
                  </h4>
                  <ol className="space-y-2 list-decimal list-inside text-gray-300">
                    {game?.instructions?.length > 0
                      ? game.instructions.map((instruction, i) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm leading-relaxed"
                          >
                            {instruction}
                          </li>
                        ))
                      : [
                          'Click the Play Game button above',
                          'Allow the game to load in your browser',
                          'Use full-screen mode for the best experience',
                          'Follow in-game tutorials and enjoy!',
                        ].map((instruction, i) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm leading-relaxed"
                          >
                            {instruction}
                          </li>
                        ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {showGameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
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
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {game?.title || 'Game'}
                  </h3>
                  {game?.description && (
                    <p className="text-sm text-gray-400 mt-1">
                      {game.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowGameModal(false)}
                  className="text-gray-400 hover:text-white text-2xl ml-4 transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <GameEmbed game={game} />

              {game?.type === 'itch' && game?.itch?.pageUrl && (
                <div className="mt-4 text-center">
                  <a
                    href={game.itch.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-500/40 hover:bg-cyan-500/20 transition-colors"
                  >
                    Open on itch.io ↗
                  </a>
                </div>
              )}

              {/* Additional game info in modal */}
              {game?.features && (
                <div className="mt-4 p-4 bg-glass-white rounded-lg">
                  <h4 className="font-semibold text-accent-neon mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {game.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-accent-neon mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
