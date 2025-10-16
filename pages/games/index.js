import SectionTitle from '../../components/UI/SectionTitle';
import { games as G } from '../../components/games/gamesRegistry';
import GameCard from '@/components/games/GameCard';

export default function Games() {
  return (
    <div className=" pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="The games were programmed by individuals tasked with envisioning four distinct viewpoints: a human user of digital technologies (Data Mine Game), a smartphone (Mine Them All), a specific environment (GAIA), and “data” (Monster Byte Balance). Each game serves as a node in a complex network that intricately intertwines mining and data mining. The games aim to assist users in “inhabiting” a particular subject-object that enables them to understand the entanglements of extractive practices.">
          Educational Mini-Games
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {G?.map((game, index) => {
            return <GameCard key={index} game={game} />;
          })}
        </div>
      </div>
    </div>
  );
}
