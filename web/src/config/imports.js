export {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
export { default as Navbar } from "../components/layout/Navbar";
export { default as Footer } from "../components/layout/Footer";

// Pages
export { default as LandingPage } from "../pages/LandingPage";
export { default as MergePdfPage } from "../pages/MergePdfPage";
export { default as SplitPage } from "../pages/SplitPage";
export { default as ContactPage } from "../pages/corporate/ContactPage";
export { default as CompressPdfPage } from "../pages/CompressPdfPage";
export { default as OrganizePdfPage } from "../pages/OrganizePdfPage";
export { default as RemovePdfPage } from "../pages/RemovePdfPage";
export { default as ImagesToPdfPage } from "../pages/ImagesToPdfPage";
export { default as RotatePdfPage } from "../pages/RotatePdfPages";
export { default as WatermarkPage } from "../pages/WatermarkPage";
export { default as LoginPage } from "../pages/auth/LoginPage";
export { default as SignupPage } from "../pages/auth/SignupPage";
