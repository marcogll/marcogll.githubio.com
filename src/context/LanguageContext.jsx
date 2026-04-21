import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    hireMe: "Hire Me",
    letsTalk: "Let's talk",
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
    understanding: "Understanding your problem and finding the best solution.",
    crafting: "Crafting engaging user experiences",
    contactName: "Name",
    contactEmail: "Email",
    contactPhone: "Phone",
    contactBusiness: "Business",
    contactSubject: "Subject",
    contactMessage: "Message",
    send: "Send",
    sending: "Sending...",
    successMessage: "Message sent successfully!",
    errorMessage: "Error sending message. Try again.",
    rightsReserved: "All rights reserved",
    footerLegal: "Website, content and brand assets protected.",
  },
  es: {
    hireMe: "Contáctame",
    letsTalk: "¿Platicamos?",
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
    understanding: "Entendiendo tu problema y encontrando la mejor solución.",
    crafting: "Creando experiencias de usuario atractivas",
    contactName: "Nombre",
    contactEmail: "Correo",
    contactPhone: "Teléfono",
    contactBusiness: "Negocio",
    contactSubject: "Asunto",
    contactMessage: "Mensaje",
    send: "Enviar",
    sending: "Enviando...",
    successMessage: "¡Mensaje enviado exitosamente!",
    errorMessage: "Error al enviar. Intenta de nuevo.",
    rightsReserved: "Todos los derechos reservados",
    footerLegal: "Sitio, contenido y recursos de marca protegidos.",
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
