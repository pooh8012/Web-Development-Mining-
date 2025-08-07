import { motion } from "framer-motion";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function VisualizationContainer({ children, loading = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative overflow-hidden"
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="w-full h-full">{children}</div>
      )}
    </motion.div>
  );
}
