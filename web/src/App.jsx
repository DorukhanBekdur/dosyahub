import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import LandingPage from "./pages/LandingPage";
import MergePdfPage from "./pages/MergePdfPage";
import SplitPage from "./pages/SplitPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-black text-zinc-900 dark:text-zinc-100 transition-colors">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Merge */}
            <Route
              path="/merge-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <MergePdfPage />
                </div>
              }
            />

            {/* Split */}
            <Route
              path="/split-pdf"
              element={
                <div className="mx-auto max-w-6xl w-full px-4 py-12">
                  <SplitPage />
                </div>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
