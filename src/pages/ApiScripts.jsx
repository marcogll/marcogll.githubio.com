import { useEffect, useState } from "react";

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 1024) {
    return `${bytes || 0} B`;
  }

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export default function ApiScripts() {
  const [scripts, setScripts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    fetch("/api/scripts-manifest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load scripts");
        }

        return response.json();
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setScripts(data.scripts || []);
        setStatus("ready");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h1 className="flex items-center gap-x-2 text-lg font-medium mb-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        API Scripts
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Scripts publicados desde <code>/scripts</code>. Esta seccion vive en
        <code className="ml-1">/api/scripts</code> y expone archivos shell,
        Python y utilidades relacionadas.
      </p>

      {status === "loading" && (
        <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600">
          Loading scripts...
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 rounded-xl p-5 text-sm text-red-700">
          Scripts manifest could not be loaded.
        </div>
      )}

      {status === "ready" && (
        <div className="flex flex-col gap-4">
          {scripts.length === 0 && (
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600">
              No scripts found in <code>/scripts</code>.
            </div>
          )}

          {scripts.map((script) => (
            <article key={script.name} className="bg-gray-50 rounded-xl p-5">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-2 py-1 text-xs font-mono bg-blue-100 text-blue-700 rounded">
                  {script.extension || "file"}
                </span>
                <code className="text-sm font-mono text-gray-700">
                  {script.name}
                </code>
              </div>

              <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mb-4">
                <span>{formatBytes(script.size)}</span>
                <span>Updated {formatDate(script.modifiedAt)}</span>
              </div>

              <a
                href={script.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 px-3 py-2 text-sm font-medium text-white bg-black rounded-md"
              >
                <span className="material-symbols-rounded text-base">download</span>
                Open script
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
