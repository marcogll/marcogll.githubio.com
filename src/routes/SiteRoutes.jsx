import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import ApiScripts from "../pages/ApiScripts";
import QrGenerator from "../pages/QrGenerator";
import TokenGenerator from "../pages/TokenGenerator";
import PageNotFound from "../pages/PageNotFound";

export default function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/api/scripts" element={<ApiScripts />} />
      <Route path="/tools/qr" element={<QrGenerator />} />
      <Route path="/tools/token" element={<TokenGenerator />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
