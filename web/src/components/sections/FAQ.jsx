import { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () => [
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
    ],
    []
  );

  const contentRefs = useRef([]);

  useEffect(() => {
    const onResize = () => {
      setOpen((prev) => (prev !== null ? prev : prev));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      id="faq"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Sıkça Sorulan Sorular
        </h2>

        <ul className="mt-6 grid gap-4">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            const measured = contentRefs.current[idx]?.scrollHeight || 0;

            return (
              <li key={idx}>
                <div
                  className={`relative border transition-colors shadow-sm hover:shadow-md
                  border-zinc-200/80 dark:border-zinc-800/80
                  ${
                    isOpen
                      ? "rounded-r-2xl bg-white/60 dark:bg-zinc-900/60"
                      : "rounded-2xl bg-white/40 dark:bg-zinc-900/40"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-0 top-0 h-full w-[3px] transition-opacity
                    ${
                      isOpen
                        ? "opacity-100 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-none"
                        : "opacity-0 rounded-l-2xl"
                    }`}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="group w-full px-5 py-4 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-inherit"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {it.q}
                    </span>
                    <HiChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform motion-safe:duration-200
                      ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>

                  <div
                    id={`faq-panel-${idx}`}
                    ref={(el) => (contentRefs.current[idx] = el)}
                    style={{ height: isOpen ? measured : 0 }}
                    className="px-5 overflow-hidden transition-[height] motion-safe:duration-250 ease-out"
                  >
                    <div
                      className={`pb-4 text-sm text-zinc-600 dark:text-zinc-400 transition-opacity motion-safe:duration-200
                      ${isOpen ? "opacity-100" : "opacity-0"}`}
                    >
                      {it.a}
                    </div>
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
