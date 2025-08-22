import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const items = [
    {
      q: "Dosyalarım nerede tutuluyor ?",
      a: "Dosyalar yalnızca işlem sırasında geçici olarak depolanır ve kısa süre sonra silinir.",
    },
    {
      q: "Ücretli mi ?",
      a: "Erken erişim sürecinde temel işlemler ücretsizdir.",
    },
    {
      q: "Hangi dosya türleri desteklenecek ?",
      a: "Şu anda yaygın dosya türleri destekleniyor, ilerleyen süreçte kapsam sürekli genişletilecek.",
    },
    {
      q: "Dönüştürme sırasında dosya boyutu sınırı var mı ?",
      a: "Şu an için küçük ve orta boyutlu dosyalar destekleniyor, çok büyük dosyalar sınırlı olabilir.",
    },
    {
      q: "Hesap oluşturmadan PDF dönüştürebilir miyim ?",
      a: "Evet, temel PDF dönüştürme işlemleri için hesap oluşturmadan da kullanabilirsiniz.",
    },
    {
      q: "Mobil veya masaüstü uygulaması var mı ?",
      a: "Şu an için yalnızca web üzerinden kullanılabiliyor, mobil ve masaüstü uygulamalar geliştiriliyor.",
    },
  ];

  return (
    <section
      id="faq"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Sıkça Sorulan Sorular
        </h2>

        <ul className="mt-6 grid gap-3">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <li key={idx}>
                <div
                  className={`relative rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors ${
                    isOpen
                      ? "bg-zinc-50/70 dark:bg-zinc-900/60"
                      : "bg-white/40 dark:bg-zinc-900/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-xl transition-opacity ${
                      isOpen
                        ? "opacity-100 bg-gradient-to-b from-indigo-500 to-purple-500"
                        : "opacity-0"
                    }`}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-medium">{it.q}</span>
                    <HiChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`px-5 text-sm text-zinc-600 dark:text-zinc-400 overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
                      isOpen ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    {it.a}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
