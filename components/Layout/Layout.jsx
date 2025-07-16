import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticleBackground from "../Home/ParticleBackground";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
