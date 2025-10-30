// pages/gaming.js
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function GamingPage() {
  // Each object here is one "brief"
  const games = [
    {
      emoji: '🌍',
      title: 'Gaia Resource Balance',
      tagline: 'Extraction pressure vs. ecological stability.',
      about:
        'Gaia is a resource management simulation built to expose the tension between industrial demand and environmental limits. As the player, you are asked to keep production high enough to satisfy global demand  but every expansion creates damage that pushes the system toward collapse.',
      whyItMatters:
        'This game frames mining as a system, not as an isolated mine site. It helps players understand feedback loops, diminishing returns, and why “just mine more” isn’t actually stable.',
      teaches: [
        'Resource extraction trade-offs',
        'Ecological stress / tipping points',
        'Long-term vs short-term incentives',
      ],
      tech: ['HTML5', 'Browser-based', 'No install required'],
      playHref: '/games/gaia/index.html',
      external: false,
    },
    {
      emoji: '📱',
      title: 'Data Miner (Smartphone Build)',
      tagline: 'Surveillance as extraction.',
      about:
        'Data Miner places you inside the logic of a “smart” device. The experience shows how routine actions ocation checks, messages, clicks, scroll time — are quietly captured, profiled, and routed outward to other actors.',
      whyItMatters:
        'We talk about mining physical materials, but behavioral data is also mined, packaged, and sold. This prototype makes that connection visible. It asks: who benefits from your activity, and how do they convert attention into leverage?',
      teaches: [
        'Behavioral tracking pipelines',
        'Hidden data brokerage flows',
        'How personal data becomes product',
      ],
      tech: ['Godot Export', 'WASM/WebGL', 'Runs in browser'],
      playHref: '/godot/MnDMSmartphone.html',
      external: false,
    },
    {
      emoji: '👾',
      title: 'Monster Byte Balance',
      tagline: 'Throughput, dependency, and system load.',
      about:
        'Monster Byte Balance is an arcade loop where you harvest energy, feed infrastructure, and try to prevent failure. You’re constantly pushed to keep increasing input, even when that pressure starts destabilizing the system.',
      whyItMatters:
        'It’s basically a metaphor for industrial scaling: the cost of staying “up” gets higher over time, and strain propagates. You’re never really “done,” you’re just delaying collapse.',
      teaches: [
        'Systems under constant demand',
        'Dependency chains',
        'Failure cascades',
      ],
      tech: ['HTML5', 'Keyboard / Arrow Keys', 'Fast loop gameplay'],
      playHref: '/monsterbytebalance/index.html',
      external: false,
    },
    {
      emoji: '🛰️',
      title: 'Data Mine',
      tagline: 'Who owns the pipeline from ground to cloud?',
      about:
        'Data Mine explores the connection between physical extraction (rare earths, minerals, industrial logistics) and digital extraction (data capture, inference, prediction). It treats “the mine” as both literal and informational.',
      whyItMatters:
        'This work is about power. It asks you to think about who sits in the middle: who brokers raw material, who brokers human behavioral data, and how both forms of extraction get normalized as “just infrastructure.”',
      teaches: [
        'Material + data extraction as a single supply chain',
        'Labor, compliance, and control',
        'Where value accumulates (and where harm lands)',
      ],
      tech: ['Browser build (itch.io)', 'Playable demo'],
      playHref: 'https://billawatts.itch.io/data-mine',
      external: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Educational Games | Mining & Data Networks</title>
        <meta
          name="description"
          content="Playable research prototypes that explain extraction, surveillance, infrastructure pressure, and global networks through interactive systems instead of slides."
        />
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          {/* Page Intro */}
          <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Pill / Eyebrow */}

              {/* Title */}
              <motion.h1
                className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Interactive Systems, Not Just Slides
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Each prototype below is a focused model. Instead of telling you
                “what’s happening,” it lets you feel the pressure of extraction,
                optimization, surveillance, and control — the same way real
                infrastructures feel it.
              </motion.p>
            </div>
          </section>

          {/* Game Briefs */}
          <section className="pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              {games.map((game, i) => (
                <GameBrief key={i} game={game} index={i} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function GameBrief({ game, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.07 }}
      className="relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-[0_40px_140px_rgba(0,0,0,0.9)]"
    >
      {/* header row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* left side: title / tagline */}
        <div className="flex items-start gap-4">
          {/* icon bubble */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-2xl shadow-lg">
            {game.emoji}
          </div>

          <div>
            <h2 className="text-2xl sm:text-[1.4rem] font-semibold text-white leading-tight">
              {game.title}
            </h2>

            <p className="text-sm text-accent-neon font-medium mt-1">
              {game.tagline}
            </p>
          </div>
        </div>

        {/* right side: CTA */}
        <div className="md:text-right">
          <a
            href={game.playHref}
            target={game.external ? '_blank' : '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-gradient-to-br from-pink-500 to-red-500 text-primary-darker text-sm font-semibold px-4 py-2 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,0,128,0.4)] focus:outline-none"
          >
            {game.external ? 'Open on itch.io' : 'Play in Browser'}
          </a>

          <div className="mt-2 flex flex-wrap gap-2 text-[10px] sm:text-[11px] text-gray-300">
            {game.tech.map((tag) => (
              <span
                key={tag}
                className="bg-white/10 border border-white/20 rounded-full px-2 py-[2px] leading-none font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* content body */}
      <div className="mt-6 grid md:grid-cols-2 gap-8 text-gray-300 text-sm sm:text-base leading-relaxed">
        {/* about */}
        <div>
          <SectionHeading>What it is</SectionHeading>
          <p className="text-gray-300">{game.about}</p>

          <SectionHeading className="mt-6">Why it matters</SectionHeading>
          <p className="text-gray-300">{game.whyItMatters}</p>
        </div>

        {/* teaches list */}
        <div>
          <SectionHeading>Key ideas you experience</SectionHeading>
          <ul className="mt-2 space-y-2 text-gray-300 list-disc list-outside ml-5">
            {game.teaches.map((line, idx) => (
              <li key={idx} className="marker:text-accent-neon">
                {line}
              </li>
            ))}
          </ul>

          <CalloutNote />
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Tiny heading inside each brief
 */
function SectionHeading({ children, className = '' }) {
  return (
    <h3
      className={`text-white font-semibold text-sm sm:text-base mb-2 flex items-center gap-2 ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-neon shadow-[0_0_12px_rgba(0,255,200,0.8)]" />
      <span>{children}</span>
    </h3>
  );
}

/**
 * A soft note at bottom of the right column.
 * This helps make it feel like a research product, not a student game jam.
 */
function CalloutNote() {
  return (
    <div className="mt-6 text-[11px] sm:text-xs leading-relaxed text-gray-400 bg-white/5 border border-white/10 rounded-lg p-4">
      These prototypes are part of an ongoing research effort linking physical
      extraction (minerals, land, labor) and digital extraction (behavioral
      data, attention, predictive control). They’re designed for teaching,
      public literacy, and policy conversation — not commercial release.
    </div>
  );
}
