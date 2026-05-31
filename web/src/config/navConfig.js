import { PDF_TOOLS } from "./toolsCatalog";

/** Açık navbar kullanan rotalar (landing koyu tema) */
export const LIGHT_NAV_PATHS = [];

/** Masaüstü nav */
export const NAV_PRIMARY_LINKS = [
  { to: "/merge-pdf", label: "Birleştir" },
  { to: "/compress-pdf", label: "Sıkıştır" },
  { to: "/about", label: "Hakkımızda" },
];

/** Mobil menüde ek linkler */
export const NAV_MOBILE_EXTRA_LINKS = [{ to: "/contact", label: "İletişim" }];

export const NAV_AUTH_LABELS = {
  login: "Giriş yap",
  signup: "Kayıt ol",
  logout: "Çıkış yap",
  panel: "Panel",
  tools: "Tüm araçlar",
  quickTools: "Hızlı erişim",
};

export const FOOTER_CORPORATE_LINKS = [
  { name: "Hakkımızda", href: "/about" },
  { name: "Gizlilik Politikası", href: "/privacy" },
  { name: "Kullanım Şartları", href: "/terms" },
  { name: "İletişim", href: "/contact" },
];

export const FOOTER_SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/DorukhanBekdur" },
];

export function getFooterToolLinks() {
  return PDF_TOOLS.map((tool) => ({
    name: tool.label,
    href: tool.to,
  }));
}

export function isLightNavPath(pathname) {
  return LIGHT_NAV_PATHS.includes(pathname);
}
