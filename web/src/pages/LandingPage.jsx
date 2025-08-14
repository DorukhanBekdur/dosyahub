import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/features/FeatureCard";
import {
  HiOutlineDocumentText,
  HiLockClosed,
  HiArrowRight,
  HiColorSwatch,
  HiSparkles,
  HiCloudUpload,
  HiOutlineInformationCircle,
  HiCollection,
  HiViewGrid,
  HiPhotograph,
  HiSwitchHorizontal,
  HiDocumentText,
  HiVideoCamera,
  HiLightningBolt,
  HiRefresh,
} from "react-icons/hi";

function FeatureItem({ icon, title, desc, badgeBg, iconColor }) {
  const Icon = icon;
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md ${badgeBg}`}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
      </div>
    </li>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-[#1a0b2e] to-purple-700">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Dosyalarınızı{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              hızla
            </span>{" "}
            dönüştürün, birleştirin ve yönetin.
          </h1>
          <p className="mt-4 text-zinc-300 max-w-prose">
            Modern arayüz, güvenli altyapı ve yüksek performans ile dosya
            işlemlerinizi zahmetsizce tamamlayın.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#upload"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95"
            >
              Dosya Yükle <HiCloudUpload className="h-5 w-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-white hover:bg-white/10"
            >
              Özellikler
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-1">
              <HiLockClosed className="h-4 w-4" /> Gizlilik Öncelikli
            </span>
            <span className="inline-flex items-center gap-1">
              <HiSparkles className="h-4 w-4" /> Hızlı & Basit
            </span>
          </div>
        </div>

        <aside
          className="h-full min-h-[420px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-shadow p-6 md:p-8 duration-300
"
        >
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Neden Dosya
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Hub
            </span>{" "}
            ?
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            <FeatureItem
              icon={HiSparkles}
              title="Hızlı ve Güvenilir İşlem"
              desc="Dosyalarınızı saniyeler içinde dönüştürün ve yönetin"
              badgeBg="bg-amber-100 dark:bg-amber-900/40"
              iconColor="text-amber-600 dark:text-amber-400"
            />
            <FeatureItem
              icon={HiColorSwatch}
              title="Gelişmiş UI Tasarımı"
              desc="Modern ve kullanıcı dostu arayüz ile kolay kullanım."
              badgeBg="bg-pink-100 dark:bg-pink-900/40"
              iconColor="text-pink-600 dark:text-pink-400"
            />
            <FeatureItem
              icon={HiLockClosed}
              title="Gizlilik Öncelikli"
              desc="Dosyalarınız yalnızca kısa süreli tutulur, tamamen güvendedir."
              badgeBg="bg-sky-100 dark:bg-sky-900/40"
              iconColor="text-sky-600 dark:text-sky-400"
            />
            <FeatureItem
              icon={HiArrowRight}
              title="Geliştirme Sürecinde Olanlar"
              desc="Yakında: Yeni dosya türleri ve güçlü dönüşüm araçları yolda."
              badgeBg="bg-violet-100 dark:bg-violet-900/40"
              iconColor="text-violet-600 dark:text-violet-400"
            />
          </ul>

          <div className="mt-6 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="font-medium flex items-center gap-2">
              <HiOutlineInformationCircle className="text-zinc-500 dark:text-white" />
              Bilgi
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Büyük dosyalarda yükleme süresi internet hızınıza bağlı
              değişebilir. Sorun yaşarsanız dosya boyutunu küçültmeyi deneyin.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Version:{" "}
              <span className="text-purple-400 font-semibold">MVP-1</span>
            </span>
            <span className="italic">
              <span className="text-purple-400 font-semibold">+1000</span>
              <span className="text-white">
                ’den fazla belge güvenle işlendi
              </span>
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FeaturesGrid() {
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

function HowItWorks() {
  const steps = [
    {
      title: "Dosyanı Yükle",
      desc: "PDF (ve yakında daha fazlası) dosyanı sürükleyip bırak.",
    },
    {
      title: "Ayarları Seç",
      desc: "Birleştirme, dönüştürme veya ayırma işlemini belirle.",
    },
    { title: "İndir", desc: "İşlem tamamlanınca tek tıkla indir." },
  ];
  return (
    <section
      id="how"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Nasıl Çalışır?
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/80 dark:bg-zinc-900/80"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function UploadCTA() {
  const [pending, setPending] = useState(false);
  return (
    <section
      id="upload"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Hemen Deneyin
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Sürükle-bırak ile PDF'lerinizi birleştirin. Çok yakında daha fazla
              format desteği!
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setPending(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95"
              >
                Dosya Yükle <HiCloudUpload className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                Örnek Dosya
              </button>
            </div>
            {pending && (
              <p className="mt-3 text-xs text-zinc-500">
                (Demo için: Yükleme simüle ediliyor…)
              </p>
            )}
          </div>

          <div className="w-full md:w-[420px] rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
            <HiCloudUpload className="mx-auto h-10 w-10 text-zinc-400" />
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              PDF'lerini buraya bırak ya da yükle.
            </p>
            <p className="text-xs text-zinc-500">
              Max 50MB • Sürükle & Bırak destekli
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    {
      q: "Dosyalarım nerede tutuluyor?",
      a: "Dosyalar yalnızca işlem sırasında geçici olarak depolanır ve kısa süre sonra silinir.",
    },
    {
      q: "Ücretli mi?",
      a: "Erken erişim sürecinde temel işlemler ücretsizdir. İleride gelişmiş özellikler için uygun fiyatlı planlar sunulabilir.",
    },
    {
      q: "Hangi dosya türleri desteklenecek?",
      a: "Şu an odak PDF; sırada PNG/JPG/WEBP ve ses-dönüşüm (MP4→MP3) var.",
    },
  ];
  return (
    <section
      id="faq"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Sıkça Sorulan Sorular
        </h2>
        <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {items.map((it, idx) => (
            <li key={idx}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <span className="font-medium">{it.q}</span>
                <HiArrowRight
                  className={`h-4 w-4 transition-transform ${
                    open === idx ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {open === idx && (
                <div className="px-5 pb-5 mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {it.a}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-6xl px-4 h-14 text-xs text-zinc-500 flex items-center justify-between">
        <span>
          © {new Date().getFullYear()} DosyaHub — by{" "}
          <a
            href="https://github.com/DorukhanBekdur"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            Dorukhan Bekdur
          </a>
        </span>
        <span className="italic">Hızlı. Güvenli. Basit.</span>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <UploadCTA />
      <FAQ />
    </main>
  );
}
