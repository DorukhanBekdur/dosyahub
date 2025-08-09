import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MergePdfPage from "./pages/MergePdfPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/merge-pdf" element={<MergePdfPage />} />
      </Routes>
    </Router>
  );
}
