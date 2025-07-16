// pages/games.js
import SectionTitle from "../components/UI/SectionTitle";
import GamesGrid from "../components/Games/GamesGrid";

export default function Games() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Experience data-mining concepts through interactive educational games designed to make complex topics accessible and engaging">
          Educational Mini-Games
        </SectionTitle>

        <GamesGrid />
      </div>
    </div>
  );
}
