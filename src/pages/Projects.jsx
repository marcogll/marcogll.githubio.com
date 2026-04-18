import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const PROJECTS = [
  {
    imageUrl: "/cursos.png",
    name: "Cursos Vanity Experience",
    nameEs: "Cursos Vanity Experience",
    subtitle: "Ecommerce · Tutorials",
    subtitleEs: "Ecommerce · Tutoriales",
    description: "Ecommerce platform for selling tutorials and educational products with integrated payments.",
    descriptionEs: "Plataforma de ecommerce para vender tutoriales y productos educativos con pagos integrados.",
    link: "https://cursos.vanityexperience.mx/",
  },
  {
    imageUrl: "/vanity.png",
    name: "Vanity Experience",
    nameEs: "Vanity Experience",
    subtitle: "Website · E-learning",
    subtitleEs: "Website · E-learning",
    description: "Client website with e-learning platform, course catalog, payment system and internal dashboard.",
    descriptionEs: "Website para clientes con plataforma de e-learning, catálogo de cursos, sistema de pagos y dashboard interno.",
    link: "https://vanityexperience.mx/",
  },
  {
    imageUrl: "/dra_flores.png",
    name: "Dra. Daniela Flores",
    nameEs: "Dra. Daniela Flores",
    subtitle: "Medical Landing",
    subtitleEs: "Landing médica",
    description: "ObGyn linktree-style redirect landing page to consultation, information, and contact.",
    descriptionEs: "Landing page estilo Linktree para redirección a consulta, información y contacto.",
    link: "https://daniela-flores.soul23.cloud/",
  },
  {
    imageUrl: "/gloria_n.png",
    name: "Gloria - Health OS",
    nameEs: "Gloria - Health OS",
    subtitle: "Website · Web App",
    subtitleEs: "Website · Web App",
    description: "Website with companion app for scheduling, patient records, therapist logs, payments, course integration, and online calendar. Try the demo!",
    descriptionEs: "Website con app companion para agendar citas, registro de pacientes, bitácora de terapeuta, pagos, integración de cursos y agenda online. ¡Prueba el demo!",
    link: "https://gloria.soul23.cloud/",
  },
  {
    imageUrl: "/n8n.png",
    name: "AI-Powered Surveys",
    nameEs: "Surveys con IA",
    subtitle: "Survey · AI · Reports",
    subtitleEs: "Survey · IA · Reportes",
    description: "Form that analyzes responses and generates actionable reports without manual entry.",
    descriptionEs: "Formulario que analiza respuestas y genera reportes accionables sin captura manual.",
    link: "https://feedback.soul23.cloud/s/cmnhxc6620000o401c7c874q7",
  },
];

const createArrowIcon = (isHovered) => (
  <span className={`material-symbols-rounded text-xl transition-colors duration-150 ${isHovered ? "text-gray-600" : "text-gray-400"}`}>
    arrow_forward
  </span>
);

const ProjectImage = ({ imageUrl, name }) => (
  <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden items-center justify-center border border-gray-100 flex shadow-sm bg-white">
    <img className="w-10 h-10 object-contain" src={imageUrl} alt={name} />
  </div>
);

const ProjectContent = ({ name, subtitle, description }) => (
  <div className="flex flex-col justify-center py-1">
    <h1 className="font-semibold text-lg text-gray-900 leading-tight">{name}</h1>
    <p className="text-blue-600 text-sm font-medium mt-0.5">{subtitle}</p>
    <p className="text-gray-500 text-sm mt-1 font-medium">{description}</p>
  </div>
);

const ProjectArrow = ({ isHovered }) => (
  <div className="ml-auto hidden md:flex items-center bg-[#f3f4f6] rounded-full p-1 self-center">
    {createArrowIcon(isHovered)}
  </div>
);

const ProjectCard = ({ project, isHovered, onMouseEnter, onMouseLeave }) => {
  const { lang } = useLanguage();
  const name = lang === "es" && project.nameEs ? project.nameEs : project.name;
  const subtitle = lang === "es" && project.subtitleEs ? project.subtitleEs : project.subtitle;
  const description = lang === "es" && project.descriptionEs ? project.descriptionEs : project.description;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="drop-shadow-sm bg-[#f3f4f6]/50 rounded-2xl px-5 py-4 gap-x-5 flex items-center hover:-translate-y-1 hover:scale-[1.01] duration-300 transition ease-in-out hover:shadow-md border border-gray-100 hover:border-gray-300 active:scale-[0.98]"
    >
      <ProjectImage imageUrl={project.imageUrl} name={name} />
      <ProjectContent name={name} subtitle={subtitle} description={description} />
      <ProjectArrow isHovered={isHovered} />
    </a>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col bg-white rounded-3xl px-6 py-8 max-w-4xl mx-auto shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="font-semibold text-2xl flex items-center gap-x-3 text-gray-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            {t.projects}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}