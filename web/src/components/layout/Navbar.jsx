import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../common/Logo";
import {
  HiCollection,
  HiViewGrid,
  HiArchive,
  HiPhotograph,
  HiTrash,
  HiRefresh,
} from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";

const TOOLS = [
  {
    title: "PDF Düzenle",
    items: [
      { to: "/merge-pdf", label: "PDF Birleştirme", icon: HiCollection },
      { to: "/split-pdf", label: "PDF Parçalama", icon: HiViewGrid },
      { to: "/compress-pdf", label: "PDF Sıkıştırma", icon: HiArchive },
      { to: "/organize-pdf", label: "PDF Sıralama", icon: HiArrowsUpDown },
      { to: "/remove-pages-pdf", label: "PDF Sayfa Silme", icon: HiTrash },
      { to: "/images-to-pdf", label: "Görsel → PDF", icon: HiPhotograph },
      { to: "/rotate-pdf", label: "PDF Döndürme", icon: HiRefresh },
    ],
  },
];

const linkBase =
  "relative text-sm transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100";
const active = "text-zinc-900 dark:text-zinc-100 after:w-full";

const underline =
  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-[width] after:duration-300 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 hover:after:w-full";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toolsBtnRef = useRef(null);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (
        toolsOpen &&
        !toolsMenuRef.current?.contains(e.target) &&
        !toolsBtnRef.current?.contains(e.target)
      ) {
        setToolsOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [toolsOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setToolsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 dark:bg-zinc-900/90 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            : "bg-white/60 dark:bg-zinc-900/50"
        }
        backdrop-blur-md border-b border-white/20 dark:border-white/10`}
      aria-label="Ana Menü"
    >
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeAll}
          className="flex flex-col leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-lg"
        >
          <Logo size="lg" />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavItem to="/merge-pdf" label="PDF Birleştirme" />
          <NavItem to="/split-pdf" label="PDF Parçalama" />
          <NavItem to="/compress-pdf" label="PDF Sıkıştırma" />

          {/* TOOLS MEGA MENU */}
          <div className="relative">
            <button
              ref={toolsBtnRef}
              onMouseEnter={() => setToolsOpen(true)}
              onClick={() => setToolsOpen((v) => !v)}
              aria-expanded={toolsOpen}
              className={`${linkBase} ${underline} flex items-center gap-1`}
            >
              Tüm PDF Araçları
              <Chevron />
            </button>

            {toolsOpen && (
              <div
                ref={toolsMenuRef}
                onMouseLeave={() => setToolsOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-[420px]
                rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl
                border border-white/15 dark:border-white/10 shadow-xl p-4"
              >
                {TOOLS.map((group) => (
                  <div key={group.title}>
                    <div className="text-xs font-semibold text-zinc-500 mb-3">
                      {group.title}
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
                      {group.items.map(({ to, label, icon: Icon }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={closeAll}
                          className="flex items-center gap-3 rounded-lg px-3 py-2
                          text-sm text-zinc-700 dark:text-zinc-300
                          hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60
                          transition"
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-md bg-indigo-500/10 text-indigo-500">
                            <Icon className="h-4 w-4" />
                          </span>
                          {label}
                        </NavLink>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <NavItem to="/iletisim" label="İletişim" />

          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
            Dosyalar otomatik silinir
          </span>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden h-9 w-9 rounded-lg border border-zinc-300/70
          dark:border-zinc-700/70 flex items-center justify-center"
          aria-label="Menüyü Aç/Kapat"
        >
          <Burger open={mobileOpen} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/15 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
          <div className="px-4 py-3 space-y-2">
            {TOOLS[0].items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeAll}
                className="flex items-center gap-3 py-3 px-2 rounded-lg
                hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Icon className="text-indigo-500" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkBase} ${underline} ${isActive ? active : ""}`
      }
    >
      {label}
    </NavLink>
  );
}

function Chevron() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M6 9l6 6 6-6" strokeWidth="2" />
    </svg>
  );
}

function Burger({ open }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      {open ? (
        <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" />
      )}
    </svg>
  );
}
