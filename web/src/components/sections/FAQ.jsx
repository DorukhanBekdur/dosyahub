import { useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const items = [
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

  return (
    <section id="faq" className="relative bg-[#0f0a1e] py-24 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Sıkça Sorulan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Sorular
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Merak ettiğiniz konulara hızlıca göz atın.
          </p>
        </div>

        {/* AKORDEON LİSTESİ */}
        <div className="grid gap-4">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className={`group rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-500/30 bg-white/[0.05] shadow-xl shadow-indigo-500/5"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                >
                  <span
                    className={`font-semibold transition-colors duration-300 ${
                      isOpen
                        ? "text-indigo-400"
                        : "text-white group-hover:text-zinc-300"
                    }`}
                  >
                    {it.q}
                  </span>
                  <div
                    className={`p-1 rounded-lg transition-all duration-300 ${
                      isOpen
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    <HiChevronDown
                      className={`h-5 w-5 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-[15px] border-t border-white/5 pt-4 mx-6 mb-2">
                        {it.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
