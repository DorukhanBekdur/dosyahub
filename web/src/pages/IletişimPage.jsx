import Logo from "../components/common/Logo";
import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiLocationMarker,
  HiPaperAirplane,
} from "react-icons/hi";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Buraya EmailJS veya backend API entegrasyonu eklenecek.
    alert("Mesajınız gönderildi! Teşekkürler.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
        İletişim
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-6 md:p-8 space-y-5"
        >
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

          <div>
            <label className="block text-sm font-medium mb-1">Mesajınız</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-950 focus:outline-none focus:ring focus:ring-indigo-400/50"
              placeholder="Mesajınızı yazın..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95 cursor-pointer"
          >
            Gönder <HiPaperAirplane className="h-5 w-5" />
          </button>
        </form>

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
                dorukhanbekdur@gmail.com
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
        </div>
      </div>
    </section>
  );
}
