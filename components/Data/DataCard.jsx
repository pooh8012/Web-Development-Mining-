// components/Data/DataCard.jsx - Fixed version
import NeonButton from "../UI/NeonButton";

const fileTypeIcons = {
  PDF: "📄",
  ZIP: "📦",
  CSV: "📊",
  MP3: "🎵",
  JSON: "📋",
};

export default function DataCard({ data }) {
  const handleDownload = () => {
    console.log(`Downloading ${data.title}`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 h-full flex flex-col hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
      {/* Header with icon and file type */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{fileTypeIcons[data.fileType] || "📄"}</span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-700/50 border border-slate-600/50 text-slate-300">
          {data.fileType}
        </span>
      </div>

      {/* Title and description */}
      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
        {data.title}
      </h3>
      <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
        {data.description}
      </p>

      {/* Metadata */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Size:</span>
          <span className="text-slate-300 font-medium">{data.fileSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Updated:</span>
          <span className="text-slate-300 font-medium">{data.lastUpdated}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Downloads:</span>
          <span className="text-cyan-400 font-semibold">
            {data.downloads.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-slate-700/50 text-slate-300 border border-slate-600/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 mt-auto"
      >
        Download
      </button>
    </div>
  );
}
