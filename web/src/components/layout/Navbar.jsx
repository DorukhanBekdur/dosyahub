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

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openTools, setOpenTools] = useState(false);
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
    function onDocClick(e) {
      if (!openTools) return;
      if (
        toolsMenuRef.current &&
        !toolsMenuRef.current.contains(e.target) &&
        toolsBtnRef.current &&
        !toolsBtnRef.current.contains(e.target)
      ) {
        setOpenTools(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenTools(false);
        setOpenMobile(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openTools]);

  const linkBase =
    "relative text-sm transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-[width] after:duration-300 " +
    "after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 hover:after:w-full";
  const active = "text-zinc-900 dark:text-zinc-100 after:w-full";

  const closeAll = () => {
    setOpenMobile(false);
    setOpenTools(false);
  };

  const toolGroups = [
    {
      title: "PDF Düzenle",
      items: [
        {
          to: "/merge-pdf",
          label: "PDF Birleştirme",
          icon: <HiCollection className="h-5 w-5" />,
        },
        {
          to: "/split-pdf",
          label: "PDF Parçalama",
          icon: <HiViewGrid className="h-5 w-5" />,
        },
        {
          to: "/compress-pdf",
          label: "PDF Sıkıştırma",
          icon: <HiArchive className="h-5 w-5" />,
        },
        {
          to: "/organize-pdf",
          label: "PDF Sıralama",
          icon: <HiArrowsUpDown className="h-5 w-5" />,
        },
        {
          to: "/remove-pages-pdf",
          label: "PDF Sayfa Silme",
          icon: <HiTrash className="h-5 w-5" />,
        },
        {
          to: "/images-to-pdf",
          label: "Görsel → PDF",
          icon: <HiPhotograph className="h-5 w-5" />,
        },
        {
          to: "/rotate-pdf",
          label: "PDF Döndürme",
          icon: <HiRefresh className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 relative${
        scrolled
          ? "bg-white/75 dark:bg-zinc-900/70 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          : "bg-white/55 dark:bg-zinc-900/45"
      } transition-colors duration-300 border-b border-white/20 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md backdrop-blur`}
      aria-label="Ana gezinme"
    >
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          onClick={closeAll}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-lg p-1.5"
          aria-label="DosyaHub ana sayfa"
        >
          <Logo size="lg" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/merge-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
            onClick={closeAll}
          >
            PDF Birleştirme
          </NavLink>
          <NavLink
            to="/split-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
            onClick={closeAll}
          >
            PDF Parçalama
          </NavLink>
          <NavLink
            to="/compress-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
            onClick={closeAll}
          >
            PDF Sıkıştırma
          </NavLink>

          {/* Araçlar Mega Menü */}
          <div className="relative">
            <button
              ref={toolsBtnRef}
              onClick={() => setOpenTools((v) => !v)}
              onMouseEnter={() => setOpenTools(true)}
              aria-haspopup="true"
              aria-expanded={openTools}
              className={`${linkBase} inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-lg px-1`}
            >
              Tüm PDF Araçları
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {openTools && (
              <div
                ref={toolsMenuRef}
                onMouseLeave={() => setOpenTools(false)}
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-fit min-w-[360px] max-w-[92vw]
                           rounded-2xl border border-white/15 dark:border-white/10
                           bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl p-3
                           [background-image:linear-gradient(to_bottom,rgba(255,255,255,.08),transparent)]"
                role="menu"
              >
                <div className="grid grid-cols-1 gap-3">
                  {toolGroups.map((grp, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 dark:border-white/5 bg-zinc-50/70 dark:bg-zinc-900/40 p-3"
                    >
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                        PDF Düzenle
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {grp.items.map((it, j) => (
                          <li key={j}>
                            <NavLink
                              to={it.to}
                              onClick={closeAll}
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm
                                         text-zinc-700 dark:text-zinc-300
                                         hover:bg-white/80 dark:hover:bg-zinc-800/60
                                         border border-transparent hover:border-white/20 dark:hover:border-white/10
                                         transition"
                              role="menuitem"
                            >
                              <span className="grid place-items-center rounded-md h-7 w-7 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                                <span className="[&>*]:h-4 [&>*]:w-4">
                                  {it.icon}
                                </span>
                              </span>
                              <span>{it.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/iletisim"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
            onClick={closeAll}
          >
            İletişim
          </NavLink>
        </div>

        <button
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          aria-controls="mobile-menu"
          aria-label="Menüyü Aç/Kapat"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300/70 dark:border-zinc-700/70 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {openMobile ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!openMobile}
        className="md:hidden border-t border-white/15 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1.5">
          <NavLink
            to="/merge-pdf"
            onClick={closeAll}
            className={({ isActive }) =>
              `block py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Birleştirme
          </NavLink>
          <NavLink
            to="/split-pdf"
            onClick={closeAll}
            className={({ isActive }) =>
              `block py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Parçalama
          </NavLink>
          <NavLink
            to="/compress-pdf"
            onClick={closeAll}
            className={({ isActive }) =>
              `block py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Sıkıştırma
          </NavLink>

          <details className="group mt-1.5">
            <summary
              className={`flex items-center justify-between ${linkBase} cursor-pointer py-2 px-1 rounded-lg list-none appearance-none marker:content-none`}
            >
              <span className="font-normal">Tüm PDF Araçları</span>
              <svg
                className="h-4 w-4 transition group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>

            <div className="pl-1 pt-1 pb-2 space-y-3">
              {toolGroups.map((grp, i) => (
                <div key={i}>
                  <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1.5">
                    {grp.title}
                  </div>
                  <div className="flex flex-col gap-1">
                    {grp.items.map((it, j) => (
                      <NavLink
                        key={j}
                        to={it.to}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          `py-2 rounded-lg px-2 ${linkBase} ${
                            isActive ? active : ""
                          } flex items-center gap-2`
                        }
                      >
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {it.icon}
                        </span>
                        {it.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>

          <NavLink
            to="/iletisim"
            onClick={closeAll}
            className={({ isActive }) =>
              `block mt-1.5 py-2 rounded-lg px-1 ${linkBase} ${
                isActive ? active : ""
              }`
            }
          >
            İletişim
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
