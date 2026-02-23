import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import WhoWeAre from "@/components/WhoWeAre";
import HowWeWork from "@/components/HowWeWork";
import Statement from "@/components/Statement";
import Portfolio from "@/components/Portfolio";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E0E0E0]">
      <Navbar />
      <Hero />
      <LogoCloud />
      <WhoWeAre />
      <HowWeWork />
      <Statement />
      <Portfolio />
      <AboutUs />
    </div>
  );
}
