import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * ConceptShowcase
 * Editorial divider between Hero and FeatureGrid.
 * Lives in the site's dark navy palette with cyan/purple accents.
 * Grayscale photographic plates + handwritten red SVG titles keep
 * the archival reference-page feel without clashing with the theme.
 */
export default function ConceptShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      {/* Soft glows that echo the rest of the site */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#b829dd]/8 blur-[120px]" />

      {/* Grain overlay for archival feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vertical column rules */}
      <div className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-white/5 hidden lg:block" />
      <div className="pointer-events-none absolute right-6 top-0 bottom-0 w-px bg-white/5 hidden lg:block" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#00d4ff]/80 font-mono mb-4">
            <span className="inline-block w-8 h-px bg-[#00d4ff]/60" />
            <span>Fig. 01 — Concept Plates</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', 'Georgia', serif" }}
          >
            Two extractions,
            <br />
            <em
              className="font-normal italic bg-gradient-to-r from-[#00d4ff] to-[#b829dd] bg-clip-text text-transparent"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              one grammar.
            </em>
          </h2>
          <p className="mt-6 text-[15px] sm:text-base text-gray-400 leading-relaxed max-w-2xl font-light">
            From rock to record. The same systems of value, labor, and
            extraction shape both physical mining and data mining.
          </p>
        </motion.div>

        {/* ─────────── PLATE I — MINING ─────────── */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid md:grid-cols-12 gap-6 md:gap-10 items-start mb-20 md:mb-28"
        >
          {/* Image plate */}
          <figure className="md:col-span-7 relative group">
            <div className="relative aspect-[4/3] overflow-hidden bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <img
                src="/images/Illustration1.png"
                alt="Mining illustration collage"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-[70%] transition-all duration-700"
              />
              {/* Subtle top gradient so the title reads */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
              {/* Handwritten title overlay */}
              <img
                src="/images/Mining.svg"
                alt="Mining"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-36 sm:w-48 md:w-56 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] pointer-events-none select-none"
              />
              {/* Corner tick marks for that plate feel */}
              <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/40" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/40" />
            </div>
            <figcaption className="mt-3 text-[11px] tracking-[0.25em] uppercase text-gray-500 font-mono">
              Plate I · extraction of matter
            </figcaption>
          </figure>

          {/* Body copy */}
          <div className="md:col-span-5 md:pt-8">
            <div className="text-[#00d4ff]/90 text-xs tracking-[0.35em] uppercase font-mono mb-4">
              §1 Mining
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The pit, the shaft, the seam.
            </h3>
            <p className="text-[15px] text-gray-300 leading-[1.75] mb-5 font-light">
              Industrial mining shapes landscapes, labor, and capital. From
              underground rail lines to e-waste yards, extraction leaves a
              physical record — one we can photograph, map, and audit.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed italic border-l-2 border-[#00d4ff]/40 pl-4 font-light">
              Deep-mine tunnels, shaft towers, processing plants, circuit-board
              waste, satellite views of open-pit sites.
            </p>
          </div>
        </motion.article>

        {/* Editorial separator */}
        <div className="flex items-center gap-4 my-20 md:my-24 text-white/30">
          <span className="h-px bg-white/15 flex-1" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-mono text-gray-500">
            ⟷
          </span>
          <span className="h-px bg-white/15 flex-1" />
        </div>

        {/* ─────────── PLATE II — DATA MINING (mirrored) ─────────── */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-12 gap-6 md:gap-10 items-start"
        >
          {/* Body copy */}
          <div className="md:col-span-5 md:pt-8 md:order-1 order-2">
            <div className="text-[#b829dd] text-xs tracking-[0.35em] uppercase font-mono mb-4">
              §2 Data Mining
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The dataset, the model, the trace.
            </h3>
            <p className="text-[15px] text-gray-300 leading-[1.75] mb-5 font-light">
              Data mining inherits the metaphor — and the politics. Tape
              archives, scatterplots, and inference systems treat human behavior
              as a resource to be refined into prediction.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed italic border-l-2 border-[#b829dd]/50 pl-4 font-light">
              Early computing rooms, statistical plots, woodcut diagrams of
              mechanical extraction, control-flow charts.
            </p>
          </div>

          {/* Image plate */}
          <figure className="md:col-span-7 md:order-2 order-1 relative group">
            <div className="relative aspect-[4/3] overflow-hidden bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <img
                src="/images/Illustration2.png"
                alt="Data mining illustration collage"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-[70%] transition-all duration-700"
              />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
              <img
                src="/images/Data_Mining.svg"
                alt="Data Mining"
                className="absolute top-4 left-4 sm:top-6 sm:left-6 w-44 sm:w-56 md:w-72 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] pointer-events-none select-none"
              />
              <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/40" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/40" />
            </div>
            <figcaption className="mt-3 text-[11px] tracking-[0.25em] uppercase text-gray-500 font-mono text-right">
              Plate II · extraction of inference
            </figcaption>
          </figure>
        </motion.article>
      </div>
    </section>
  );
}
