import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoElementsShowcase from "@/components/LogoElementsShowcase";
import WhoWeAre from "@/components/WhoWeAre";
import HowWeWork from "@/components/HowWeWork";
import Statement from "@/components/Statement";
import Portfolio from "@/components/Portfolio";
import PortfolioOverview from "@/components/PortfolioOverview";
import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <Hero />
      <LogoElementsShowcase />
      <HowWeWork />
      <Statement />
      <PortfolioOverview />
      <Portfolio />
      <WhoWeAre />
      <AboutUs />
      <FAQ />
      <GetInTouch />
    </div>
  );
}
