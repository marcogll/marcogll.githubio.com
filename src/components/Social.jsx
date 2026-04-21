import { FaLinkedinIn, FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import configData from "../data/config.json";
import { useLanguage } from "../context/LanguageContext";

export default function Social() {
  const socialLinks = configData.social;
  const { t } = useLanguage();

  return (
    <>
      <div className="px-2">
        <div className="flex items-center justify-between px-7 py-7 bg-gray-100 rounded-lg">
          <div className="font-medium text-lg flex items-center gap-x-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            {t.contacts}
          </div>
          <div className="flex gap-x-1">
            {socialLinks.map((socialLink, index) => {
              const iconMap = {
                FaLinkedinIn,
                FaGithub,
                FaXTwitter,
                FaInstagram,
              };
              const IconComponent = iconMap[socialLink.icon];

              return (
                <a
                  key={index}
                  href={socialLink.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full duration-300 border-2 border-gray-100 hover:border-gray-200 drop-shadow-sm"
                >
                  {IconComponent && <IconComponent size={20} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
