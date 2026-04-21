import { useState } from "react";
import { getConfigData } from "../data/configReader";
import { useLanguage } from "../context/LanguageContext";

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const configData = getConfigData();
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const webhookUrl = configData.contactWebhook;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            _lang: lang,
            _timestamp: new Date().toISOString(),
          }),
        });
      }
      setStatus("sent");
      setFormData({ name: "", email: "", phone: "", business: "", subject: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 2500);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <span className="material-symbols-rounded">close</span>
        </button>

        <h2 className="text-xl font-semibold mb-4">{t.hireMe}</h2>

        {status === "sent" ? (
          <div className="text-center py-8">
            <span className="material-symbols-rounded text-5xl text-green-500">
              check_circle
            </span>
            <p className="mt-4 text-green-600 font-medium">{t.successMessage || "Message sent successfully!"}</p>
          </div>
        ) : status === "error" ? (
          <div className="text-center py-8">
            <span className="material-symbols-rounded text-5xl text-red-500">
              error
            </span>
            <p className="mt-4 text-red-600 font-medium">{t.errorMessage || "Error sending message. Try again."}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t.contactName || "Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t.contactEmail || "Email"} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t.contactPhone || "Phone"}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t.contactBusiness || "Business"}
                </label>
                <input
                  type="text"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {t.contactSubject || "Subject"} *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {t.contactMessage || "Message"} *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-2.5 mt-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <span className="material-symbols-rounded text-sm animate-spin">sync</span>
                  {t.sending || "Sending..."}
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded text-sm">send</span>
                  {t.send || "Send"}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}