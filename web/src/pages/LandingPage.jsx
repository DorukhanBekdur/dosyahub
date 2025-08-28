import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturesGrid from "../components/sections/FeaturesGrid";
import FAQ from "../components/sections/FAQ";

const CANONICAL = "https://www.dosyahub.com/";

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <FAQ />
    </main>
  );
}
