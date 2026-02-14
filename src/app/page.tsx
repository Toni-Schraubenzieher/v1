import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import HowWeWork from "@/components/HowWeWork";
import PortfolioSlider from "@/components/PortfolioSlider";
import TeamContact from "@/components/TeamContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101010]">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <HowWeWork />
      <PortfolioSlider />
      <TeamContact />
      <Footer />
    </div>
  );
}
