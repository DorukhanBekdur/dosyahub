import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCloudUpload,
  HiCursorClick,
  HiDownload,
  HiLockClosed,
} from "react-icons/hi";

import {
  HOW_BOTTOM_FADE,
  HOW_TOP_FADE,
  LANDING_MOR_BG_HOW,
} from "../../config/landingTheme";

const STEPS = [
  {
    step: 1,
    title: "Aracı seç",
    desc: "İhtiyacınıza uygun PDF aracını seçin: birleştirme, parçalama, sıkıştırma veya dönüştürme.",
    icon: HiCursorClick,
  },
  {
    step: 2,
    title: "Dosyayı yükle",
    desc: "PDF veya görsellerinizi sürükleyip bırakın ya da cihazınızdan seçin.",
    icon: HiCloudUpload,
  },
  {
    step: 3,
    title: "İndir ve bitir",
    desc: "İşlem tamamlandığında sonucunuz hazır olur. Tek tıkla indirin.",
    icon: HiDownload,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className={`relative overflow-hidden ${LANDING_MOR_BG_HOW} pt-16 pb-20 sm:pt-20 sm:pb-24`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-36 bg-gradient-to-b ${HOW_TOP_FADE}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 bg-gradient-to-b ${HOW_BOTTOM_FADE}`}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Nasıl{" "}
            <span className="bg-gradient-to-r from-violet-300/95 to-violet-400 bg-clip-text text-transparent">
              çalışır?
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            PDF işlemlerinizi üç basit adımda tamamlayın. Kurulum yok, karmaşık
            ayar yok.
          </p>
        </header>

        <ol className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((item) => (
            <StepCard key={item.step} item={item} />
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-7 sm:mt-14">
          <div className="inline-flex max-w-xl items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-center text-sm leading-relaxed text-slate-400">
            <HiLockClosed
              className="h-4 w-4 shrink-0 text-emerald-400"
              aria-hidden
            />
            İşlemler tarayıcınızda gerçekleşir; dosyalarınız işlem sırasında
            cihazınızda kalır.
          </div>

          <Link
            to="/merge-pdf"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-600 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A13]"
          >
            İlk işlemini başlat
            <HiArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StepCard({ item }) {
  const Icon = item.icon;

  return (
    <li className="list-none">
      <article className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 text-center shadow-lg shadow-black/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/25 hover:bg-white/[0.05] sm:min-h-[272px] sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col">
          <span className="mx-auto mb-4 flex h-7 w-7 items-center justify-center rounded-full border border-violet-400/15 bg-violet-500/10 text-xs font-semibold text-violet-200/90 shadow-sm shadow-black/10">
            {item.step}
          </span>

          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-300/90 ring-1 ring-violet-400/15 transition-all duration-300 group-hover:bg-violet-500/20 group-hover:text-violet-100 group-hover:shadow-md group-hover:shadow-violet-500/10 sm:mb-6 sm:h-16 sm:w-16">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
          </span>

          <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400 sm:mt-3 sm:text-[15px]">
            {item.desc}
          </p>
        </div>
      </article>
    </li>
  );
}
