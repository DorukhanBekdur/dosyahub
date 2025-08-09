import SplitPdfCard from "../components/features/SplitPdfCard";
import InfoCard from "../components/features/InfoCard";

export default function SplitPage() {
  return (
    <section className="grid md:grid-cols-2 gap-6 md:gap-8">
      <SplitPdfCard />
      <InfoCard />
    </section>
  );
}
