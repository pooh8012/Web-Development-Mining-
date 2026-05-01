import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlobeAnimated from '../components/Visualization/GlobeAnimated';

const thumbnails = [
  {
    href: '/projects',
    label: 'Projects',
    blurb: 'Games, network analyses, collages, and rhetorical analysis through digital tools.',
    icon: '🔬',
    color: 'from-purple-500 to-pink-500',
  },
  {
    href: '/team',
    label: 'Team',
    blurb: 'Meet the researchers, artists, and developers behind the D_Mining Lab.',
    icon: '👥',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    href: '/visualizations',
    label: '3D Visualization',
    blurb: 'Explore global mining activity and corporate networks through interactive 3D views.',
    icon: '🌐',
    color: 'from-green-500 to-teal-500',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>D_Mining Lab | Mining & Data Mining Research</title>
        <meta
          name="description"
          content="D_Mining Lab explores the material and conceptual intersections of resource mining and data mining."
        />
      </Head>

      <div className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen grid grid-rows-[auto_1fr] items-start overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
          <div className="relative z-10 text-center w-full max-w-5xl mx-auto pt-10">
            <span
              className="
                block font-extrabold leading-tight
                text-[clamp(1.75rem,4vw,3rem)] sm:text-[clamp(2rem,3.8vw,3.25rem)]
                bg-gradient-to-r from-[#60efff] via-[#b3a6ff] to-[#ff2ea6]
                bg-clip-text text-transparent
                drop-shadow-[0_0_18px_rgba(96,239,255,.25)]
                gradient-animate relative
                after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
                after:-bottom-2 after:h-[2px] after:w-24
                after:bg-[radial-gradient(closest-side,rgba(96,239,255,.9),transparent)]
                after:opacity-70
              "
            >
              D_Mining Lab
            </span>
          </div>

          {/* Globe */}
          <div className="w-full max-w-6xl mx-auto mt-5 h-[50vh] md:h-[52vh] lg:h-[54vh]">
            <GlobeAnimated />
          </div>

          {/* Description */}
          <div className="relative z-10 text-center w-full max-w-4xl mx-auto pb-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="mt-2 text-[clamp(0.9rem,1.5vw,1.1rem)] text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Mining/Data Mining is an ongoing project, a lab that explores the material and conceptual
              intersections of resource mining and data mining as two regimes that obey the same
              epistemological idea of extraction. Our goal is to shed light on the social, economic, and
              environmental impacts of systems that create value by extracting and manipulating material
              that has been construed as raw and open to exploitation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-4 text-[clamp(0.85rem,1.3vw,1rem)] text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              This project emerged as an idea through which we wanted to explore the intersection
              between diverse forms of extraction that power our worlds whether analog or digital.
              As time has passed, the project evolved to become a lab in which we invite students,
              faculty, creators and community organizations to think about, interact with and produce
              work related to the idea of mining and data mining. The projects we feature here are
              developed from diverse academic and epistemological perspectives: from the digital
              humanities, the visual arts, the data science, literary studies, to game studies,
              philosophy, and community organizing among others. We are constantly looking for
              connections, and people interested in thinking, producing and developing approaches
              to investigate how connected Mining and Data Mining are.
            </motion.p>
          </div>
        </section>

        {/* Concept Showcase — Plates */}
        <ConceptShowcaseInline />

        {/* Thumbnail Cards */}
        <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
                Explore the Lab
              </h2>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mt-3">
                Some of the projects we feature are:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {thumbnails.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={item.href} className="group block h-full">
                    <div className="relative rounded-2xl bg-[rgba(15,15,30,0.6)] backdrop-blur-md border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] p-6 h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_40px_160px_rgba(0,0,0,0.9)] hover:border-white/20 hover:bg-[rgba(30,30,60,0.6)]">
                      <div
                        className={`pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-[60px] transition-opacity duration-300 group-hover:opacity-30`}
                      />
                      <span className="text-3xl mb-4 relative z-10">{item.icon}</span>
                      <h3 className="text-white text-lg font-semibold leading-snug mb-2 relative z-10">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed flex-1 relative z-10">
                        {item.blurb}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[13px] font-medium text-accent-neon group-hover:text-white transition-colors duration-200 mt-4 relative z-10">
                        Learn more
                        <span className="text-[11px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* Inline ConceptShowcase — kept from existing design */
function ConceptShowcaseInline() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#b829dd]/8 blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#00d4ff]/80 font-mono mb-4">
            <span className="inline-block w-8 h-px bg-[#00d4ff]/60" />
            <span>Fig. 01 — Concept Plates</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', 'Georgia', serif" }}
          >
            Two extractions,<br />
            <em className="font-normal italic bg-gradient-to-r from-[#00d4ff] to-[#b829dd] bg-clip-text text-transparent"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              one grammar.
            </em>
          </h2>
          <p className="mt-6 text-[15px] sm:text-base text-gray-400 leading-relaxed max-w-2xl font-light">
            From rock to record. The same systems of value, labor, and extraction shape both physical mining and data mining.
          </p>
        </motion.div>

        {/* Plate I — Mining */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-12 gap-6 md:gap-10 items-start mb-20 md:mb-28"
        >
          <figure className="md:col-span-7 relative group">
            <div className="relative aspect-[4/3] overflow-hidden bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <img src="/images/Illustration1.png" alt="Mining illustration" className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-[70%] transition-all duration-700" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
              <img src="/images/Mining.svg" alt="Mining" className="absolute top-4 right-4 sm:top-6 sm:right-6 w-36 sm:w-48 md:w-56 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] pointer-events-none select-none" />
              <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/40" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/40" />
            </div>
            <figcaption className="mt-3 text-[11px] tracking-[0.25em] uppercase text-gray-500 font-mono">Plate I · extraction of matter</figcaption>
          </figure>

          <div className="md:col-span-5 md:pt-8">
            <div className="text-[#00d4ff]/90 text-xs tracking-[0.35em] uppercase font-mono mb-4">§1 Mining</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Georgia', serif" }}>
              The pit, the shaft, the seam.
            </h3>
            <p className="text-[15px] text-gray-300 leading-[1.75] mb-5 font-light">
              Industrial mining shapes landscapes, labor, and capital. From underground rail lines to e-waste yards, extraction leaves a physical record — one we can photograph, map, and audit.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed italic border-l-2 border-[#00d4ff]/40 pl-4 font-light">
              Deep-mine tunnels, shaft towers, processing plants, circuit-board waste, satellite views of open-pit sites.
            </p>
          </div>
        </motion.article>

        <div className="flex items-center gap-4 my-20 md:my-24 text-white/30">
          <span className="h-px bg-white/15 flex-1" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-mono text-gray-500">⟷</span>
          <span className="h-px bg-white/15 flex-1" />
        </div>

        {/* Plate II — Data Mining */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-12 gap-6 md:gap-10 items-start"
        >
          <div className="md:col-span-5 md:pt-8 md:order-1 order-2">
            <div className="text-[#b829dd] text-xs tracking-[0.35em] uppercase font-mono mb-4">§2 Data Mining</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Georgia', serif" }}>
              The dataset, the model, the trace.
            </h3>
            <p className="text-[15px] text-gray-300 leading-[1.75] mb-5 font-light">
              Data mining inherits the metaphor — and the politics. Tape archives, scatterplots, and inference systems treat human behavior as a resource to be refined into prediction.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed italic border-l-2 border-[#b829dd]/50 pl-4 font-light">
              Early computing rooms, statistical plots, woodcut diagrams of mechanical extraction, control-flow charts.
            </p>
          </div>

          <figure className="md:col-span-7 md:order-2 order-1 relative group">
            <div className="relative aspect-[4/3] overflow-hidden bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <img src="/images/Illustration2.png" alt="Data mining illustration" className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-[70%] transition-all duration-700" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
              <img src="/images/Data_Mining.svg" alt="Data Mining" className="absolute top-4 left-4 sm:top-6 sm:left-6 w-44 sm:w-56 md:w-72 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] pointer-events-none select-none" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/40" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/40" />
            </div>
            <figcaption className="mt-3 text-[11px] tracking-[0.25em] uppercase text-gray-500 font-mono text-right">Plate II · extraction of inference</figcaption>
          </figure>
        </motion.article>
      </div>
    </section>
  );
}
