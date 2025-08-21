import {
  HiLockClosed,
  HiArrowRight,
  HiColorSwatch,
  HiSparkles,
  HiCloudUpload,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

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

export default function Hero() {
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
            <Link
              to="/merge-pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              Dosya Yükle <HiCloudUpload className="h-5 w-5" />
            </Link>
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

        <aside className="h-full min-h-[420px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-shadow p-6 md:p-8 duration-300">
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
