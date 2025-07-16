import Link from "next/link";
import { motion } from "framer-motion";

export default function GlassCard({ children, href, className = "", onClick }) {
  const cardContent = (
    <div
      className={`
      glass-panel p-8 h-full
      transition-all duration-300
      hover:border-accent-neon/50
      hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]
      hover:-translate-y-1
      cursor-pointer
      group
      relative
      overflow-hidden
      ${className}
    `}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-neon/0 to-accent-purple/0 
        group-hover:from-accent-neon/10 group-hover:to-accent-purple/10 
        transition-all duration-500 pointer-events-none"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {cardContent}
    </motion.div>
  );
}
