import { useReducedMotion, motion } from "framer-motion";
import {
  HiLockClosed,
  HiSparkles,
  HiCloudUpload,
  HiDocumentText,
  HiDownload,
  HiTrash,
  HiCheckCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Hero() {
  const reduce = useReducedMotion();

  const transition = {
    duration: reduce ? 0 : 1.1,
    ease: [0.25, 0.8, 0.25, 1],
    fill: "forwards",
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-black via-[#1a0b2e] to-purple-700"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(70rem_70rem_at_10%_-10%,theme(colors.indigo.400/40),transparent_60%),radial-gradient(60rem_60rem_at_120%_10%,theme(colors.purple.400/35),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        {/* SOL TARAF */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduce ? 0 : 0.1 }}
        >
          <h1
            id="hero-title"
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white max-w-3xl"
          >
            Dosya işlemlerini{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              saniyeler içinde
            </span>{" "}
            tamamla.
          </h1>

          <p className="mt-6 text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl">
            DosyaHub, PDF birleştirme, bölme, dönüştürme ve düzenleme
            işlemlerini tek bir platformda toplar.{" "}
            <span className="text-indigo-200 font-medium">
              Güvenli, hızlı ve modern bir deneyim.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.05 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Link
                to="/merge-pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:shadow-purple-500/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                Hemen Başla
                <HiCloudUpload className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.a
              href="#features"
              whileHover={reduce ? undefined : { scale: 1.05 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={transition}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Özellikleri Keşfet
            </motion.a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2">
              <HiLockClosed className="h-4 w-4 text-purple-300" />
              Güvenli İşlem
            </span>
            <span className="inline-flex items-center gap-2">
              <HiSparkles className="h-4 w-4 text-indigo-300" />
              Hızlı &amp; Basit
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-zinc-400">
            <div className="h-[1px] w-8 bg-zinc-500/40" />
            <p>
              Her gün{" "}
              <span className="text-purple-200 font-semibold">
                binlerce dosya
              </span>{" "}
              güvenle dönüştürülüyor.
            </p>
          </div>
        </motion.div>

        {/* SAĞ PANEL */}
        <motion.aside
          className="relative flex flex-col justify-center items-center"
          initial={{
            opacity: reduce ? 1 : 0,
            y: reduce ? 0 : 40,
            scale: reduce ? 1 : 0.96,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: reduce ? 0 : 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(255,255,255,0.1)] overflow-hidden"
            initial={{ y: reduce ? 0 : 60 }}
            animate={{ y: 0 }}
            transition={{ ...transition, delay: reduce ? 0 : 0.5 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <HiDocumentText className="h-5 w-5 text-indigo-300" />
                <h3 className="text-white font-medium text-lg">
                  PDF Birleştirme
                </h3>
              </div>
              <div className="flex gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="mb-5 border-2 border-dashed border-white/15 rounded-xl p-4 text-center hover:border-indigo-400/50 transition cursor-pointer">
              <HiCloudUpload className="mx-auto h-6 w-6 text-indigo-300 mb-1" />
              <p className="text-sm text-zinc-400">
                Dosyalarını buraya sürükle veya yükle
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: "Dosya 1.pdf", progress: 100 },
                { name: "Dosya 2.pdf", progress: 60 },
              ].map((file, i) => (
                <div
                  key={i}
                  className="group rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <HiDocumentText className="h-5 w-5 text-indigo-300" />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {file.name}
                      </p>
                      <div className="h-1 mt-1 w-32 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
                          initial={
                            reduce
                              ? { width: `${file.progress}%` }
                              : { width: 0 }
                          }
                          animate={{ width: `${file.progress}%` }}
                          transition={{ duration: reduce ? 0 : 2 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    {file.progress === 100 ? (
                      <HiCheckCircle className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <>
                        <button className="p-2 rounded-lg hover:bg-white/10">
                          <HiTrash className="h-5 w-5 text-zinc-400 hover:text-red-400" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10">
                          <HiDownload className="h-5 w-5 text-zinc-400 hover:text-indigo-300" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.03,
                      transition: { duration: 0.12 },
                    }
              }
              whileTap={
                reduce
                  ? undefined
                  : {
                      scale: 0.97,
                      transition: { duration: 0.08 },
                    }
              }
              className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 py-2.5 text-white font-medium hover:bg-white/20 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <HiDownload className="h-5 w-5" /> Birleştirilmiş PDF’i İndir
            </motion.button>

            <div className="mt-6 flex items-center justify-between text-[11px] text-zinc-400 border-t border-white/10 pt-3">
              <span className="inline-flex items-center gap-1">
                <HiLockClosed className="h-3 w-3 text-emerald-300" />
                Şifreli İşlem
              </span>
              <span className="inline-flex items-center gap-1">
                <HiSparkles className="h-3 w-3 text-indigo-300" />
                0.8s Ortalama Süre
              </span>
            </div>
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
}
