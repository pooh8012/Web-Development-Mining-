import Head from "next/head";
import HeroSection from "../components/Home/HeroSection";
import FeatureGrid from "../components/Home/FeatureGrid";
import TeamSection from "../components/Home/TeamSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Web-Development-Mining | Interactive Research Platform</title>
        <meta
          name="description"
          content="Interactive web platform for mining and data-mining research & visualization"
        />
      </Head>

      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <div id="about">
          <FeatureGrid />
        </div>

        {/* Team Section */}
        <div id="team">
          <TeamSection />
        </div>
      </div>
    </>
  );
}
