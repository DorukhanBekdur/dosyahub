import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { HiHeart } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Araçlar",
      links: [
        { name: "PDF Birleştir", href: "/merge-pdf" },
        { name: "PDF Sıkıştır", href: "/compress-pdf" },
        { name: "Word -> PDF", href: "/word-to-pdf" },
        { name: "Görsel -> PDF", href: "/images-to-pdf" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { name: "Hakkımızda", href: "/about" },
        { name: "Gizlilik Politikası", href: "/privacy" },
        { name: "Kullanım Şartları", href: "/terms" },
        { name: "İletişim", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#0f0a1e] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* LOGO */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo size="xl" />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              DosyaHub, dijital belgelerinizi yönetmenizi sağlayan en hızlı,
              güvenli ve kullanıcı dostu PDF araçlarını sunar. Gizliliğiniz
              bizim önceliğimizdir.
            </p>
          </div>

          {/* LİNKLER */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-white font-semibold mb-6 tracking-wider uppercase text-xs">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-zinc-500 hover:text-indigo-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-zinc-500 text-xs flex items-center gap-1.5">
            © {currentYear}{" "}
            <span className="text-zinc-300 font-medium">DosyaHub</span> — Hızlı,
            Güvenli ve Basit.
          </div>

          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <span>Made with</span>
            <HiHeart className="text-rose-500 w-4 h-4 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/DorukhanBekdur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-indigo-400 transition-colors font-medium underline underline-offset-4"
            >
              Dorukhan Bekdur
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
