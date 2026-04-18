import "./App.css";
import Navbar from "./components/Navbar";
import Social from "./components/Social";
import SiteRoutes from "./routes/SiteRoutes";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-[5rem] px-2 py-2">
        <div className="mx-auto max-w-xl bg-white rounded-xl shadow-lg">
          <div className="flex flex-col">
            <SiteRoutes />
            <Social />
          </div>
        </div>
      </div>
      <footer className="pb-4 flex justify-center">
        <a
          href="https://soul23.cloud"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-x-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="material-symbols-rounded text-lg">language</span>
          soul23.cloud
        </a>
      </footer>
    </>
  );
}

export default App;
