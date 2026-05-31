import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturesGrid from "../components/sections/FeaturesGrid";
import FAQ from "../components/sections/FAQ";

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-[#070A13] text-zinc-900">
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <FAQ />
    </main>
  );
}
