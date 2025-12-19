import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Pages
import LandingPage from "../pages/LandingPage";
import MergePdfPage from "../pages/MergePdfPage";
import SplitPage from "../pages/SplitPage";
import ContactPage from "../pages/ContactPage";
import CompressPdfPage from "../pages/CompressPdfPage";
import OrganizePdfPage from "../pages/OrganizePdfPage";
import RemovePdfPage from "../pages/RemovePdfPage";
import ImagesToPdfPage from "../pages/ImagesToPdfPage";
import RotatePdfPage from "../pages/RotatePdfPages";

export {
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
};
