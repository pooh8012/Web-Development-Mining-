// components/games/gamesRegistry.js - Enhanced games registry with detailed descriptions
export const games = [
  {
    id: "gaia-prototype",
    title: "GAIA",
    type: "html",
    description:
      "An immersive narrative experience from the perspective of our planet Earth.",
    detailedDescription:
      "GAIA invites players to experience the world through the eyes of the Earth itself. This Twine-based interactive story explores the delicate relationship between environmental preservation and resource extraction. As players navigate through branching storylines, they witness how mining activities impact ecosystems, climate patterns, and the planet's health. The game presents complex environmental dilemmas without simple answers, encouraging players to consider the interconnected nature of human activity and planetary wellbeing. Through GAIA's perspective, players gain insight into the long-term consequences of short-term economic decisions and explore alternative approaches to sustainable resource management.",
    playTime: "10–15 mins",
    difficulty: "Easy",
    tags: ["Environmental", "Narrative", "Twine", "Perspective"],
    color: "from-emerald-500 to-teal-500",
    href: "/games/gaiagame",
    html: { path: "/games/gaia/index.html" },
    requirements: ["web"],
    icon: "🌍",
    features: [
      "Multi-branching storylines",
      "Environmental impact visualization",
      "Planetary perspective gameplay",
      "Educational environmental content",
    ],
    instructions: [
      "Click through text choices to progress the story",
      "Consider the long-term environmental impact of each decision",
      "Explore different narrative branches by replaying",
      "Reflect on the relationship between extraction and preservation",
    ],
  },
  {
    id: "data-mine",
    title: "Data Mine",
    type: "itch",
    description:
      "A thought-provoking exploration of digital extraction and data mining practices.",
    detailedDescription:
      "Data Mine challenges players to examine the often invisible world of digital data extraction. This browser-based experience draws parallels between traditional mining operations and the modern practice of harvesting personal information. Players navigate through various digital environments, uncovering how their online activities generate valuable data commodities. The game reveals the infrastructure behind data collection, processing, and monetization while questioning who benefits from these digital extraction processes. Through interactive scenarios and real-world case studies, players develop a deeper understanding of digital privacy, surveillance capitalism, and the true cost of 'free' online services.",
    playTime: "15–25 mins",
    difficulty: "Medium",
    tags: ["Digital Privacy", "Data Ethics", "Educational", "Interactive"],
    color: "from-purple-500 to-pink-500",
    href: "https://billawatts.itch.io/data-mine",
    requirements: ["web"],
    icon: "⛏️",
    features: [
      "Real-world data mining scenarios",
      "Interactive privacy demonstrations",
      "Corporate data flow visualizations",
      "Personal data impact assessment",
    ],
    instructions: [
      "Navigate through different digital environments",
      "Interact with data collection points to learn their function",
      "Compare traditional mining with digital data extraction",
      "Complete scenarios to unlock deeper insights",
    ],
  },
  {
    id: "mine-them-all",
    title: "Mine Them All",
    type: "html",
    description:
      "Experience the world from a smartphone's perspective in the age of data mining.",
    detailedDescription:
      "Mine Them All offers a unique gaming experience by placing players in the role of a smartphone navigating the complex world of data collection and user interaction. Built with Godot Engine, this game explores themes of digital consciousness and the smartphone's role as both a tool and participant in data mining operations. Players must balance user satisfaction with data collection objectives while managing battery life, processing power, and storage capacity. The game raises questions about digital agency, the nature of smart devices, and their role in modern surveillance systems. Through puzzle-solving and resource management, players gain insight into the hidden computational processes that power our connected world.",
    playTime: "20–30 mins",
    difficulty: "Medium",
    tags: ["Godot", "Resource Management", "Digital Consciousness", "Puzzle"],
    color: "from-indigo-500 to-blue-500",
    href: "/games/godotgame/",
    html: { path: "/games/godot/MnDMSmartphone.html" },
    requirements: ["web"],
    icon: "📱",
    features: [
      "Smartphone perspective gameplay",
      "Resource management mechanics",
      "Data collection simulation",
      "User interaction scenarios",
    ],
    instructions: [
      "Manage your device's resources efficiently",
      "Balance data collection with user privacy",
      "Solve puzzles to unlock new capabilities",
      "Navigate the tension between functionality and surveillance",
    ],
  },
  {
    id: "monster-byte-balance",
    title: "Monster Byte Balance",
    type: "html",
    description:
      "A physics-based game where data itself becomes the protagonist in a digital balancing act.",
    detailedDescription:
      "Monster Byte Balance transforms abstract data concepts into tangible, physics-driven gameplay. In this unique arcade experience, players embody data entities navigating through unstable digital environments. The game uses physics simulation to represent how data moves, accumulates, and affects system stability. Players must carefully balance different types of data - personal information, metadata, processed analytics - while avoiding system crashes and data corruption. Each level presents new challenges related to data storage, processing limitations, and the delicate equilibrium required to maintain digital infrastructure. The game serves as both an entertaining physics puzzler and an educational tool for understanding data management challenges in modern computing systems.",
    playTime: "15–25 mins",
    difficulty: "Medium-Hard",
    tags: ["Physics", "Arcade", "Data Visualization", "Balance"],
    color: "from-red-500 to-orange-500",
    href: "/games/monsterbytebalace/",
    html: { path: "/games/monsterbytebalance/index.html" },
    requirements: ["web"],
    icon: "⚖️",
    features: [
      "Physics-based data mechanics",
      "Progressive difficulty scaling",
      "System stability challenges",
      "Data type variety and interactions",
    ],
    instructions: [
      "Use physics controls to balance data elements",
      "Prevent system overloads and crashes",
      "Stack different data types strategically",
      "Master the physics to achieve higher scores",
    ],
  },
];
