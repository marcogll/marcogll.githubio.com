import profile from "../assets/profile.jpg";
import CopyEmailButton from "./CopyEmailButton";
import { getConfigData } from "../data/configReader";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import ContactModal from "./ContactModal";

export default function Profile() {
  const configData = getConfigData() || {};
  const { t, toggleLang, lang } = useLanguage();
  const [showContact, setShowContact] = useState(false);
  const isAvailable = configData.status === "on";

  const job = lang === "es" && configData.jobEs ? configData.jobEs : configData.job;
  const desc = lang === "es" && configData.descEs ? configData.descEs : configData.desc;

  const workStatusTextClass = `
    ${
      isAvailable
        ? "bg-[#d0fadf] text-[#109d5c]"
        : "bg-[#ff9d9d] text-[#f74d4d]"
    }
    flex items-center gap-1 text-[9px] sm:text-[10px] md:text-sm
    font-semibold uppercase rounded-full
    px-2 py-0.5 animate-fade-in
  `.trim();

  const workStatusDotClass = `
    relative w-2 h-2 rounded-full
    ${isAvailable ? "bg-[#109d5c]" : "bg-[#f74d4d]"}
  `.trim();

  const pingCircleClass = `
    absolute inset-0 rounded-full border border-[#109d5c]
    animate-ping-slower
  `.trim();

  const workStatusText = isAvailable ? t.available : t.busy;

  return (
    <>
      <style>{`
        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping-slower {
          animation: ping-slower 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="flex items-center justify-between px-3 sm:px-5 pt-4 sm:pt-5">
        <div className="text-sm sm:text-base font-medium flex items-center gap-x-1.5 sm:gap-x-2">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full" />
          {job}
        </div>
        <div className={workStatusTextClass}>
          <div className={workStatusDotClass}>
            {isAvailable && <span className={pingCircleClass}></span>}
          </div>
          <span className="block whitespace-nowrap">{workStatusText}</span>
        </div>
      </div>

      <div className="px-3 sm:px-5 pb-5 flex flex-col-reverse md:flex-row md:items-center md:justify-between pt-1.5 sm:pt-2 md:pt-3">
        <div className="flex flex-col gap-y-1 md:gap-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left tracking-tight">
            {t.im} {configData.name}
          </h1>

          <p className="text-sm sm:text-base text-gray-500 leading-snug max-w-xl mx-auto md:mx-0">
            {desc}
          </p>

          <div className="flex flex-wrap gap-3 pt-4 sm:pt-5 justify-center md:justify-start">
            <button
              type="button"
              onClick={() => setShowContact(true)}
              className="inline-flex items-center gap-x-1 px-3 py-1.5 text-sm font-medium text-white bg-black border border-black rounded-md relative overflow-hidden shadow-md before:absolute before:top-0 before:right-0 before:h-10 before:w-5 before:translate-x-10 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-36"
            >
              <span className="material-symbols-rounded text-sm">
                handshake
              </span>
              {t.hireMe}
            </button>
            <CopyEmailButton />
          </div>
        </div>

        <div className="rounded-full p-1 flex items-center justify-center mb-4 sm:mb-5 md:mb-7">
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 flex items-center justify-center">
            <img
              src={profile}
              alt="Profile"
              className="w-[110%] h-[100%] rounded-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}