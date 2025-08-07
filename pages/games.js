import SectionTitle from "../components/UI/SectionTitle";
import GamesGrid from "../components/Games/GamesGrid";

export default function Games() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Experience data-mining concepts through interactive educational games designed to make complex topics accessible and engaging">
          Educational Mini-Games
        </SectionTitle>

        <GamesGrid />
      </div>
    </div>
  );
}
