import {
  HiCollection,
  HiViewGrid,
  HiArchive,
  HiPhotograph,
  HiTrash,
  HiRefresh,
  HiBadgeCheck,
} from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";

/**
 * Tek kaynak: Navbar ve dashboard aynı listeyi kullanır.
 * categoryId: dashboard’ta bölüm gruplama için
 */
export const PDF_TOOLS = [
  {
    to: "/merge-pdf",
    label: "PDF Birleştirme",
    icon: HiCollection,
    description: "İki PDF’i tek belgede birleştirin.",
    categoryId: "combine",
  },
  {
    to: "/split-pdf",
    label: "PDF Parçalama",
    icon: HiViewGrid,
    description: "Belgeyi sayfa sayfa ayrı PDF’lere bölün.",
    categoryId: "combine",
  },
  {
    to: "/compress-pdf",
    label: "PDF Sıkıştırma",
    icon: HiArchive,
    description: "Dosya boyutunu küçültün, paylaşımı kolaylaştırın.",
    categoryId: "optimize",
  },
  {
    to: "/organize-pdf",
    label: "PDF Sıralama",
    icon: HiArrowsUpDown,
    description: "Sayfa sırasını sürükleyerek düzenleyin.",
    categoryId: "edit",
  },
  {
    to: "/remove-pages-pdf",
    label: "PDF Sayfa Silme",
    icon: HiTrash,
    description: "İstemediğiniz sayfaları çıkarın.",
    categoryId: "edit",
  },
  {
    to: "/images-to-pdf",
    label: "Görsel → PDF",
    icon: HiPhotograph,
    description: "JPG ve PNG görsellerinden PDF oluşturun.",
    categoryId: "convert",
  },
  {
    to: "/rotate-pdf",
    label: "PDF Döndürme",
    icon: HiRefresh,
    description: "Sayfaları döndürerek hizalayın.",
    categoryId: "edit",
  },
  {
    to: "/watermark-pdf",
    label: "PDF Filigranı",
    icon: HiBadgeCheck,
    description: "Metin veya görsel filigran ekleyin.",
    categoryId: "edit",
  },
];

/** Navbar mega menü */
export const NAV_TOOL_GROUPS = [{ title: "PDF ARAÇLARI", items: PDF_TOOLS }];

const DASH_SECTIONS = [
  {
    id: "combine",
    title: "Birleştir ve böl",
    subtitle: "Tek dosya oluşturun veya sayfalara ayırın.",
  },
  {
    id: "optimize",
    title: "Sıkıştır ve optimize et",
    subtitle: "Daha hafif PDF’ler.",
  },
  {
    id: "edit",
    title: "Düzenle",
    subtitle: "Sıra, dönüş, silme ve filigran.",
  },
  {
    id: "convert",
    title: "Dönüştür",
    subtitle: "Farklı içerik türlerinden PDF.",
  },
];

export function getDashboardSections() {
  return DASH_SECTIONS.map((section) => ({
    ...section,
    tools: PDF_TOOLS.filter((t) => t.categoryId === section.id),
  })).filter((s) => s.tools.length > 0);
}
