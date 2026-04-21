import "./App.css";
import Navbar from "./components/Navbar";
import Social from "./components/Social";
import SiteRoutes from "./routes/SiteRoutes";
import ContactModal from "./components/ContactModal";
import { useLanguage } from "./context/LanguageContext";

function App() {
  const { t, theme } = useLanguage();

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
        <div className="mx-auto max-w-xl bg-white rounded-xl shadow-lg dark:bg-gray-800">
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
          className="flex items-center gap-x-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <img 
            src={theme === 'dark' ? '/src/assets/logo_soul23/soul23_logo.svg' : '/src/assets/logo_soul23/soul23_logo.svg'} 
            alt="soul23.cloud" 
            className="w-5 h-5"
          />
          <span>© {new Date().getFullYear()} soul23.cloud</span>
        </a>
      </footer>
    </>
  );
}

export default App;