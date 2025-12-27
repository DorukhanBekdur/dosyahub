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
    title: "PDF ARAÇLARI",
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toolsBtnRef = useRef(null);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0a1e]/85 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* LOGO VE LİNKLER */}
        <div className="flex items-center gap-24">
          {" "}
          <Link
            to="/"
            onClick={closeAll}
            className="flex items-center shrink-0"
          >
            <Logo size="lg" />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {" "}
            <div className="relative">
              <button
                ref={toolsBtnRef}
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center gap-1.5 text-[15px] font-medium text-zinc-300 hover:text-white transition"
              >
                Tüm Araçlar <Chevron />
              </button>

              {toolsOpen && (
                <div
                  ref={toolsMenuRef}
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full -left-10 pt-4 w-[480px]"
                >
                  <div className="bg-[#1a142e] rounded-2xl shadow-2xl border border-white/10 p-5 grid grid-cols-2 gap-3 backdrop-blur-2xl">
                    <div className="col-span-2 text-[10px] font-bold text-zinc-500 tracking-widest pb-2 border-b border-white/5 mb-2">
                      PDF İŞLEMLERİ
                    </div>
                    {TOOLS[0].items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={closeAll}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 group transition"
                      >
                        <div className="bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500/20">
                          <item.icon className="text-indigo-400 w-5 h-5" />
                        </div>
                        <span className="text-[14px] font-medium text-zinc-300 group-hover:text-white">
                          {item.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <NavItem to="/merge-pdf" label="PDF Birleştir" />
            <NavItem to="/compress-pdf" label="Sıkıştır" />
            <NavItem to="/about" label="Hakkımızda" />
            <NavItem to="/iletisim" label="İletişim" />
          </div>
        </div>

        {/* BUTONLAR */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/login"
              className="text-[14px] font-medium text-zinc-400 hover:text-white transition"
            >
              Giriş Yap
            </Link>
            <Link
              to="/signup"
              className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white px-5 py-2 rounded-full text-[14px] font-bold transition shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Kayıt Ol
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-white"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* MOBİL PANEL */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0f0a1e] border-t border-white/10 p-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-1 gap-2">
            {TOOLS[0].items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeAll}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 text-zinc-300"
              >
                <item.icon className="text-indigo-400" />
                {item.label}
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
      className={({ isActive }) => `
        text-[14px] font-medium transition-all
        ${isActive ? "text-[#a78bfa]" : "text-zinc-400 hover:text-white"}
      `}
    >
      {label}
    </NavLink>
  );
}

function Chevron() {
  return (
    <svg
      className="w-3.5 h-3.5 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
