import {
  LandingPage,
  MergePdfPage,
  SplitPage,
  CompressPdfPage,
  OrganizePdfPage,
  RemovePdfPage,
  ImagesToPdfPage,
  RotatePdfPage,
  ContactPage,
} from "./imports";
import AboutPage from "../pages/corporate/AboutPage";
import PrivacyPage from "../pages/corporate/PrivacyPage";
import TermsPage from "../pages/corporate/TermsPage";

export const APP_ROUTES = [
  { path: "/", element: LandingPage },
  { path: "/merge-pdf", element: MergePdfPage },
  { path: "/split-pdf", element: SplitPage },
  { path: "/compress-pdf", element: CompressPdfPage },
  { path: "/organize-pdf", element: OrganizePdfPage },
  { path: "/remove-pages-pdf", element: RemovePdfPage },
  { path: "/images-to-pdf", element: ImagesToPdfPage },
  { path: "/rotate-pdf", element: RotatePdfPage },
  { path: "/contact", element: ContactPage },
  { path: "/about", element: AboutPage },
  { path: "/privacy", element: PrivacyPage },
  { path: "/terms", element: TermsPage },
];
