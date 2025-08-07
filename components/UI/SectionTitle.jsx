// components/UI/SectionTitle.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SectionTitle({ children, subtitle, align = "center" }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-8 sm:mb-12 ${alignStyles[align]}`}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-3 sm:mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
