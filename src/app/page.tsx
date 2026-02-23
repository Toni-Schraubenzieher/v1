import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import HowWeWork from "@/components/HowWeWork";
import Statement from "@/components/Statement";
import Portfolio from "@/components/Portfolio";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <HowWeWork />
      <Statement />
      <Portfolio />
      <AboutUs />
    </div>
  );
}
