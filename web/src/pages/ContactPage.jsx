import Logo from "../components/common/Logo";
import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiLocationMarker,
  HiPaperAirplane,
  HiExclamation,
  HiDocument,
} from "react-icons/hi";

export default function ContactPage() {
  const [mode, setMode] = useState("contact");

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
        İletişim
      </h1>

      <div className="mb-8 inline-flex rounded-xl border border-zinc-200 dark:border-zinc-800 p-1 bg-white/70 dark:bg-zinc-900/70">
        <button
          onClick={() => setMode("contact")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "contact"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 cursor-pointer"
          }`}
        >
          Genel İletişim
        </button>
        <button
          onClick={() => setMode("support")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "support"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 cursor-pointer"
          }`}
        >
          Öneri / Geri Bildirim
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {mode === "contact" ? <ContactForm /> : <FeedbackForm />}

        <AsideCard />
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _hp: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData._hp) return;

    setSubmitting(true);
    try {
      console.log("contact: ", formData);
      alert("Mesajınız gönderildi! Teşekkürler.");
      setFormData({ name: "", email: "", message: "", _hp: "" });
    } catch (err) {
      console.error(err);
      alert("Üzgünüz, bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-6 md:p-8 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ad Soyad</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-950 focus:outline-none focus:ring focus:ring-indigo-400/50"
            placeholder="Adınızı ve soyadınızı girin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-posta</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-950 focus:outline-none focus:ring focus:ring-indigo-400/50"
            placeholder="ornek@mail.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mesajınız</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-950 focus:outline-none focus:ring focus:ring-indigo-400/50"
          placeholder="Mesajınızı yazın..."
          required
        />
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

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95 disabled:opacity-70"
      >
        {submitting ? "Gönderiliyor..." : "Gönder"}{" "}
        <HiPaperAirplane className="h-5 w-5" />
      </button>
    </form>
  );
}

function FeedbackForm() {
  const [data, setData] = useState({ email: "", message: "", _hp: "" });
  const [submitting, setSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (data._hp) return;
    if (!data.email || !data.message) {
      alert("Lütfen e-posta ve mesaj alanlarını doldurun.");
      return;
    }

    setSubmitting(true);
    try {
      console.log("feedback:", data);
      alert("Geri bildiriminiz alındı. Teşekkür ederiz.");
      setData({ email: "", message: "", _hp: "" });
    } catch (err) {
      console.error(err);
      alert("Üzgünüz, bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-6 md:p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-medium mb-1">E-posta</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-950 focus:outline-none focus:ring focus:ring-indigo-400/50"
          placeholder="ornek@mail.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Öneriniz / Geri Bildiriminiz
        </label>
        <textarea
          name="message"
          value={data.message}
          onChange={onChange}
          rows={5}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-950 focus:outline-none focus:ring focus:ring-indigo-400/50"
          placeholder="Düşüncelerinizi bizimle paylaşın..."
          required
        />
      </div>

      <input
        type="text"
        name="_hp"
        value={data._hp}
        onChange={onChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95 disabled:opacity-70"
      >
        {submitting ? "Gönderiliyor..." : "Gönder"}{" "}
        <HiPaperAirplane className="h-5 w-5" />
      </button>
    </form>
  );
}

function AsideCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-6 md:p-8 space-y-6">
      <div className="flex flex-col items-center mb-4">
        <Logo size="lg" />
        <div className="w-full border-t border-zinc-200 dark:border-zinc-800 mt-3"></div>
      </div>

      <div className="flex items-center gap-3">
        <HiOutlineMail className="h-6 w-6 text-indigo-500" />
        <div>
          <p className="font-medium">E-posta</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            destek@dosyahub.com
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <HiOutlinePhone className="h-6 w-6 text-indigo-500" />
        <div>
          <p className="font-medium">Telefon</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            +90 212 000 00 00
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <HiLocationMarker className="h-6 w-6 text-indigo-500" />
        <div>
          <p className="font-medium">Adres</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Kağıthane, İstanbul / Türkiye
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 p-4 text-sm leading-6">
        <p className="font-medium mb-1 flex items-center gap-2">
          <HiExclamation className="h-5 w-5" /> Daha iyi geri bildirim için:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Kullandığınız tarayıcı ve işletim sistemini yazın</li>
          <li>İlgili sayfayı belirtin</li>
          <li>Açık ve net ifade edin</li>
        </ul>
      </div>

      <a
        href="/faq"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
      >
        <HiDocument className="h-5 w-5" /> SSS'yi gör
      </a>
    </div>
  );
}
