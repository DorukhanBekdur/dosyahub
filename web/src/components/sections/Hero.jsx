import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiChevronDown,
  HiLockClosed,
  HiUsers,
} from "react-icons/hi";
import ToolQuickStartCard from "../hero/ToolQuickStartCard";
import { HERO_COPY } from "../../config/heroConfig";
import { HERO_BOTTOM_FADE, LANDING_MOR_BG } from "../../config/landingTheme";

const HERO_VIEWPORT_H = "min-h-[calc(100svh-4.25rem)]";

export default function Hero() {
  const { headline, headlineAccent } = HERO_COPY;
  const parts = headline.split(headlineAccent);
  const beforeAccent = parts[0] ?? "";
  const afterAccent = parts[1] ?? "";

  return (
    <section
      className={`relative ${HERO_VIEWPORT_H} min-h-full w-full shrink-0 overflow-hidden ${LANDING_MOR_BG}`}
    >
      <div
        className={`relative mx-auto flex ${HERO_VIEWPORT_H} w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8`}
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10 xl:gap-14">
          <div className="order-1 max-w-[36rem] lg:order-none">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-300">
              <HiUsers className="h-3.5 w-3.5 text-violet-400/90" aria-hidden />
              {HERO_COPY.badge}
            </p>

            <h1 className="mt-6 text-[1.875rem] font-bold leading-[1.1] tracking-tight text-slate-50 sm:mt-7 sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem] lg:leading-[1.06] xl:text-6xl">
              {beforeAccent}
              <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {headlineAccent}
              </span>
              {afterAccent}
            </h1>

            <p className="mt-5 max-w-[32rem] text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg sm:leading-relaxed">
              {HERO_COPY.subhead}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Link
                to={HERO_COPY.ctaPrimaryTo}
                aria-label={`${HERO_COPY.ctaPrimary} — PDF birleştirme`}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm shadow-black/25 transition hover:-translate-y-0.5 hover:bg-violet-500 active:translate-y-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A13] sm:min-w-[11rem]"
              >
                {HERO_COPY.ctaPrimary}
                <HiArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                to={HERO_COPY.ctaSecondaryTo}
                aria-label={HERO_COPY.ctaSecondary}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-base font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.07] hover:text-white active:translate-y-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A13] sm:min-w-[11rem]"
              >
                {HERO_COPY.ctaSecondary}
              </Link>
            </div>

            <p className="mt-7 inline-flex items-center gap-2 text-sm text-slate-400 sm:mt-8">
              <HiLockClosed
                className="h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden
              />
              {HERO_COPY.trustPrivacy}
            </p>
          </div>

          <div className="order-2 flex w-full justify-center lg:order-none lg:justify-end">
            <ToolQuickStartCard />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-violet-300/70 animate-bounce sm:bottom-8"
        aria-hidden="true"
      >
        <HiChevronDown className="h-5 w-5" />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-b sm:h-52 ${HERO_BOTTOM_FADE}`}
        aria-hidden="true"
      />
    </section>
  );
}
