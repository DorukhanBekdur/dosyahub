import FeatureCard from "../features/FeatureCard";
import {
  HiCollection,
  HiViewGrid,
  HiPhotograph,
  HiSwitchHorizontal,
  HiDocumentText,
  HiVideoCamera,
  HiLightningBolt,
  HiRefresh,
} from "react-icons/hi";

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Özellikler
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard
            icon={HiCollection}
            title="PDF Birleştirme"
            desc="PDF'leri istediğin sırayla kolayca birleştir."
            badgeColor="from-emerald-500 to-teal-600"
            to="/merge-pdf"
          />
          <FeatureCard
            icon={HiViewGrid}
            title="PDF Parçalama"
            desc="PDF’i sayfalara böl ve kolayca indir."
            badgeColor="from-sky-500 to-indigo-600"
            to="/split-pdf"
          />
          <FeatureCard
            icon={HiPhotograph}
            title="Görsel → PDF"
            desc="Kolayca PNG/JPEG görsellerini pdf'e dönüştürebilirsin."
            badgeColor="from-pink-500 to-rose-600"
          />
          <FeatureCard
            icon={HiSwitchHorizontal}
            title="PDF → Görsel"
            desc="PDF dosyanı PNG/JPEG görsellerine dönüştürebilirsin."
            badgeColor="from-violet-500 to-fuchsia-600"
            soon
          />
          <FeatureCard
            icon={HiDocumentText}
            title="Word → PDF"
            desc=".doc/.docx dosyalarını kolayca PDF’e dönüştürebilirsin."
            badgeColor="from-amber-500 to-orange-600"
            soon
          />
          <FeatureCard
            icon={HiVideoCamera}
            title="MP4 → MP3"
            desc="Videodan sesi ayıkla, MP3 olarak indir."
            badgeColor="from-cyan-500 to-blue-600"
            soon
          />
          <FeatureCard
            icon={HiLightningBolt}
            title="PDF Sıkıştırma"
            desc="Dosya boyutunu kaliteyi koruyarak küçült."
            badgeColor="from-lime-500 to-emerald-600"
            soon
          />
          <FeatureCard
            icon={HiRefresh}
            title="Sayfa Döndür/Çıkar"
            desc="Seçili sayfaları döndür veya kaldır."
            badgeColor="from-slate-500 to-zinc-600"
            soon
          />
          <FeatureCard
            icon={HiSwitchHorizontal}
            title="Toplu Dönüştürme"
            desc="Birden çok dosyayı tek seferde işle."
            badgeColor="from-purple-500 to-indigo-600"
            soon
          />
        </div>
      </div>
    </section>
  );
}
