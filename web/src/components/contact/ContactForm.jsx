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
    if (formData._hp) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({ type: "err", msg: "Lütfen zorunlu alanları doldurun." });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      // API entegrasyonu buraya gelecek
      setStatus({ type: "ok", msg: "Mesajınız alındı. Teşekkürler!" });
      setFormData({ name: "", email: "", message: "", _hp: "" });
    } catch (err) {
      setStatus({
        type: "err",
        msg: "Bir sorun oluştu, lütfen tekrar deneyin.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col justify-between h-full bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
          <HiShieldCheck className="h-4 w-4" />
          <span className="uppercase tracking-wider text-[10px]">
            GİZLİLİĞİNİZ GÜVENDE
          </span>
        </div>

        <div className="space-y-6">
          <Field label="Ad Soyad" htmlFor="name">
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/5 px-4 py-3.5 bg-white/[0.02] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
              placeholder="Adınız ve soyadınız"
            />
          </Field>

          <Field label="E-posta" htmlFor="email">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                <HiOutlineMail className="h-5 w-5" />
              </span>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/5 pl-12 pr-4 py-3.5 bg-white/[0.02] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
                placeholder="ornek@mail.com"
              />
            </div>
          </Field>

          <Field label="Mesajınız" htmlFor="message">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-white/5 px-4 py-3.5 bg-white/[0.02] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all resize-none"
              placeholder="Size nasıl yardımcı olabiliriz?"
            />
          </Field>
        </div>
      </div>

      <div className="mt-10 relative z-10">
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
        >
          {submitting ? "Gönderiliyor..." : "Mesajı Gönder"}
          <HiPaperAirplane className="h-5 w-5 rotate-45" />
        </button>

        {status && (
          <div role="status" className="mt-4">
            <p
              className={`flex items-center gap-2 text-sm font-medium ${
                status.type === "ok" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {status.type === "ok" ? (
                <HiCheckCircle className="h-5 w-5" />
              ) : (
                <HiXCircle className="h-5 w-5" />
              )}
              {status.msg}
            </p>
          </div>
        )}
      </div>

      <input
        type="text"
        name="_hp"
        value={formData._hp}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
      />
    </form>
  );
}
