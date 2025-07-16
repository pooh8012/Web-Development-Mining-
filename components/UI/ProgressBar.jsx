import { motion } from "framer-motion";

export default function ProgressBar({
  progress,
  showLabel = true,
  color = "neon",
}) {
  const colorStyles = {
    neon: "from-accent-neon to-accent-purple",
    purple: "from-accent-purple to-accent-pink",
    pink: "from-accent-pink to-red-500",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-semibold text-accent-neon">
            {progress}%
          </span>
        </div>
      )}
      <div className="h-2 bg-glass-white rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorStyles[color]} 
            shadow-[0_0_10px_rgba(0,212,255,0.5)]`}
        />
      </div>
    </div>
  );
}
