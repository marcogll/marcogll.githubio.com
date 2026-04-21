import { useState } from "react";
import { getConfigData } from "../data/configReader";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const ProjectIcon = ({ icon }) => (
  <div className="rounded-full items-center justify-center border border-gray-200 group-hover:border-gray-300 transition-colors duration-200 hidden md:flex md:items-center md:justify-center bg-gray-50">
    <span className="material-symbols-rounded text-2xl text-gray-600">{icon}</span>
  </div>
);

const ProjectContent = ({ name, description }) => (
  <div className="flex flex-col justify-center flex-1">
    <h1 className="font-medium text-base">{name}</h1>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

const ProjectCard = ({ project }) => {
  const { lang } = useLanguage();
  const name = lang === "es" && project["project-name-es"] ? project["project-name-es"] : project["project-name"];
  const description = lang === "es" && project["project-desc-es"] ? project["project-desc-es"] : project["project-desc"];

  return (
    <a
      className="group bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 gap-x-3 md:gap-x-4 flex flex-row items-center hover:-translate-y-0.5 duration-200 transition-all ease-in-out border border-gray-100 hover:border-gray-200 hover:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05)]"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProjectIcon icon={project["project-icon"]} />
      <ProjectContent
        name={name}
        description={description}
      />
    </a>
  );
};

const SectionHeader = ({ onViewAll }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="font-medium text-lg flex items-center gap-x-2">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        {t.projects}
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="text-gray-900 bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
      >
        {t.viewAll || "View All"}
      </button>
    </div>
  );
};

export default function Card() {
  const configData = getConfigData();
  const projects = configData.projects;
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/projects");
  };

  return (
    <div className="px-2">
      <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5">
        <SectionHeader onViewAll={handleViewAll} />
        <div className="flex flex-col gap-y-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
