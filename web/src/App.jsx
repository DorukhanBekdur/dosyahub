import {
  Router,
  Routes,
  Route,
  Navigate,
  Navbar,
  Footer,
  LandingPage,
  MergePdfPage,
  SplitPage,
  ContactPage,
  CompressPdfPage,
  OrganizePdfPage,
  RemovePdfPage,
  ImagesToPdfPage,
  RotatePdfPage,
} from "./config/imports";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-black text-zinc-900 dark:text-zinc-100 transition-colors">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Merge Tool */}
            <Route path="/merge-pdf" element={<MergePdfPage />} />

            {/* Split Tool */}
            <Route path="/split-pdf" element={<SplitPage />} />

            {/* Compress Tool */}
            <Route
              path="/compress-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <CompressPdfPage />
                </div>
              }
            />

            {/* Organize Tool */}
            <Route
              path="/organize-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <OrganizePdfPage />
                </div>
              }
            />
            {/* Remove Page Tool */}
            <Route
              path="/remove-pages-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <RemovePdfPage />
                </div>
              }
            />

            <Route
              path="/images-to-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <ImagesToPdfPage />
                </div>
              }
            />

            <Route
              path="/rotate-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <RotatePdfPage />
                </div>
              }
            />

            {/* İletişim */}
            <Route path="/iletisim" element={<ContactPage />} />

            {/* Hakkımızda */}
            <Route path="/about" element={<AboutPage />} />

            {/* Gizlilik */}
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* Kullanım */}
            <Route path="/terms" element={<TermsPage />} />

            {/* Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
