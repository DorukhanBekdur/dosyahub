import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "text-sm transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200";
  const active =
    "text-zinc-900 dark:text-zinc-100 underline underline-offset-4";

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur bg-white/60 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-2">
          <Logo size="md" />
        </NavLink>

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
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menüyü Aç/Kapat"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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

      {open && (
        <div className="md:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            <NavLink
              to="/merge-pdf"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 ${linkBase} ${isActive ? active : ""}`
              }
            >
              PDF Birleştir
            </NavLink>
            <NavLink
              to="/split-pdf"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 ${linkBase} ${isActive ? active : ""}`
              }
            >
              PDF Parçala
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
