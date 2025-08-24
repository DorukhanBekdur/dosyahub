import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "relative text-sm transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-[width] after:duration-300 " +
    "after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 hover:after:w-full";
  const active = "text-zinc-900 dark:text-zinc-100 after:w-full";

  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={[
        "sticky top-0 z-40",
        "backdrop-blur",
        scrolled
          ? "bg-white/75 dark:bg-zinc-900/70 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          : "bg-white/55 dark:bg-zinc-900/45",
        "transition-colors duration-300 border-b border-white/20 dark:border-white/10",
        "supports-[backdrop-filter]:backdrop-blur-md",
      ].join(" ")}
      aria-label="Ana gezinme"
    >
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-lg p-1.5"
          aria-label="DosyaHub ana sayfa"
        >
          <Logo size="lg" />
        </NavLink>

        {/* Masaüstü Menü */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/merge-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Birleştir
          </NavLink>
          <NavLink
            to="/split-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Parçala
          </NavLink>
          <NavLink
            to="/compress-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Sıkıştırma
          </NavLink>
          <NavLink
            to="/organize-pdf"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Sıralama
          </NavLink>
          <NavLink
            to="/iletisim"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : ""}`
            }
          >
            İletişim
          </NavLink>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
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
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil Menü */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="md:hidden border-t border-white/15 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1.5">
          <NavLink
            to="/merge-pdf"
            onClick={closeMenu}
            className={({ isActive }) =>
              `py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Birleştir
          </NavLink>
          <NavLink
            to="/split-pdf"
            onClick={closeMenu}
            className={({ isActive }) =>
              `py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Parçala
          </NavLink>
          <NavLink
            to="/compress-pdf"
            onClick={closeMenu}
            className={({ isActive }) =>
              `py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Sıkıştırma
          </NavLink>
          <NavLink
            to="/organize-pdf"
            onClick={closeMenu}
            className={({ isActive }) =>
              `py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            PDF Sıralama
          </NavLink>
          <NavLink
            to="/iletisim"
            onClick={closeMenu}
            className={({ isActive }) =>
              `py-2 rounded-lg px-1 ${linkBase} ${isActive ? active : ""}`
            }
          >
            İletişim
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
