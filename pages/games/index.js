import GamesGrid from "@/components/games/GamesGrid";
import SectionTitle from "../../components/UI/SectionTitle";
import { games as G } from "../../components/games/gamesRegistry";
import GameCard from "@/components/games/GameCard";

export default function Games() {
  return (
    <div className=" pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          subtitle="These educational mini-games were created by fellows who imagined technology from four unique viewpoints: 
  (1) a human user of digital tools — Data Mine Game, 
  (2) a smartphone — Mine Them All, 
  (3) an environment — GAIA, and 
  (4) data itself — Monster Byte Balance. 
  Each game is a node in an interconnected network that explores the entanglements between mining and data-mining. Together, they invite players to step into different subject-objects and experience the complexities of extractive practices."
        >
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
