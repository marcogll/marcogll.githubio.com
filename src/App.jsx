import "./App.css";
import Navbar from "./components/Navbar";
import Social from "./components/Social";
import SiteRoutes from "./routes/SiteRoutes";
import ContactModal from "./components/ContactModal";
import { useLanguage } from "./context/LanguageContext";
import soul23Logo from "./assets/logo_soul23/soul23_logo.svg";

function App() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <dialog id="contact-modal" className="modal">
        <ContactModal 
          isOpen={true} 
          onClose={() => document.getElementById('contact-modal')?.close()} 
        />
      </dialog>
      <div className="pt-[5rem] px-2 py-2">
        <div className="mx-auto max-w-xl bg-white rounded-xl shadow-lg">
          <div className="flex flex-col">
            <SiteRoutes />
            <Social />
          </div>
        </div>
      </div>
      <footer className="pb-4 flex justify-center items-center gap-x-2">
        <a
          href="https://soul23.cloud"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-y-3 px-4 py-5 text-center text-sm text-gray-500 transition-colors hover:text-gray-600"
        >
          <img
            src={soul23Logo}
            alt="soul23.cloud"
            className="w-36 opacity-50"
          />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">
              © {new Date().getFullYear()} soul23.cloud
            </p>
            <p className="text-xs text-gray-400">
              {t.rightsReserved}.
            </p>
            <p className="text-xs text-gray-400">
              {t.footerLegal}
            </p>
          </div>
        </a>
      </footer>
    </>
  );
}

export default App;
