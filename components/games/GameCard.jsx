// components/Games/GameCard.jsx
import { useState } from "react";
import GlassCard from "../UI/GlassCard";
import NeonButton from "../UI/NeonButton";
import { motion, AnimatePresence } from "framer-motion";
import { useOSDetection } from "../../hooks/useOSDetection";

export default function GameCard({ game }) {
  const [showGameModal, setShowGameModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const osInfo = useOSDetection();

  // Check if game is compatible with current OS
  const isCompatible = () => {
    if (!game.requirements) return true;
    if (game.requirements.includes("windows") && !osInfo.isWindows)
      return false;
    if (game.requirements.includes("mac") && !osInfo.isMac) return false;
    if (game.requirements.includes("linux") && !osInfo.isLinux) return false;
    return true;
  };

  const handlePlayClick = () => {
    if (isCompatible()) {
      setShowGameModal(true);
    }
  };

  const handleDownload = () => {
    setIsLoading(true);
    // Track download
    console.log(`Downloading ${game.title} for ${osInfo.os}`);

    // Redirect to download
    setTimeout(() => {
      window.open(game.downloadUrl || game.itchUrl, "_blank");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <GlassCard className="h-full flex flex-col">
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

            {/* Compatibility badge */}
            {!isCompatible() && (
              <div className="absolute top-2 right-2 bg-red-500/80 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {osInfo.os === "mac" ? "Windows Only" : `Not for ${osInfo.os}`}
              </div>
            )}

            {/* Play overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
              onClick={handlePlayClick}
            >
              <div className="text-center">
                {isCompatible() ? (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent-neon/20 flex items-center justify-center mx-auto">
                    <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] border-l-white border-y-[10px] sm:border-y-[12px] border-y-transparent ml-1" />
                  </div>
                ) : (
                  <div className="text-white">
                    <span className="text-3xl mb-2 block">⚠️</span>
                    <span className="text-sm">Windows Required</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Game info */}
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
            {game.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
            {game.description}
          </p>

          {/* Game metadata */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <span className="text-accent-neon">⏱</span> {game.playTime}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent-purple">📊</span> {game.difficulty}
            </span>
            {game.fileSize && (
              <span className="flex items-center gap-1">
                <span className="text-accent-pink">💾</span> {game.fileSize}
              </span>
            )}
          </div>

          {/* OS Requirements */}
          <div className="flex items-center gap-2 mb-3 text-xs">
            <span className="text-gray-500">Platforms:</span>
            <div className="flex gap-2">
              {game.requirements?.includes("windows") && (
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    osInfo.isWindows
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  Windows
                </span>
              )}
              {game.requirements?.includes("mac") && (
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    osInfo.isMac
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  macOS
                </span>
              )}
              {game.requirements?.includes("linux") && (
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    osInfo.isLinux
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  Linux
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
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

          {/* Action buttons */}
          <div className="mt-auto space-y-2">
            <NeonButton
              onClick={handlePlayClick}
              className="w-full"
              size="md"
              variant={isCompatible() ? "primary" : "outline"}
            >
              {isCompatible() ? "Play Now" : "View Options"}
            </NeonButton>

            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full text-xs text-gray-400 hover:text-accent-neon transition-colors"
            >
              {showInstructions ? "Hide" : "Show"} Instructions
            </button>
          </div>

          {/* Instructions dropdown */}
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
                    {game.instructions?.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    )) || [
                      "Click Play Now to start",
                      "Follow the in-game tutorial",
                      "Complete objectives to progress",
                    ]}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>

      {/* Game Modal */}
      <AnimatePresence>
        {showGameModal && (
          <GameModal
            game={game}
            osInfo={osInfo}
            isCompatible={isCompatible()}
            onClose={() => setShowGameModal(false)}
            onDownload={handleDownload}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Game Modal Component
function GameModal({
  game,
  osInfo,
  isCompatible,
  onClose,
  onDownload,
  isLoading,
}) {
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-primary-dark glass-panel rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
            <p className="text-gray-400">{game.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl ml-4"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {isCompatible ? (
            // Compatible OS - Show download/play options
            <div className="text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-neon/20 to-accent-purple/20 flex items-center justify-center">
                  <span className="text-6xl">{game.icon || "🎮"}</span>
                </div>
                <p className="text-green-400 mb-2">
                  ✓ Compatible with {osInfo.os}
                </p>
              </div>

              <div className="space-y-4">
                {game.webVersion ? (
                  <NeonButton
                    onClick={() => window.open(game.webVersion, "_blank")}
                    className="mx-auto"
                  >
                    Play in Browser
                  </NeonButton>
                ) : (
                  <NeonButton
                    onClick={onDownload}
                    disabled={isLoading}
                    className="mx-auto"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⚙️</span> Preparing
                        Download...
                      </span>
                    ) : (
                      "Download Game"
                    )}
                  </NeonButton>
                )}

                <div className="text-sm text-gray-400">
                  <p>Size: {game.fileSize || "Unknown"}</p>
                  <p>Version: {game.version || "1.0"}</p>
                </div>
              </div>
            </div>
          ) : (
            // Incompatible OS - Show alternatives
            <div>
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  System Requirements Not Met
                </h4>
                <p className="text-gray-300">
                  This game requires <strong>Windows</strong> to run. You're
                  currently using{" "}
                  <strong className="capitalize">{osInfo.os}</strong>.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Available Options:</h4>

                {/* Option 1: Alternative methods */}
                <div className="glass-panel p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-accent-neon">
                    Option 1: Compatibility Tools
                  </h5>
                  {osInfo.isMac && (
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>
                        • Use <strong>Wine</strong> or{" "}
                        <strong>CrossOver</strong> to run Windows apps
                      </li>
                      <li>
                        • Set up <strong>Parallels Desktop</strong> or{" "}
                        <strong>VMware Fusion</strong>
                      </li>
                      <li>
                        • Install <strong>Boot Camp</strong> for dual-boot setup
                      </li>
                    </ul>
                  )}
                  {osInfo.isLinux && (
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>
                        • Use <strong>Wine</strong> or <strong>Lutris</strong>
                      </li>
                      <li>
                        • Try <strong>Proton</strong> via Steam
                      </li>
                      <li>
                        • Set up a Windows VM with <strong>VirtualBox</strong>
                      </li>
                    </ul>
                  )}
                  {osInfo.isMobile && (
                    <p className="text-sm text-gray-300">
                      This game requires a desktop computer. Please visit on a
                      Windows PC.
                    </p>
                  )}
                </div>

                {/* Option 2: Watch gameplay */}
                {game.videoUrl && (
                  <div className="glass-panel p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 text-accent-purple">
                      Option 2: Watch Gameplay
                    </h5>
                    <p className="text-sm text-gray-300 mb-3">
                      Can't play? Watch a full playthrough instead!
                    </p>
                    <NeonButton
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(game.videoUrl, "_blank")}
                    >
                      Watch on YouTube
                    </NeonButton>
                  </div>
                )}

                {/* Option 3: Download anyway */}
                <div className="glass-panel p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-accent-pink">
                    Option 3: Download Anyway
                  </h5>
                  <p className="text-sm text-gray-300 mb-3">
                    You can still download the game files to try with
                    compatibility tools.
                  </p>
                  <NeonButton
                    variant="outline"
                    size="sm"
                    onClick={onDownload}
                    disabled={isLoading}
                  >
                    Download Windows Version
                  </NeonButton>
                </div>
              </div>

              {/* Demo Mode */}
              <div className="mt-6 p-4 bg-accent-neon/5 rounded-lg border border-accent-neon/20">
                <h4 className="font-semibold mb-2">🎮 Demo Mode</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Want to see what Windows users experience? View our
                  interactive demo:
                </p>
                <NeonButton
                  size="sm"
                  onClick={() => setShowAlternatives(true)}
                  className="w-full"
                >
                  Launch Demo Preview
                </NeonButton>
              </div>
            </div>
          )}
        </div>

        {/* Demo Preview Modal */}
        <AnimatePresence>
          {showAlternatives && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-4"
              onClick={() => setShowAlternatives(false)}
            >
              <div
                className="bg-primary-dark rounded-lg p-6 max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">
                  Windows Experience Demo
                </h3>
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-500">
                    {/* Here you could embed a video or interactive demo */}
                    [Game Demo/Screenshots Would Display Here]
                  </p>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  This is what Windows users see when they launch the game.
                </p>
                <NeonButton
                  onClick={() => setShowAlternatives(false)}
                  variant="outline"
                  size="sm"
                >
                  Close Demo
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
