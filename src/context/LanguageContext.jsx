import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    hireMe: "Hire Me",
    copyEmail: "Copy Email",
    copied: "Copied!",
    available: "available for work",
    busy: "busy",
    translate: "ES",
    projects: "Projects",
    contacts: "Contacts",
    about: "About",
    backToHome: "Back to Home",
    viewAll: "View All",
    im: "I'm",
    hiIm: "Hi, I'm",
    letsWork: "Let's work together.",
    understanding: "Understanding your problem and finding the best solution.",
    crafting: "Crafting engaging user experiences",
  },
  es: {
    hireMe: "Contratarme",
    copyEmail: "Copiar Email",
    copied: "Copiado!",
    available: "disponible",
    busy: "ocupado",
    translate: "EN",
    projects: "Proyectos",
    contacts: "Contacto",
    about: "Acerca de",
    backToHome: "Volver",
    viewAll: "Ver Todo",
    im: "Soy",
    hiIm: "Hola, soy",
    letsWork: "Trabajemos juntos.",
    understanding: "Entendiendo tu problema y encontrando la mejor solución.",
    crafting: "Creando experiencias de usuario atractivas",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const toggleLang = () => setLang(lang === "en" ? "es" : "en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}