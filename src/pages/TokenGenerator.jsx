import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const PRESETS = [
  { name: "Alphanumeric", nameEs: "Alfanumérico", chars: "lower+numb" },
  { name: "Complex", nameEs: "Complejo", chars: "all" },
  { name: "Numbers Only", nameEs: "Solo Números", chars: "numb" },
  { name: "Easy Read", nameEs: "Fácil Leer", chars: "lower" },
];

function generateToken(length, charSet) {
  let chars = "";
  if (charSet === "lower") chars = CHAR_SETS.lowercase;
  else if (charSet === "upper") chars = CHAR_SETS.uppercase;
  else if (charSet === "numb") chars = CHAR_SETS.numbers;
  else if (charSet === "lower+upper") chars = CHAR_SETS.lowercase + CHAR_SETS.uppercase;
  else if (charSet === "lower+numb") chars = CHAR_SETS.lowercase + CHAR_SETS.numbers;
  else if (charSet === "upper+numb") chars = CHAR_SETS.uppercase + CHAR_SETS.numbers;
  else if (charSet === "all")
    chars =
      CHAR_SETS.lowercase +
      CHAR_SETS.uppercase +
      CHAR_SETS.numbers +
      CHAR_SETS.symbols;

  if (!chars) chars = CHAR_SETS.lowercase + CHAR_SETS.numbers;

  let token = "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    token += chars[arr[i] % chars.length];
  }
  return token;
}

export default function TokenGenerator() {
  const { lang } = useLanguage();
  const [length, setLength] = useState(16);
  const [preset, setPreset] = useState("lower+numb");
  const [customChars, setCustomChars] = useState("");
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preset === "custom") {
      if (customChars.length > 0) {
        const arr = new Uint32Array(length);
        crypto.getRandomValues(arr);
        let result = "";
        for (let i = 0; i < length; i++) {
          result += customChars[arr[i] % customChars.length];
        }
        setToken(result);
      }
    } else {
      setToken(generateToken(length, preset));
    }
  }, [length, preset, customChars]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleRegenerate = () => {
    if (preset === "custom") {
      if (customChars.length > 0) {
        const arr = new Uint32Array(length);
        crypto.getRandomValues(arr);
        let result = "";
        for (let i = 0; i < length; i++) {
          result += customChars[arr[i] % customChars.length];
        }
        setToken(result);
      }
    } else {
      setToken(generateToken(length, preset));
    }
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto">
      <h1 className="flex items-center gap-x-2 text-lg font-medium mb-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        {lang === "es" ? "Generador de Token" : "Token Generator"}
      </h1>

      <p className="text-sm text-gray-600 mb-4">
        {lang === "es"
          ? "Genera tokens aleatorios seguros (10-128 caracteres)."
          : "Generate secure random tokens (10-128 characters)."}
      </p>

      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === "es" ? "Longitud" : "Length"}: {length}
          </label>
          <input
            type="range"
            min="10"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10</span>
            <span>128</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === "es" ? "Preset" : "Preset"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setPreset(p.chars)}
                className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                  preset === p.chars
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {lang === "es" ? p.nameEs : p.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPreset("custom")}
              className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                preset === "custom"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
              }`}
            >
              {lang === "es" ? "Personalizado" : "Custom"}
            </button>
          </div>
        </div>

        {preset === "custom" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === "es" ? "Caracteres" : "Characters"}
            </label>
            <input
              type="text"
              value={customChars}
              onChange={(e) => setCustomChars(e.target.value)}
              placeholder="abc123XYZ"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        )}

        {token && (
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === "es" ? "Token generado" : "Generated Token"}
            </label>
            <div className="bg-white border border-gray-200 rounded-lg p-3 font-mono text-sm break-all">
              {token}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleRegenerate}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-all"
          >
            <span className="material-symbols-rounded text-base align-middle mr-1">
              refresh
            </span>
            {lang === "es" ? "Regenerar" : "Regenerate"}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
              copied
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <span className="material-symbols-rounded text-base align-middle mr-1">
              {copied ? "check" : "content_copy"}
            </span>
            {copied
              ? lang === "es"
                ? "Copiado!"
                : "Copied!"
              : lang === "es"
              ? "Copiar"
              : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}