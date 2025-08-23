import { useState } from "react";
import {
  HiOutlineMail,
  HiPaperAirplane,
  HiCheckCircle,
  HiXCircle,
  HiSparkles,
  HiShieldCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa6";

export default function ContactPage() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <BackgroundOrbs />
      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="relative flex flex-col justify-between rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/70 p-6 md:p-8 shadow-sm">
          <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-purple-600 rounded-t-2xl" />
          <LeftPanel />
        </div>

        <div className="flex flex-col">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );
}

function LeftPanel() {
  return (
    <aside className="flex flex-col h-full justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-900/50 bg-indigo-50/70 dark:bg-indigo-950/40 px-3 py-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-200">
          <HiSparkles className="h-4 w-4" />
          <span>Genellikle aynı gün yanıt</span>
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Bizimle İletişime Geçin
        </h1>
        <p className="mt-2 text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
          Sorularınız, iş birliği istekleriniz veya teknik konularla ilgili
          mesajlarınızı bekliyoruz. Formu gönderin, size dönüş yapalım.
        </p>

        <div className="mt-8 space-y-4">
          <ContactCard
            icon={<HiOutlineMail className="h-6 w-6" />}
            label="E-posta"
            value={
              <a
                href="mailto:destek@dosyahub.com?subject=DosyaHub%20Iletişim"
                className="text-indigo-600 dark:text-indigo-300 hover:underline"
              >
                destek@dosyahub.com
              </a>
            }
          />

          <ContactCard
            icon={<HiOutlineLocationMarker className="h-6 w-6" />}
            label="Adres"
            value={
              <a
                href="https://www.google.com/maps/place/İstanbul,+Türkiye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-300 hover:underline"
              >
                İstanbul, Türkiye
              </a>
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          Bize sosyal medyadan ulaşın
        </p>
        <div className="flex items-center gap-3">
          <SocialIcon
            href="https://instagram.com/dosyahub"
            label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-4 w-4" />
          </SocialIcon>

          <SocialIcon
            href="https://linkedin.com/company/dosyahub"
            label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-4 w-4" />
          </SocialIcon>
        </div>
      </div>
    </aside>
  );
}

function ContactCard({ icon, label, value, href }) {
  const Inner = (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 shadow-sm hover:shadow transition">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
        {icon}
      </div>
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {Inner}
    </a>
  ) : (
    <div>{Inner}</div>
  );
}

function SocialIcon({ href, label, children, ...props }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-indigo-300/70 dark:hover:border-indigo-800/70 transition"
    >
      {children}
    </a>
  );
}

function ContactForm() {
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
    if (formData._hp) return;

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
              className="w-full rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 px-3 py-3
                       bg-white/80 dark:bg-zinc-950/60
                        focus:outline-none focus:border-indigo-500 transition-colors"
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
                className="w-full rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 pl-10 pr-3 py-3
                          bg-white/80 dark:bg-zinc-950/60
                            focus:outline-none focus:border-indigo-500 transition-colors"
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
              className="w-full rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 px-3 py-3
                        bg-white/80 dark:bg-zinc-950/60
                          focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Mesajınızı yazın..."
              required
            />
          </Field>
        </div>
      </div>

      <input
        type="text"
        name="_hp"
        value={formData._hp}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
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
    </form>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm">
      <span className="mb-1 inline-block font-medium text-zinc-800 dark:text-zinc-100">
        {label}
      </span>
      <div>{children}</div>
    </label>
  );
}
