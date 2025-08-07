// components/Games/DemoPreview.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import NeonButton from "../UI/NeonButton";

export default function DemoPreview({ onClose }) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      title: "Windows User Experience",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">1. Game Launch</h4>
            <div className="bg-black/50 rounded p-4">
              <p className="text-sm text-gray-300 mb-3">
                When Windows users click "Play Now", they see:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Instant download starts (45 MB)</li>
                <li>• Windows Defender scan confirmation</li>
                <li>• Game extracts automatically</li>
                <li>• Desktop shortcut created</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <img
              src="/assets/demo/windows-download.png"
              alt="Windows download"
              className="w-full rounded"
            />
            <p className="text-xs text-gray-500 mt-2">
              Simulated Windows download experience
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Game Installation",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">
              2. Installation Process
            </h4>
            <div className="bg-black/50 rounded p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-neon w-3/4 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Extracting game files...
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>DataMine.exe extracted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Game assets loaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>DirectX checked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Gameplay Preview",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">
              3. In-Game Experience
            </h4>
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
              {/* Simulated game screen */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs">
                      <p className="text-accent-neon">SCORE: 1,240</p>
                      <p className="text-accent-purple">LEVEL: 3</p>
                    </div>
                    <div className="text-xs text-right">
                      <p className="text-green-400">DATA: 45/100</p>
                      <p className="text-red-400">SECURITY: 65%</p>
                    </div>
                  </div>

                  {/* Game grid */}
                  <div className="grid grid-cols-8 gap-1 mx-auto max-w-sm">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded ${
                          i % 7 === 0
                            ? "bg-accent-neon/30"
                            : i % 11 === 0
                            ? "bg-red-500/30"
                            : "bg-gray-700/30"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 bg-accent-neon rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 text-xs bg-black/70 px-2 py-1 rounded">
                Actual gameplay footage
              </div>
            </div>
          </div>

          <div className="bg-accent-neon/10 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <strong>Controls:</strong> Arrow keys to move, Space to mine data,
              Shift to activate shield
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Windows Experience Demo</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentScreen
                  ? "w-8 bg-accent-neon"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Screen content */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-4 text-center gradient-text">
            {screens[currentScreen].title}
          </h4>
          {screens[currentScreen].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <NeonButton
            variant="outline"
            size="sm"
            onClick={() => setCurrentScreen(Math.max(0, currentScreen - 1))}
            disabled={currentScreen === 0}
          >
            Previous
          </NeonButton>

          <span className="text-sm text-gray-400">
            Step {currentScreen + 1} of {screens.length}
          </span>

          {currentScreen === screens.length - 1 ? (
            <NeonButton size="sm" onClick={onClose}>
              Close Demo
            </NeonButton>
          ) : (
            <NeonButton
              size="sm"
              onClick={() =>
                setCurrentScreen(
                  Math.min(screens.length - 1, currentScreen + 1)
                )
              }
            >
              Next
            </NeonButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Update the GameModal to include demo preview
export function GameModalWithDemo({
  game,
  osInfo,
  isCompatible,
  onClose,
  onDownload,
  isLoading,
}) {
  const [showDemo, setShowDemo] = useState(false);

  // Add demo button in the incompatible section
  return (
    <>
      {/* ... existing modal content ... */}

      {!isCompatible && (
        <div className="mt-6 p-4 bg-accent-neon/5 rounded-lg border border-accent-neon/20">
          <h4 className="font-semibold mb-2">🎮 See What You're Missing</h4>
          <p className="text-sm text-gray-300 mb-3">
            Curious about the Windows experience? View our interactive demo:
          </p>
          <NeonButton
            size="sm"
            onClick={() => setShowDemo(true)}
            className="w-full"
          >
            Launch Windows Demo
          </NeonButton>
        </div>
      )}

      {/* Demo Preview */}
      {showDemo && <DemoPreview onClose={() => setShowDemo(false)} />}
    </>
  );
}
