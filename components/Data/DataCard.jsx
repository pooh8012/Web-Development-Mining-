import GlassCard from "../UI/GlassCard";
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
    // In a real app, this would trigger the download
    console.log(`Downloading ${data.title}`);
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{fileTypeIcons[data.fileType] || "📄"}</span>
        <span className="px-3 py-1 text-xs rounded-full bg-glass-white border border-glass-border">
          {data.fileType}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{data.description}</p>

      {/* Metadata */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Size:</span>
          <span className="text-gray-300">{data.fileSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Updated:</span>
          <span className="text-gray-300">{data.lastUpdated}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Downloads:</span>
          <span className="text-accent-neon font-semibold">
            {data.downloads.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs rounded bg-glass-white">
            {tag}
          </span>
        ))}
      </div>

      <NeonButton
        onClick={handleDownload}
        variant="outline"
        className="w-full mt-auto"
      >
        Download
      </NeonButton>
    </GlassCard>
  );
}
