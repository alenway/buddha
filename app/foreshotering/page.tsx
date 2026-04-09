import Footer from "./components/Footer";
import Header from "./components/Header";
import Calci from "./components/Calci";
import HeroSection from "./components/HeroSection";
import Research from "./components/Research";

export default function foreshortering() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Research />
      <Calci />
      <Footer />
    </div>
  );
}
