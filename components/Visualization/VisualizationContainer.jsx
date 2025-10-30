import { motion } from 'framer-motion';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function VisualizationContainer({
  children,
  loading = false,
  className = '',
  noMinHeight = false, // fill parent height when true
  bare = false, // NEW: no glass, no padding (perfect for the globe)
}) {
  const base = ['relative overflow-hidden'];

  if (bare) {
    base.push('bg-transparent border-0 shadow-none'); // strip panel styling
  } else {
    base.push('glass-panel', 'p-4', 'sm:p-5', 'lg:p-6');
  }

  if (noMinHeight) {
    base.push('h-full');
  } else {
    base.push('min-h-[380px]', 'sm:min-h-[460px]', 'lg:min-h-[540px]');
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={[...base, className].join(' ')}
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
