import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Calci from "../Calci";
import HeroSection from "../HeroSection";
import Research from "../Research";
import "../style.css";

const thisIsUnusedAndWillBreakLint = "test";
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
