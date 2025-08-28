import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { games as G } from "./gamesRegistry";

export default function GamesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      {G?.map((game, index) => {
        return <GameCard key={index} game={game} />;
      })}
    </div>
  );
}
