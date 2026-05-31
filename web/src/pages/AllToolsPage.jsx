import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import {
  PDF_TOOLS,
  TOOL_FILTER_CATEGORIES,
} from "../config/toolsCatalog";

const CANONICAL = "https://www.dosyahub.com/tools";

export default function AllToolsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(() => {
    if (activeCategory === "all") return PDF_TOOLS;
    return PDF_TOOLS.filter((t) => t.categoryId === activeCategory);
  }, [activeCategory]);

  const activeLabel =
    TOOL_FILTER_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "Tümü";

  return (
    <>
      <Helmet>
        <title>Tüm PDF Araçları | DosyaHub</title>
        <meta
          name="description"
          content="PDF birleştirme, parçalama, sıkıştırma ve daha fazlası. DosyaHub’ın tüm araçlarını tek sayfada keşfedin."
        />
        <link rel="canonical" href={CANONICAL} />
      </Helmet>

      <main className="relative min-h-dvh overflow-hidden bg-[#0f0a1e] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-violet-600/12 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-indigo-600/10 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400/90">
              Araç kataloğu
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              PDF işlemleri için{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-400">
                tek adres
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              Birleştir, böl, sıkıştır ve düzenle. Tüm araçlar tarayıcıda
              çalışır; dosyaların işlem sırasında cihazında kalır.
            </p>
            <p className="mt-6 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-300">
                {PDF_TOOLS.length}
              </span>{" "}
              araç ·{" "}
              <span className="text-zinc-400">{activeLabel}</span>{" "}
              {activeCategory !== "all" && (
                <span className="text-zinc-500">
                  ({filteredTools.length} sonuç)
                </span>
              )}
            </p>
          </header>

          <div
            className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12"
            role="tablist"
            aria-label="Araç kategorileri"
          >
            {TOOL_FILTER_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                    isActive
                      ? "bg-[#7c3aed] text-white shadow-md shadow-violet-600/25"
                      : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/18 hover:bg-white/[0.05] hover:text-zinc-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <li key={tool.to}>
                <Link
                  to={tool.to}
                  className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-violet-500/30 hover:bg-violet-500/[0.06] hover:shadow-lg hover:shadow-violet-900/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/12 text-violet-400 transition group-hover:bg-violet-500/20 group-hover:text-violet-300">
                      <tool.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <HiArrowRight
                      className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-violet-400"
                      aria-hidden
                    />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-zinc-100 group-hover:text-white">
                    {tool.label}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                    {tool.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {filteredTools.length === 0 && (
            <p className="mt-16 text-center text-zinc-500">
              Bu kategoride henüz araç yok.
            </p>
          )}

          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-semibold text-zinc-200">Hesabın var mı?</p>
              <p className="mt-1 text-sm text-zinc-500">
                Oturum açarak sık kullandığın araçlara panelden ulaş.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#8b5cf6]"
            >
              Panele git
              <HiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
