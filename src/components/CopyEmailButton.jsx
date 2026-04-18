import { useState } from "react";
import { getConfigData } from "../data/configReader";
import { useLanguage } from "../context/LanguageContext";

function CopyEmailButton({ className = "" }) {
  const configData = getConfigData();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(configData.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Copy error:", err);
      });
  };

  return (
    <button
      onClick={copyToClipboard}
      className={
        "inline-flex items-center gap-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md mr-2 mb-2 " +
        className
      }
    >
      <span className="material-symbols-rounded text-sm">
        {copied ? "check" : "content_copy"}
      </span>
      {copied ? t.copied : t.copyEmail}
    </button>
  );
}

export default CopyEmailButton;
