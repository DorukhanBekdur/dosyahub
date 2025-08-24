import { useState } from "react";
import {
  HiOutlineMail,
  HiPaperAirplane,
  HiCheckCircle,
  HiXCircle,
  HiShieldCheck,
} from "react-icons/hi";
import Field from "./Field";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    _hp: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData._hp) return; // honeypot

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        type: "err",
        msg: "Lütfen ad, e-posta ve mesaj alanlarını doldurun.",
      });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      // TODO: backend entegrasyonu
      console.log("contact:", formData);
      setStatus({ type: "ok", msg: "Mesajınız alındı. Teşekkürler!" });
      setFormData({ name: "", email: "", company: "", message: "", _hp: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "err",
        msg: "Üzgünüz, bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting ? "true" : "false"}
      className="flex flex-col justify-between h-full relative border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/70 p-6 md:p-8 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.3)] backdrop-blur rounded-b-2xl"
    >
      <div>
        <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-purple-600" />

        <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/30 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-200">
          <HiShieldCheck className="h-4 w-4" />
          <span>Verileriniz yalnızca iletişim için kullanılır</span>
        </div>

        <div className="space-y-4">
          <Field label="Ad Soyad" htmlFor="name">
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 px-3 py-3 bg-white/80 dark:bg-zinc-950/60 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Adınız ve soyadınız"
              required
            />
          </Field>

          <Field label="E-posta" htmlFor="email">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-2.5">
                <HiOutlineMail className="h-5 w-5 text-zinc-400" />
              </span>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 pl-10 pr-3 py-3 bg-white/80 dark:bg-zinc-950/60 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="ornek@mail.com"
                required
              />
            </div>
          </Field>

          <Field label="Mesajınız" htmlFor="message">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 px-3 py-3 bg-white/80 dark:bg-zinc-950/60 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Mesajınızı yazın..."
              required
            />
          </Field>
        </div>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="_hp"
        value={formData._hp}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:translate-y-[1px] hover:opacity-95 active:translate-y-[2px] disabled:opacity-70 transition cursor-pointer"
        >
          {submitting ? "Gönderiliyor..." : "Mesajı Gönder"}
          <HiPaperAirplane className="h-5 w-5" />
        </button>

        <div role="status" aria-live="polite">
          {status && (
            <p
              className={`flex items-center gap-2 text-sm ${
                status.type === "ok" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {status.type === "ok" ? (
                <HiCheckCircle className="h-5 w-5" />
              ) : (
                <HiXCircle className="h-5 w-5" />
              )}
              {status.msg}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
