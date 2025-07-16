import Link from "next/link";
import { motion } from "framer-motion";

export default function NeonButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) {
  const baseStyles = `
    relative font-semibold rounded-full
    transition-all duration-300
    flex items-center justify-center
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `;

  const sizeStyles = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-accent-neon to-accent-purple
      text-primary-darker font-bold
      shadow-[0_0_20px_rgba(0,212,255,0.5)]
      hover:shadow-[0_0_30px_rgba(0,212,255,0.8)]
      hover:scale-105
    `,
    outline: `
      bg-transparent
      border-2 border-accent-neon
      text-accent-neon
      hover:bg-accent-neon hover:text-primary-darker
      hover:shadow-[0_0_20px_rgba(0,212,255,0.8)]
    `,
    ghost: `
      bg-transparent
      text-gray-300
      hover:text-accent-neon
      hover:bg-glass-white
    `,
  };

  const buttonContent = (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );

  if (href && !disabled) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
