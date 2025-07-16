export default function handler(req, res) {
  const { type } = req.query;

  // Mock data based on type
  const mockData = {
    papers: [
      {
        id: 1,
        title: "Corporate Networks in Mining Industries",
        description: "Comprehensive analysis of ownership structures",
        url: "/data/papers/corporate-networks.pdf",
      },
    ],
    datasets: [
      {
        id: 1,
        title: "Mining Company Relationships",
        format: "JSON",
        url: "/data/datasets/relationships.json",
      },
    ],
    audio: [
      {
        id: 1,
        title: "Expert Analysis 2025",
        duration: "45:32",
        url: "/data/audio/expert-analysis.mp3",
      },
    ],
  };

  if (mockData[type]) {
    res.status(200).json({ data: mockData[type] });
  } else {
    res.status(404).json({ error: "Data type not found" });
  }
}
