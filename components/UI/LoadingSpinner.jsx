// components/UI/LoadingSpinner.jsx
export default function LoadingSpinner({ size = "md" }) {
  const sizeStyles = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeStyles[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-glass-border"></div>
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent 
            border-t-accent-neon animate-spin"
        ></div>
      </div>
    </div>
  );
}
