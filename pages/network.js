// pages/network.js
import Head from 'next/head';
import PageHero from '@/components/Layout/PageHero';
import NetworkGraph from '@/components/Visualization/NetworkGraph';

export default function NetworkPage() {
  return (
    <>
      <Head>
        <title>Network Analysis | Mining & Data Networks</title>
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="🌐 Network Analysis"
            title="Who’s Connected to Whom"
            text="Follow the ties between mining firms, tech vendors, financiers, and logistics.
            We surface clusters, brokers, and pressure points — the actors that quietly sit in the middle."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr] gap-8">
              {/* Glass card around main network view */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  Relationship Graph
                  <span className="text-xs font-normal text-gray-400 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full">
                    Prototype
                  </span>
                </h2>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                  Each node is an actor. Each line is a relationship (ownership,
                  contract, influence, partnership). Thicker / brighter links
                  mean stronger ties. Drag to explore.
                </p>

                {/* Core force-directed graph */}
                <div className="rounded-xl bg-black/30 border border-white/10 p-4">
                  <NetworkGraph />
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-white font-medium text-sm mb-1">
                      Why this matters
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      Power is rarely public. Network structure exposes which
                      companies quietly coordinate, and which ones act as hubs
                      between multiple regions or industries.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-white font-medium text-sm mb-1">
                      How to read it
                    </div>
                    <ul className="text-gray-400 leading-relaxed text-sm space-y-1 list-disc ml-4">
                      <li>Drag nodes to pull clusters apart</li>
                      <li>Hover to highlight direct connections</li>
                      <li>Look for bridges between clusters</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
