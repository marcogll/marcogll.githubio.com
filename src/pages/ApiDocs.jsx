import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const API_ENDPOINTS = [
  {
    path: "/api/time",
    method: "GET",
    description: "Returns current time in the configured timezone",
    params: ["TIMEZONE env (optional) - defaults to UTC"],
    response: {
      utc_iso: "2026-04-21T17:47:27.836Z",
      unixtime: 1776793647,
      datetime_human: "04/21/2026, 11:47:27",
      timezone: "America/Monterrey"
    }
  },
  {
    path: "/api/quote",
    method: "GET",
    description: "Returns a random motivational phrase",
    params: [],
    response: {
      phrase: "Lo que hoy parece lento es profundo."
    }
  },
  {
    path: "/api/contact",
    method: "POST",
    description: "Send contact form data to webhook (requires CONTACT_WEBHOOK env)",
    params: ["name, email, phone, business, subject, message"],
    response: {
      success: true
    }
  }
];

export default function ApiDocs() {
  const { t } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const apiPassword = import.meta.env.VITE_API_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === apiPassword || !apiPassword) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!apiPassword) {
    return <ApiDocsContent />;
  }

  if (!authenticated) {
    return (
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">API Access</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            {error && <p className="text-red-500 text-xs">Invalid password</p>}
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium"
            >
              Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <ApiDocsContent />;
}

function ApiDocsContent() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h1 className="flex items-center gap-x-2 text-lg font-medium mb-6">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        API
      </h1>

      <div className="flex flex-col gap-6">
        {API_ENDPOINTS.map((endpoint, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 text-xs font-mono bg-green-100 text-green-700 rounded">
                {endpoint.method}
              </span>
              <code className="text-sm font-mono text-gray-700">{endpoint.path}</code>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{endpoint.description}</p>
            
            {endpoint.params.length > 0 && (
              <div className="mb-3">
                <span className="text-xs font-medium text-gray-500">Parameters:</span>
                <ul className="text-xs text-gray-600 mt-1">
                  {endpoint.params.map((param, i) => (
                    <li key={i}>• {param}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <span className="text-xs font-medium text-gray-500">Response:</span>
              <pre className="mt-1 p-2 bg-gray-800 text-green-400 text-xs rounded overflow-x-auto">
{JSON.stringify(endpoint.response, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}