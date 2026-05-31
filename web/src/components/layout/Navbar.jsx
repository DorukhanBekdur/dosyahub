import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HiChevronDown, HiOutlineViewGrid } from "react-icons/hi";
import Logo from "../common/Logo";
import { NavToolsDropdown, NAV_TOOLS_MENU_ID } from "../nav/NavToolsDropdown";
import { PDF_TOOLS } from "../../config/toolsCatalog";
import {
  NAV_AUTH_LABELS,
  NAV_MOBILE_EXTRA_LINKS,
  NAV_PRIMARY_LINKS,
  isLightNavPath,
} from "../../config/navConfig";
import {
  getSession,
  clearSession,
  hasValidAuthSession,
  SESSION_KEY,
} from "../../lib/authSession";

const MOBILE_PANEL_ID = "mobile-nav-panel";
const TOOLS_MENU_ID = NAV_TOOLS_MENU_ID;

/** Hero ile aynı container; yükseklik ~68–72px */
const NAV_BAR_HEIGHT = "h-[4.25rem]";
const NAV_MOBILE_TOP = "top-[4.25rem]";

export default function Navbar() {
  const { pathname } = useLocation();
  const isLight = isLightNavPath(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState(() => getSession());

  const toolsWrapRef = useRef(null);

  const refreshSession = () => setSession(getSession());

  useEffect(() => {
    refreshSession();
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === SESSION_KEY || e.key === null) refreshSession();
    }
    function onAuthChanged() {
      refreshSession();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("dosyahub-auth-changed", onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("dosyahub-auth-changed", onAuthChanged);
    };
  }, []);

  useEffect(() => {
    function onDocClick(e) {
      if (toolsOpen && !toolsWrapRef.current?.contains(e.target)) {
        setToolsOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [toolsOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setToolsOpen(false);
  };

  function logout() {
    clearSession();
    setSession(null);
    closeAll();
  }

  const loggedIn = hasValidAuthSession(session);
  const sessionLabel = loggedIn
    ? session.user.name?.trim() ||
      (session.user.email && String(session.user.email).split("@")[0]) ||
      "Hesap"
    : null;

  const headerClass = isLight
    ? scrolled
      ? "border-violet-100/60 bg-[#FDFBFF] shadow-[0_1px_12px_rgba(124,58,237,0.05)]"
      : "border-violet-100/60 bg-[#FDFBFF]"
    : scrolled
      ? "border-violet-500/[0.06] bg-[#070A13]/95 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.25)]"
      : "border-violet-500/[0.04] bg-[#070A13]/85 backdrop-blur-xl";

  const signupRingOffset = isLight
    ? "focus-visible:ring-offset-[#FDFBFF]"
    : "focus-visible:ring-offset-[#070A13]";

  const toolsGroupBorder = isLight
    ? toolsOpen
      ? "border-violet-100/70 bg-[#FDFBFF]"
      : "border-transparent hover:border-violet-100/60"
    : toolsOpen
      ? "border-violet-500/20 bg-white/[0.04]"
      : "border-transparent hover:border-violet-500/[0.06]";

  return (
    <header
      data-nav-theme={isLight ? "light" : "dark"}
      className={`sticky top-0 z-50 border-b transition-[box-shadow] duration-200 ${headerClass}`}
    >
      <nav
        className={`mx-auto flex ${NAV_BAR_HEIGHT} max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8`}
        aria-label="Ana menü"
      >
        <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-10">
          <Link
            to="/"
            onClick={closeAll}
            className={`flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
              isLight
                ? "focus-visible:ring-offset-[#FDFBFF]"
                : "focus-visible:ring-offset-[#070A13]"
            }`}
          >
            <Logo size="nav" priority />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center gap-0.5 md:flex lg:gap-1">
            <div
              ref={toolsWrapRef}
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <div
                className={`flex items-stretch rounded-lg border transition-colors ${toolsGroupBorder}`}
              >
                <NavLink
                  to="/tools"
                  onClick={closeAll}
                  className={navLinkClass(isLight)}
                >
                  {NAV_AUTH_LABELS.tools}
                </NavLink>
                <button
                  type="button"
                  id="nav-tools-trigger"
                  aria-expanded={toolsOpen}
                  aria-haspopup="menu"
                  aria-controls={TOOLS_MENU_ID}
                  aria-label="Hızlı araç listesi"
                  onClick={() => setToolsOpen((o) => !o)}
                  className={`flex cursor-pointer items-center border-l px-2 transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-inset ${
                    isLight
                      ? "border-violet-100 text-slate-400 hover:text-violet-600"
                      : "border-violet-500/[0.06] text-slate-500 hover:text-white"
                  }`}
                >
                  <HiChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      toolsOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
              </div>

              <NavToolsDropdown
                isLight={isLight}
                isOpen={toolsOpen}
                onClose={closeAll}
                toolsTriggerId="nav-tools-trigger"
              />
            </div>

            {loggedIn && (
              <NavLink
                to="/dashboard"
                onClick={closeAll}
                className={navLinkClass(isLight)}
              >
                {NAV_AUTH_LABELS.panel}
              </NavLink>
            )}

            {NAV_PRIMARY_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeAll}
                className={navLinkClass(isLight)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-4 md:flex">
            {loggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeAll}
                  className={`hidden font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 md:inline-flex lg:hidden text-sm ${
                    isLight
                      ? "text-[#7c3aed] hover:text-[#6d28d9]"
                      : "text-violet-300 hover:text-white"
                  }`}
                >
                  {NAV_AUTH_LABELS.panel}
                </Link>
                <span
                  className={`max-w-[100px] truncate text-sm font-medium xl:max-w-[140px] ${
                    isLight ? "text-slate-600" : "text-zinc-400"
                  }`}
                  title={session.user.email || sessionLabel}
                >
                  {sessionLabel}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className={`cursor-pointer text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
                    isLight
                      ? "text-slate-600 hover:text-violet-600"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {NAV_AUTH_LABELS.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                    isLight
                      ? `text-slate-700 hover:text-violet-600 ${signupRingOffset}`
                      : `text-slate-300 hover:text-white ${signupRingOffset}`
                  }`}
                >
                  {NAV_AUTH_LABELS.login}
                </Link>
                <Link
                  to="/signup"
                  className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                    isLight
                      ? `bg-violet-600 hover:bg-violet-700 ${signupRingOffset}`
                      : `bg-violet-600 shadow-sm shadow-black/25 hover:bg-violet-500 ${signupRingOffset}`
                  }`}
                >
                  {NAV_AUTH_LABELS.signup}
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border md:hidden outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
              isLight
                ? "border-violet-100/70 bg-[#FDFBFF] text-slate-700 hover:border-violet-200 hover:text-violet-600"
                : "border-violet-500/[0.06] bg-[#070A13]/80 text-slate-300 hover:text-white"
            }`}
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_PANEL_ID}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button
            type="button"
            className={`fixed inset-0 z-40 bg-black/20 md:hidden ${NAV_MOBILE_TOP}`}
            aria-label="Menüyü kapat"
            onClick={closeAll}
          />
          <div
            id={MOBILE_PANEL_ID}
            className={`absolute top-full left-0 z-50 max-h-[min(85dvh,560px)] w-full overflow-y-auto border-t md:hidden ${
              isLight
                ? "border-violet-100/60 bg-[#FDFBFF]"
                : "border-violet-500/[0.06] bg-[#070A13]"
            }`}
          >
            <div className="mx-auto max-w-7xl p-4 pb-6">
              <MobileLink
                to="/tools"
                onClick={closeAll}
                isLight={isLight}
                icon={HiOutlineViewGrid}
                bold
              >
                {NAV_AUTH_LABELS.tools}
              </MobileLink>

              <p
                className={`mb-2 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider ${
                  isLight ? "text-slate-400" : "text-zinc-500"
                }`}
              >
                {NAV_AUTH_LABELS.quickTools}
              </p>
              <ul className="space-y-0.5">
                {PDF_TOOLS.map((item) => (
                  <li key={item.to}>
                    <MobileLink to={item.to} onClick={closeAll} isLight={isLight}>
                      {item.label}
                    </MobileLink>
                  </li>
                ))}
              </ul>

              <div
                className={`my-4 border-t ${isLight ? "border-violet-100/60" : "border-violet-500/[0.06]"}`}
              />

              {loggedIn && (
                <MobileLink to="/dashboard" onClick={closeAll} isLight={isLight} bold>
                  {NAV_AUTH_LABELS.panel}
                </MobileLink>
              )}
              {NAV_PRIMARY_LINKS.map((link) => (
                <MobileLink
                  key={link.to}
                  to={link.to}
                  onClick={closeAll}
                  isLight={isLight}
                >
                  {link.label}
                </MobileLink>
              ))}
              {NAV_MOBILE_EXTRA_LINKS.map((link) => (
                <MobileLink
                  key={link.to}
                  to={link.to}
                  onClick={closeAll}
                  isLight={isLight}
                >
                  {link.label}
                </MobileLink>
              ))}

              <div
                className={`mt-4 border-t pt-4 ${isLight ? "border-violet-100/60" : "border-violet-500/[0.06]"}`}
              >
                {loggedIn ? (
                  <button
                    type="button"
                    onClick={logout}
                    className={`w-full cursor-pointer rounded-lg py-3 text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
                      isLight
                        ? "text-slate-600 hover:bg-violet-50/40 hover:text-violet-600"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {NAV_AUTH_LABELS.logout}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      onClick={closeAll}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border py-3 text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
                        isLight
                          ? "border-violet-100/70 text-slate-700 hover:border-violet-200 hover:text-violet-600"
                          : "border-violet-500/[0.06] text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {NAV_AUTH_LABELS.login}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeAll}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg py-3 text-sm font-semibold text-white transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                        isLight
                          ? `bg-violet-600 hover:bg-violet-700 ${signupRingOffset}`
                          : `bg-violet-600 shadow-sm shadow-black/25 hover:bg-violet-500 ${signupRingOffset}`
                      }`}
                    >
                      {NAV_AUTH_LABELS.signup}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function navLinkClass(isLight) {
  const ringOffset = isLight
    ? "focus-visible:ring-offset-[#FDFBFF]"
    : "focus-visible:ring-offset-[#070A13]";

  return ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${ringOffset} ${
      isLight
        ? isActive
          ? "text-violet-600"
          : "text-slate-700 hover:text-violet-600"
        : isActive
          ? "text-violet-300"
          : "text-slate-300 hover:text-white"
    }`;
}

function MobileLink({ to, onClick, isLight, children, icon: Icon, bold }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
          bold ? "font-semibold" : "font-medium"
        } ${
          isLight
            ? isActive
              ? "bg-violet-50/80 text-violet-600"
              : "text-slate-700 hover:bg-violet-50/50 hover:text-violet-600"
            : isActive
              ? "bg-violet-500/10 text-violet-300"
              : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
        }`
      }
    >
      {Icon && <Icon className="h-5 w-5 shrink-0 opacity-70" aria-hidden />}
      {children}
    </NavLink>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
