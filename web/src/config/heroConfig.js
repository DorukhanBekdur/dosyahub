/** Hero — hızlı işlem paneli */
export const HERO_QUICK_START_PATHS = [
  "/merge-pdf",
  "/split-pdf",
  "/compress-pdf",
  "/images-to-pdf",
  "/rotate-pdf",
  "/remove-pages-pdf",
];

export const HERO_QUICK_START_FEATURED = {
  id: "merge",
  path: "/merge-pdf",
  title: "PDF Birleştir",
  description: "Birden fazla PDF dosyasını tek dosyada topla.",
  cta: "Başla",
};

export const HERO_QUICK_START_TOOLS = [
  {
    id: "split",
    path: "/split-pdf",
    title: "PDF Parçala",
    hint: "Sayfaları ayrı dosyalara ayır",
  },
  {
    id: "compress",
    path: "/compress-pdf",
    title: "PDF Sıkıştır",
    hint: "Dosya boyutunu küçült",
  },
  {
    id: "images",
    path: "/images-to-pdf",
    title: "Görselden PDF",
    hint: "JPG ve PNG görselleri PDF'e dönüştür",
  },
  {
    id: "rotate",
    path: "/rotate-pdf",
    title: "PDF Döndür",
    hint: "Sayfa yönlerini düzenle",
  },
  {
    id: "remove-pages",
    path: "/remove-pages-pdf",
    title: "Sayfa Sil",
    hint: "İstenmeyen sayfaları kaldır",
  },
];

export const HERO_QUICK_START_STEPS = [
  { label: "İşlemi seç", iconKey: "select" },
  { label: "Dosyanı yükle", iconKey: "upload" },
  { label: "Sonucu indir", iconKey: "download" },
];

export const HERO_COPY = {
  badge: "2.250+ aylık kullanıcı",
  headline: "PDF işlemlerinizi tek ekranda kolayca yönetin.",
  headlineAccent: "tek ekranda",
  subhead:
    "PDF birleştirme, parçalama, sıkıştırma ve dönüştürme işlemlerini tarayıcınızdan hızlıca tamamlayın. Kurulum yok, karmaşık menü yok.",
  ctaPrimary: "Hemen başla",
  ctaPrimaryTo: "/merge-pdf",
  ctaSecondary: "Tüm araçları gör",
  ctaSecondaryTo: "/tools",
  trustPrivacy: "Dosyalarınız işlem sırasında cihazınızda kalır.",
  quickStartTitle: "Hızlı Başlangıç",
  quickStartToolsLabel: "Diğer araçlar",
};
