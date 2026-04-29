import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import EasyQRCodeJS from "easyqrcodejs";

const QR_STYLES = [
  {
    id: "round",
    name: "Round",
    nameEs: "Redondo",
    accent: "bg-gray-800",
    dotsOptions: { type: "dots" },
  },
  {
    id: "square",
    name: "Square",
    nameEs: "Cuadrado",
    accent: "bg-blue-600",
    dotsOptions: { type: "square" },
  },
  {
    id: "rounded",
    name: "Rounded",
    nameEs: "Redondeado",
    accent: "bg-green-600",
    dotsOptions: { type: "rounded" },
  },
  {
    id: "extra-rounded",
    name: "Extra Rounded",
    nameEs: "Extra Redondo",
    accent: "bg-purple-600",
    dotsOptions: { type: "extra-rounded" },
  },
  {
    id: "classy",
    name: "Classy",
    nameEs: "Elegante",
    accent: "bg-pink-600",
    dotsOptions: { type: "classy" },
  },
  {
    id: "classy-rounded",
    name: "Classy Rounded",
    nameEs: "Elegante Redondo",
    accent: "bg-red-600",
    dotsOptions: { type: "classy-rounded" },
  },
];

const AUTH_TYPES = [
  { id: "WPA", label: "WPA/WPA2" },
  { id: "WEP", label: "WEP" },
  { id: "nopass", label: "None" },
];

export default function QrGenerator() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("url");

  const [url, setUrl] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("round");

  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiAuth, setWifiAuth] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [qrImage, setQrImage] = useState(null);
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  const generateWifiString = () => {
    const hidden = wifiHidden ? "H:true;" : "";
    const auth = `T:${wifiAuth};`;
    const ssid = `S:${wifiSsid};`;
    const password = wifiAuth !== "nopass" ? `P:${wifiPassword};` : "";
    return `WIFI:${auth}${ssid}${password}${hidden};`;
  };

  const getQrData = () => {
    if (activeTab === "url") {
      let data = url.trim();
      if (
        data &&
        !data.startsWith("http://") &&
        !data.startsWith("https://") &&
        !data.startsWith("mailto:") &&
        !data.startsWith("tel:")
      ) {
        data = "https://" + data;
      }
      return data;
    } else {
      if (!wifiSsid.trim()) {
        return null;
      }
      return generateWifiString();
    }
  };

  useEffect(() => {
    const data = getQrData();
    if (!data || !qrRef.current) return;

    const style = QR_STYLES.find((s) => s.id === selectedStyle);

    qrRef.current.innerHTML = "";

    try {
      const qr = new EasyQRCodeJS(qrRef.current, {
        text: data,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: EasyQRCodeJS.CorrectLevel.M,
        dotsOptions: {
          color: "#000000",
          type: style?.dotsOptions?.type || "rounded",
        },
        backgroundColor: "#ffffff",
        cornerSquareOptions: {
          color: "#000000",
          type: style?.dotsOptions?.type || "rounded",
        },
        cornerDotOptions: {
          color: "#000000",
          type: style?.dotsOptions?.type || "rounded",
        },
      });

      setTimeout(() => {
        const canvas = qrRef.current?.querySelector("canvas");
        if (canvas) {
          setQrImage(canvas.toDataURL("image/png"));
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setError(lang === "es" ? "Error al generar QR" : "Error generating QR");
    }
  }, [url, selectedStyle, activeTab, wifiSsid, wifiPassword, wifiAuth, wifiHidden, lang]);

  const handleDownload = () => {
    if (!qrImage) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `qr-${selectedStyle}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto">
      <h1 className="flex items-center gap-x-2 text-lg font-medium mb-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        {lang === "es" ? "Generador QR" : "QR Generator"}
      </h1>

      <p className="text-sm text-gray-600 mb-4">
        {lang === "es"
          ? "Genera códigos QR para URLs o WiFi."
          : "Generate QR codes for URLs or WiFi."}
      </p>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
            activeTab === "url"
              ? "bg-white text-black shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="material-symbols-rounded text-base align-middle mr-1">
            link
          </span>
          {lang === "es" ? "URL" : "URL"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("wifi")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
            activeTab === "wifi"
              ? "bg-white text-black shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="material-symbols-rounded text-base align-middle mr-1">
            wifi
          </span>
          WiFi
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        {activeTab === "url" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === "es" ? "URL o texto" : "URL or text"}
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        )}

        {activeTab === "wifi" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SSID
              </label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                placeholder="MyWiFi"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === "es" ? "Contraseña" : "Password"}
              </label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === "es" ? "Seguridad" : "Security"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {AUTH_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setWifiAuth(type.id)}
                    className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                      wifiAuth === type.id
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="wifi-hidden"
                checked={wifiHidden}
                onChange={(e) => setWifiHidden(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="wifi-hidden" className="text-sm text-gray-700">
                {lang === "es" ? "Red oculta" : "Hidden network"}
              </label>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === "es" ? "Estilo" : "Style"}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {QR_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  selectedStyle === style.id
                    ? `${style.accent} text-white shadow-md`
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {lang === "es" ? style.nameEs : style.name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</p>
        )}

        {qrImage && (
          <div className="flex flex-col items-center gap-4 pt-4">
            <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-md" />
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium"
            >
              <span className="material-symbols-rounded text-base">
                download
              </span>
              {lang === "es" ? "Descargar" : "Download"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}