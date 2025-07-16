import HeroSection from "../components/Home/HeroSection";
import FeatureGrid from "../components/Home/FeatureGrid";
import TeamSection from "../components/Home/TeamSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <TeamSection />
    </>
  );
}
