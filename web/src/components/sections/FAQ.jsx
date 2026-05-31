import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

import {
  FAQ_BOTTOM_FADE,
  FAQ_TOP_FADE,
  LANDING_NAVY_BG_FAQ,
} from "../../config/landingTheme";

const FAQ_ITEMS = [
  {
    q: "Dosyalarım nerede tutuluyor?",
    a: "Güvenliğiniz bizim önceliğimizdir. Dosyalar yalnızca işlem sırasında geçici olarak depolanır ve işlem bittikten 15 dakika sonra sunucularımızdan tamamen silinir.",
  },
  {
    q: "Hizmetler tamamen ücretsiz mi?",
    a: "Evet, temel PDF araçlarımızın tamamı ücretsizdir. Herhangi bir gizli ücret veya abonelik zorunluluğu bulunmamaktadır.",
  },
  {
    q: "Hangi dosya türleri destekleniyor?",
    a: "Şu anda PDF, Word, Excel ve popüler görsel formatlarını (JPG, PNG) destekliyoruz. Desteklenen format listesini sürekli genişletiyoruz.",
  },
  {
    q: "Dosya boyutu sınırı var mı?",
    a: "Hızlı bir deneyim sunmak adına şu an için dosya başına 50MB sınırı bulunmaktadır. Bu sınır çoğu standart doküman için fazlasıyla yeterlidir.",
  },
  {
    q: "Hesap oluşturmadan kullanabilir miyim?",
    a: "Elbette. DosyaHub'ı kullanmak için üye olmanıza gerek yoktur. Dosyanızı yükleyip işleminizi anında tamamlayabilirsiniz.",
  },
  {
    q: "Mobil uyumlu mu?",
    a: "DosyaHub tamamen responsive bir yapıya sahiptir. Telefonunuzdan veya tabletinizden tarayıcı aracılığıyla tüm araçlarımıza kolayca erişebilirsiniz.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      className={`relative overflow-hidden ${LANDING_NAVY_BG_FAQ} pt-16 pb-20 sm:pt-20 sm:pb-24`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b ${FAQ_TOP_FADE}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 bg-gradient-to-b ${FAQ_BOTTOM_FADE}`}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Sıkça sorulan{" "}
            <span className="bg-gradient-to-r from-violet-300/95 to-violet-400 bg-clip-text text-transparent">
              sorular
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Merak ettiğiniz konulara hızlıca göz atın.
          </p>
        </header>

        <ul className="mx-auto mt-12 max-w-3xl space-y-3 sm:mt-14">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = open === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <li key={item.q}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-violet-400/25 bg-white/[0.05] shadow-lg shadow-black/20"
                      : "border-white/[0.08] bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50 sm:px-6 sm:py-5"
                  >
                    <span
                      className={`pr-2 text-[15px] font-semibold leading-snug transition-colors duration-300 sm:text-base ${
                        isOpen ? "text-violet-200" : "text-slate-50"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                        isOpen
                          ? "bg-violet-500/15 text-violet-300"
                          : "bg-white/[0.04] text-slate-500"
                      }`}
                    >
                      <HiChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="border-t border-white/[0.06] px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-400 sm:px-6 sm:pb-6 sm:text-[15px]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
