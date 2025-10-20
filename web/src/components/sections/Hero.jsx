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
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(60rem_60rem_at_20%_-10%,theme(colors.indigo.400/40),transparent_60%),radial-gradient(50rem_50rem_at_110%_10%,theme(colors.purple.400/35),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center animate-heroReveal">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            Dosya işlemlerini{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              saniyeler içinde
            </span>{" "}
            tamamla.
          </h1>

          <p className="mt-5 text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl">
            DosyaHub, PDF birleştirme, bölme, dönüştürme ve düzenleme
            işlemlerini tek bir platformda toplar. Güvenli, hızlı ve modern bir
            deneyim.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/merge-pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Hemen Başla <HiCloudUpload className="h-5 w-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-colors"
            >
              Özellikleri Keşfet
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <HiLockClosed className="h-4 w-4 text-purple-300" /> Güvenli İşlem
            </span>
            <span className="inline-flex items-center gap-2">
              <HiSparkles className="h-4 w-4 text-indigo-300" /> Hızlı & Basit
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-zinc-400">
            <div className="h-[1px] w-8 bg-zinc-500/40" />
            <p>
              Her gün{" "}
              <span className="text-purple-200 font-semibold">
                binlerce dosya
              </span>{" "}
              güvenle dönüştürülüyor.
            </p>
          </div>
        </div>

        <aside className="h-full min-h-[420px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-shadow p-6 md:p-8 duration-300 animate-heroFadeSlow">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Neden Dosya
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Hub
            </span>
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

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-heroReveal { animation: heroReveal 1.1s cubic-bezier(.2,.7,.2,1) both; }

        @keyframes heroFadeSlow {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-heroFadeSlow { animation: heroFadeSlow .9s ease-out .15s both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-heroReveal,
          .animate-heroFadeSlow { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
