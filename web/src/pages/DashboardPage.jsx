import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  HiArrowRight,
  HiChevronRight,
  HiHome,
  HiMail,
  HiOutlineSparkles,
} from "react-icons/hi";
import { getSession } from "../lib/authSession";
import { getDashboardSections } from "../config/toolsCatalog";

const CANONICAL = "https://www.dosyahub.com/dashboard";

function greetingForNow() {
  const h = new Date().getHours();
  if (h < 12) return "Günaydın";
  if (h < 18) return "İyi günler";
  return "İyi akşamlar";
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate("/login", { replace: true, state: { from: { pathname: "/dashboard" } } });
      return;
    }
    setSession(s);
  }, [navigate]);

  const displayName = useMemo(() => {
    if (!session) return "";
    const name = session.name?.trim();
    if (name) return name.split(/\s+/)[0];
    const email = session.email;
    if (email && typeof email === "string") return email.split("@")[0] || "Kullanıcı";
    return "Kullanıcı";
  }, [session]);

  const sections = useMemo(() => getDashboardSections(), []);

  if (!session) {
    return (
      <div className="min-h-[50vh] bg-[#0f0a1e] flex items-center justify-center text-zinc-500 text-sm">
        Yönlendiriliyorsunuz…
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0f0a1e] text-white">
      <Helmet>
        <title>Panel | DosyaHub</title>
        <meta
          name="description"
          content="DosyaHub paneli: PDF birleştirme, parçalama, sıkıştırma ve diğer araçlara hızlı erişim."
        />
        <link rel="canonical" href={CANONICAL} />
      </Helmet>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-indigo-600/12 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <nav aria-label="İç gezinme" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white/5 hover:text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
          >
            <HiHome className="h-4 w-4" aria-hidden />
            Ana sayfa
          </Link>
          <HiChevronRight className="h-4 w-4 opacity-50" aria-hidden />
          <span className="text-zinc-300 font-medium">Panel</span>
        </nav>

        <header className="mb-12 lg:mb-16">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-10 md:p-12 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400/95 ring-1 ring-emerald-500/20">
                  <HiOutlineSparkles className="h-4 w-4" aria-hidden />
                  Oturum açık
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight">
                  {greetingForNow()},{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                    {displayName}
                  </span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
                  Aşağıdan istediğiniz araca geçin. Tüm işlemler tarayıcınızda
                  çalışır; dosyalarınız için kısayol ve net bir başlangıç noktası
                  sunar.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                <Link
                  to="/merge-pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0a1e]"
                >
                  Hızlı başla — Birleştir
                  <HiArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <HiMail className="h-5 w-5 text-zinc-400" aria-hidden />
                  Destek / geri bildirim
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-14 lg:space-y-16">
          {sections.map((section, si) => (
            <section
              key={section.id}
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
              style={{ animationDelay: `${80 + si * 60}ms` }}
              aria-labelledby={`dash-section-${section.id}`}
            >
              <div className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2
                    id={`dash-section-${section.id}`}
                    className="text-xl font-bold tracking-tight text-white sm:text-2xl"
                  >
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">{section.subtitle}</p>
                </div>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {section.tools.map((tool) => (
                  <li key={tool.to}>
                    <Link
                      to={tool.to}
                      className="group flex min-h-[5.5rem] gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-indigo-500/35 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0a1e]"
                      aria-label={`${tool.label}: ${tool.description}`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 transition group-hover:bg-indigo-500/25">
                        <tool.icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-white group-hover:text-indigo-100">
                            {tool.label}
                          </h3>
                          <HiArrowRight
                            className="mt-0.5 h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-indigo-400"
                            aria-hidden
                          />
                        </div>
                        <p className="mt-1 text-sm leading-snug text-zinc-500">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-zinc-500 md:mt-20">
          <p>
            İpucu: Sık kullandığınız aracı tarayıcınıza yer imlerine ekleyebilirsiniz.
            Hesap özellikleri genişledikçe burada geçmiş ve tercihler de görünecek.
          </p>
        </aside>
      </div>
    </div>
  );
}
