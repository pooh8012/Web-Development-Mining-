// import SectionTitle from '../../components/UI/SectionTitle';
// import { games as G } from '../../components/games/gamesRegistry';
// import GameCard from '@/components/games/GameCard';

// export default function Games() {
//   return (
//     <div className=" pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <SectionTitle subtitle="The games were programmed by individuals tasked with envisioning four distinct viewpoints: a human user of digital technologies (Data Mine Game), a smartphone (Mine Them All), a specific environment (GAIA), and “data” (Monster Byte Balance). Each game serves as a node in a complex network that intricately intertwines mining and data mining. The games aim to assist users in “inhabiting” a particular subject-object that enables them to understand the entanglements of extractive practices.">
//           Educational Mini-Games
//         </SectionTitle>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
//           {G?.map((game, index) => {
//             return <GameCard key={index} game={game} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/games/index.js
import Head from 'next/head';
import PageHero from '@/components/Layout/PageHero';
import GamesGrid from '@/components/games/GamesGrid';

export default function GamesPage() {
  return (
    <>
      <Head>
        <title>Educational Games | Mining & Data Networks</title>
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <PageHero
            eyebrow="🎮 Educational Games"
            title="Learn by Playing"
            text="These browser games turn real mining + data-mining concepts into playable experiences. 
            We use interaction to explain power, extraction, control, and risk — without needing a textbook."
          />

          <section className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">
                      Playable Prototypes
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                      Each game is built with the goal of explaining one idea:
                      surveillance, resource balance, network influence,
                      automation, etc. Click a card to launch and explore.
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
        </main>
      </div>
    </>
  );
}
