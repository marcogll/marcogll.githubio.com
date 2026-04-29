import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getConfigData } from "../data/configReader";
import { useLanguage } from "../context/LanguageContext";

const TOOLS = [
  { path: "/tools/qr", icon: "qr_code", label: "QR", labelEs: "QR" },
  { path: "/tools/token", icon: "token", label: "Token", labelEs: "Token" },
];

export default function Navbar() {
  const configData = getConfigData();
  const { t, toggleLang, lang } = useLanguage();
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };

    if (toolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [toolsOpen]);

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

              <div className="relative" ref={toolsRef}>
                <button
                  type="button"
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`p-2 transition-all duration-300 ${
                    toolsOpen
                      ? "bg-white rounded-full"
                      : "opacity-50 hover:bg-white hover:rounded-full hover:opacity-100"
                  }`}
                >
                  <span className="material-symbols-rounded text-2xl">construction</span>
                </button>

                {toolsOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px] z-50">
                    {TOOLS.map((tool) => (
                      <NavLink
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setToolsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 text-sm ${
                            isActive
                              ? "bg-gray-100 text-black"
                              : "text-gray-600 hover:bg-gray-50"
                          }`
                        }
                      >
                        <span className="material-symbols-rounded text-lg">
                          {tool.icon}
                        </span>
                        <span>
                          {lang === "es" ? tool.labelEs : tool.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
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