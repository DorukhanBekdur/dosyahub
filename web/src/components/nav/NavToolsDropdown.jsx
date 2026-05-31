import { NavLink } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { PDF_TOOLS } from "../../config/toolsCatalog";
import { NAV_AUTH_LABELS } from "../../config/navConfig";

const MENU_ID = "nav-tools-menu";

export function NavToolsDropdown({
  isLight,
  isOpen,
  onClose,
  toolsTriggerId = "nav-tools-trigger",
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-50 w-[min(100vw-2rem,36rem)] pt-2">
      <div
        id={MENU_ID}
        role="menu"
        aria-labelledby={toolsTriggerId}
        className={`overflow-hidden rounded-xl border shadow-lg ${
          isLight
            ? "border-zinc-200 bg-white shadow-zinc-900/5"
            : "border-white/10 bg-[#0B1020] shadow-black/40"
        }`}
      >
        <div
          className={`border-b px-4 py-3 ${
            isLight ? "border-zinc-100 bg-zinc-50/50" : "border-white/5 bg-white/[0.02]"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            {NAV_AUTH_LABELS.quickTools}
          </p>
        </div>
        <div className="grid gap-0.5 p-2 sm:grid-cols-2">
          {PDF_TOOLS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={onClose}
              className={({ isActive }) =>
                `group flex cursor-pointer gap-3 rounded-lg p-3 transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
                  isLight
                    ? isActive
                      ? "bg-violet-50 ring-1 ring-violet-100"
                      : "hover:bg-zinc-50"
                    : isActive
                      ? "bg-violet-500/10"
                      : "hover:bg-white/[0.04]"
                }`
              }
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isLight
                    ? "bg-violet-50 text-[#7c3aed] ring-1 ring-violet-100"
                    : "bg-violet-500/15 text-violet-300"
                }`}
              >
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`flex items-center justify-between gap-2 text-sm font-semibold ${
                    isLight ? "text-zinc-900" : "text-zinc-100"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <HiArrowRight
                    className={`h-4 w-4 shrink-0 opacity-0 transition group-hover:opacity-100 ${
                      isLight ? "text-violet-500" : "text-violet-400"
                    }`}
                    aria-hidden
                  />
                </span>
                <span
                  className={`mt-0.5 line-clamp-2 text-xs leading-snug ${
                    isLight ? "text-zinc-500" : "text-zinc-500"
                  }`}
                >
                  {item.description}
                </span>
              </span>
            </NavLink>
          ))}
        </div>
        <div
          className={`border-t px-4 py-2.5 ${
            isLight ? "border-zinc-100" : "border-white/5"
          }`}
        >
          <NavLink
            to="/tools"
            role="menuitem"
            onClick={onClose}
            className={`inline-flex cursor-pointer items-center gap-1 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 rounded ${
              isLight
                ? "text-[#7c3aed] hover:text-[#6d28d9]"
                : "text-violet-300 hover:text-violet-200"
            }`}
          >
            Tüm araçlar sayfası
            <HiArrowRight className="h-4 w-4" aria-hidden />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export { MENU_ID as NAV_TOOLS_MENU_ID };
