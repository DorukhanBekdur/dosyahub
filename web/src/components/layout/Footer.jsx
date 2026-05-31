import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { HiHeart } from "react-icons/hi";
import {
  FOOTER_CORPORATE_LINKS,
  getFooterToolLinks,
} from "../../config/navConfig";

/** FAQ alt (#070A13) ile hizalı */
const FOOTER_BG =
  "bg-[#070A13] bg-[linear-gradient(180deg,#070A13_0%,#060810_55%,#05060c_100%)]";

const BRAND_DESCRIPTION =
  "DosyaHub, PDF dosyalarınızı hızlı, güvenli ve kolay şekilde yönetmenizi sağlayan modern PDF araçları platformudur.";

const WHY_ITEMS = [
  "Hızlı PDF işlemleri",
  "Kullanıcı dostu arayüz",
  "Güvenli dosya yönetimi",
  "Hesap oluşturmadan kullanım",
];

const linkClass =
  "inline-block text-sm text-slate-400 transition-all duration-300 hover:translate-x-0.5 hover:text-violet-300 outline-none focus-visible:rounded focus-visible:text-violet-200 focus-visible:ring-2 focus-visible:ring-violet-500/50";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const toolLinks = getFooterToolLinks();

  return (
    <footer
      className={`relative overflow-hidden ${FOOTER_BG} pt-16 pb-8 sm:pt-20 sm:pb-10`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              to="/"
              className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              <Logo size="lg" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {BRAND_DESCRIPTION}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-labelledby="footer-tools-heading">
            <h3
              id="footer-tools-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-200"
            >
              Araçlar
            </h3>
            <ul className="mt-4 space-y-3">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="lg:col-span-2"
            aria-labelledby="footer-corporate-heading"
          >
            <h3
              id="footer-corporate-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-200"
            >
              Kurumsal
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_CORPORATE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Neden DosyaHub?
            </h3>
            <ul className="mt-4 space-y-3">
              {WHY_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-400"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400/70"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 sm:mt-16 sm:flex-row sm:justify-between sm:gap-6">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {currentYear}{" "}
            <span className="font-medium text-slate-300">DosyaHub</span> —
            Hızlı, Güvenli ve Basit.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span>Made with</span>
            <HiHeart
              className="h-3.5 w-3.5 text-rose-400/90"
              aria-hidden
            />
            <span>by</span>
            <a
              href="https://github.com/DorukhanBekdur"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 transition-colors duration-300 hover:text-violet-300 outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              Dorukhan Bekdur
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
