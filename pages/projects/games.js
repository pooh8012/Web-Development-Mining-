// pages/projects/games.js
import Head from 'next/head';
import Link from 'next/link';
import PageHero from '@/components/Layout/PageHero';
import GamesGrid from '@/components/games/GamesGrid';

export default function ProjectGamesPage() {
  return (
    <>
      <Head>
        <title>Games | D_Mining Lab Projects</title>
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="🎮 Project 1"
            title="Educational Games"
            text="The games were programmed by individuals tasked with envisioning four distinct viewpoints: a human user of digital technologies (Data Mine Game), a smartphone (Mine Them All), a specific environment (GAIA), and 'data' (Monster Byte Balance). Each game serves as a node in a complex network that intricately intertwines mining and data mining. The games aim to assist users in 'inhabiting' a particular subject-object that enables them to understand the entanglements of extractive practices."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              {/* Navigation breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <span className="text-gray-600">›</span>
                <span className="text-accent-neon">Games</span>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">
                      Playable Prototypes
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                      Each game is built with the goal of explaining one idea: surveillance, resource balance,
                      network influence, automation, etc. Click a card to launch and explore.
                    </p>
                  </div>
                  <span className="text-xs font-medium text-gray-300 bg-white/10 border border-white/20 rounded-full px-3 py-1 w-max">
                    Browser-based · No install
                  </span>
                </div>

                <GamesGrid />
              </div>
            </div>
          </section>

          {/* Navigation to other projects */}
          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Other Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/projects/network" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                  <span className="text-lg mb-1 block">🕸️</span>
                  <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Network Analyses</span>
                </Link>
                <Link href="/projects/collage" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                  <span className="text-lg mb-1 block">🖼️</span>
                  <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Collage</span>
                </Link>
                <Link href="/projects/rhetorical" className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                  <span className="text-lg mb-1 block">📝</span>
                  <span className="text-white font-medium group-hover:text-accent-neon transition-colors">Rhetorical Analysis</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
