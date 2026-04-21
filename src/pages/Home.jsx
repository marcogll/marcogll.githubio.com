import Profile from "../components/Profile";
import Projects from "../components/Projects";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <>
      <Profile />
      <Projects />
      <div className="flex flex-col items-center justify-center py-2">
        <h2 className="text-3xl font-semibold text-center">
          {t.letsWork}
        </h2>
        <p className="text-sm md:text-lg text-gray-500 mt-2">
          {t.understanding}
        </p>
      </div>
    </>
  );
}
