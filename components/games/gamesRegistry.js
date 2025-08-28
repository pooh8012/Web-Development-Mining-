// Simple registry so you can add 2 more later without touching UI code.
export const games = [
  {
    id: "gaia-prototype",
    title: "Gaia Prototype",
    type: "html", // html | itch | download
    description:
      "A Twine-based interactive story exploring environment and extraction.",
    playTime: "10–15 mins",
    difficulty: "Easy",
    tags: ["Twine", "Narrative"],
    color: "from-emerald-500 to-teal-500",
    href: "/games/gaiagame",

    // Serve from /public/games/gaia/index.html
    html: { path: "/games/gaia/index.html" }, // <- make sure file exists at public/games/gaia/index.html
    requirements: ["web"], // treated as always compatible (iframe)
    icon: "🌿",
  },
  {
    id: "data-mine",
    title: "Data Mine",
    type: "itch", // tries iframe embed first, then clean fallback
    description:
      "Experience data mining themes through an artful browser experience.",
    playTime: "15–25 mins",
    difficulty: "Medium",
    tags: ["Mining", "Data", "Browser"],
    color: "from-purple-500 to-pink-500",
    href: "https://billawatts.itch.io/data-mine",
    requirements: ["web"], // treat as web (no OS block)
    icon: "⛏️",
  },
  {
    id: "godotgameenginer",
    title: "Godot Game Engine",
    description: "A versatile open-source game engine for 2D and 3D games.",
    duration: "10–20 mins",
    difficulty: "Medium",
    tags: ["Game Engine", "Open Source", "Browser"],
    // this makes GameEmbed render a local html <iframe>
    href: "/games/godotgame/",
    // optional: used by your card UI if you have one
    cover: null, // or '/images/monsterbybalance-cover.jpg'
    color: "from-indigo-500 to-fuchsia-500",
    playOnSite: true,
  },

  {
    id: "monsterbybalance",
    title: "Monster by Balance",
    description: "A physicsy balance-challenge—stack, steady, and survive.",
    duration: "10–20 mins",
    difficulty: "Medium",
    tags: ["Arcade", "Physics", "Browser"],
    // this makes GameEmbed render a local html <iframe>
    type: "html",
    href: "/games/monsterbytebalace/",
    // optional: used by your card UI if you have one
    cover: null, // or '/images/monsterbybalance-cover.jpg'
    color: "from-indigo-500 to-fuchsia-500",
    playOnSite: true,
  },
];
