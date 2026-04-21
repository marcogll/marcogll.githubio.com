import { NavLink } from "react-router-dom";
import { getConfigData } from "../data/configReader";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const configData = getConfigData();
  const { t, toggleLang, lang } = useLanguage();

  return (
    <>
      <header className="py-2 px-2 fixed top-0 left-0 w-full z-40">
        <div className="mx-auto max-w-xl ">
          <div className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-40 rounded-xl flex items-center justify-between shadow-md">
            <div className="flex gap-x-3 px-5 py-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white rounded-full p-2 transition-all duration-300"
                    : "opacity-50 p-2 hover:bg-white rounded-full transition-all duration-300 hover:opacity-100"
                }
              >
                <span className="material-symbols-rounded text-2xl">home</span>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white rounded-full p-2 transition-all duration-300"
                    : "opacity-50 p-2 hover:bg-white rounded-full transition-all duration-300 hover:opacity-100"
                }
              >
                <span className="material-symbols-rounded text-2xl">person</span>
              </NavLink>

              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white rounded-full p-2 transition-all duration-300"
                    : "opacity-50 p-2 hover:bg-white rounded-full transition-all duration-300 hover:opacity-100"
                }
              >
                <span className="material-symbols-rounded text-2xl">folder</span>
              </NavLink>

            </div>
            <div className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={toggleLang}
                className="p-2 text-lg"
                title={lang === "en" ? "Español" : "English"}
              >
                {lang === "en" ? "🇺🇸" : "🇲🇽"}
              </button>
              <a
                href={configData.hireMeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 px-3 py-1.5 text-sm font-medium text-white bg-black border border-black rounded-md relative overflow-hidden shadow-md mx-7 before:absolute before:right-0 before:top-0 before:h-10 before:w-5 before:translate-x-10 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-36"
              >
                <span className="material-symbols-rounded text-lg">
                  calendar_month
                </span>
                <span className="hidden md:block">{t.letsTalk}</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
