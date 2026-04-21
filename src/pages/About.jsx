import CopyEmailButton from "../components/CopyEmailButton";
import { getConfigData } from "../data/configReader";
import { useLanguage } from "../context/LanguageContext";

const SKILLS = [
  {
    category: "Core Expertise",
    categoryEs: "Experiencia Central",
    items: [
      { name: "Process Automation", nameEs: "Automatización de Procesos", score: 10 },
      { name: "Process Optimization", nameEs: "Optimización de Procesos", score: 9 },
      { name: "Manufacturing Business Management", nameEs: "Gestión de Negocios de Manufactura", score: 9 },
      { name: "Mechatronics Engineering", nameEs: "Ingeniería Mecatrónica", score: 9 },
    ],
  },
  {
    category: "Development & Tech Stack",
    categoryEs: "Desarrollo y Tech Stack",
    items: [
      { name: "Bots & Scripts", nameEs: "Bots y Scripts", score: 10 },
      { name: "Python & Node.js", nameEs: "Python & Node.js", score: 9.5 },
      { name: "Frontend (HTML, CSS, JS)", nameEs: "Frontend (HTML, CSS, JS)", score: 8 },
    ],
  },
  {
    category: "Infrastructure & Support",
    categoryEs: "Infraestructura y Soporte",
    items: [
      { name: "Hosting", nameEs: "Hosting", score: 10 },
      { name: "Online & Remote Support", nameEs: "Soporte Online y Remoto", score: 10 },
      { name: "Docker, Kubernetes & Servers", nameEs: "Docker, Kubernetes y Servidores", score: 8 },
    ],
  },
];

const ProgressBar = ({ score }) => {
  const percentage = (score / 10) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const SkillCategory = ({ category }) => {
  const { lang } = useLanguage();
  const items = Array.isArray(category?.items) ? category.items : [];
  const categoryName = lang === "es" && category?.categoryEs ? category.categoryEs : category?.category;

  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="font-semibold text-gray-800 mb-4">{categoryName}</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const itemName = lang === "es" && item.nameEs ? item.nameEs : item.name;
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{itemName}</span>
                <span className="text-gray-500 font-medium">{item.score}/10</span>
              </div>
              <ProgressBar score={item.score} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function About() {
  const configData = getConfigData() || {};
  const { t, lang } = useLanguage();

  const aboutDesc = lang === "es" && configData.aboutDescEs ? configData.aboutDescEs : (configData.aboutDesc || "");

  return (
    <>
      <div className="px-7 py-7">
        <h1 className="flex items-center gap-x-2 text-lg font-medium">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          {t.about}
        </h1>
      </div>

      <div className="px-7 py-7 flex flex-col items-center pt-3 gap-8">
        <div className="flex flex-col gap-y-4 max-w-3xl w-full mx-auto text-center">
          <h1 className="text-4xl font-semibold tracking-tighter">
            {t.hiIm} {configData.name}
          </h1>
          <p className="text-lg text-gray-500 font-normal tracking-tight">
            {aboutDesc}
          </p>
        </div>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          {SKILLS.map((category, index) => (
            <SkillCategory key={index} category={category} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center">
          {t.letsWork}
        </h1>
        <p className="text-sm md:text-lg text-gray-500 mt-2">
          {t.crafting}
        </p>
      </div>

      <div className="flex md:flex-row items-center justify-center py-8 px-4 max-w-3xl mx-auto">
        <div className="flex flex-col gap-y-2 w-full md:w-auto">
          <div className="flex items-center justify-center gap-4">
            <a
              href={configData.hireMeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="inline-flex items-center gap-x-1 px-3 py-1.5 text-sm font-medium text-white bg-black border border-black rounded-md relative overflow-hidden shadow-md transition-all"
              >
                <span className="material-symbols-rounded text-sm">
                  handshake
                </span>
                {t.hireMe}
              </button>
            </a>
            <CopyEmailButton className="mr-0 mb-0" />
          </div>
        </div>
      </div>
    </>
  );
}
