import Head from 'next/head';
import HeroSection from '../components/Home/HeroSection';
import FeatureGrid from '../components/Home/FeatureGrid';
import TeamSection from '../components/Home/TeamSection';
import VisualizationsPage from './visualizations';

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
        {/* Hero / intro */}
        <HeroSection />
        <VisualizationsPage />
        {/* Feature / About (this already has id="about" INSIDE FeatureGrid) */}
        <FeatureGrid />

        {/* Team (this already has id="team" INSIDE TeamSection) */}
        <TeamSection />
      </div>
    </>
  );
}
