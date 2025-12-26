import { useReducedMotion, motion } from "framer-motion";
import {
  HiLockClosed,
  HiSparkles,
  HiCloudUpload,
  HiLightningBolt,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0f0a1e] min-h-[90vh] flex items-center pt-20 pb-12">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* TİPOGRAFİ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
              Dosya işlemlerini <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                saniyeler içinde
              </span>{" "}
              tamamla.
            </h1>

            <p className="mt-6 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
              DosyaHub, PDF araçlarını tek bir platformda toplar. Güvenli, hızlı
              ve tamamen modern bir deneyim ile dosyalarını kolayca yönet.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/merge-pdf"
                className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
              >
                Hemen Başla <HiCloudUpload className="w-5 h-5" />
              </Link>

              <Link
                to="/features"
                className="border border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-xl text-lg font-bold transition"
              >
                Özellikler
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-2 border-r border-white/10 pr-8">
                <HiLockClosed className="text-emerald-400 w-5 h-5" /> Güvenli
                İşlem
              </div>
              <div className="flex items-center gap-2">
                <HiSparkles className="text-indigo-400 w-5 h-5" /> Hızlı & Basit
              </div>
            </div>
          </motion.div>

          {/* ANİMASYON */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center scale-90 lg:scale-100">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ y: [0, -12, 0], rotate: 0 }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 left-10 z-40 bg-[#1a142e]/80 p-2.5 rounded-xl border border-white/10 shadow-xl backdrop-blur-sm"
              >
                <HiLockClosed className="text-emerald-400 w-5 h-5" />
              </motion.div>

              <motion.div
                initial={{ rotate: 0 }}
                animate={{ y: [0, 12, 0], rotate: 0 }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-10 right-10 z-40 bg-[#1a142e]/80 p-2.5 rounded-xl border border-white/10 shadow-xl backdrop-blur-sm"
              >
                <HiSparkles className="text-indigo-400 w-5 h-5" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 border border-dashed border-indigo-500/20 rounded-full z-0"
              />

              {/* MERKEZ CORE */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-20 h-20 bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] rounded-[2rem] shadow-2xl flex items-center justify-center z-30 border border-white/10"
              >
                <HiLightningBolt className="text-white w-10 h-10" />
              </motion.div>

              <div className="absolute left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-indigo-500/10" />
              <div className="absolute right-0 w-32 h-[1px] bg-gradient-to-l from-transparent via-purple-500/20 to-purple-500/10" />

              {/* GİRİŞ YAPAN DOSYALAR */}
              {[0, 1].map((i) => (
                <motion.div
                  key={`in-${i}`}
                  initial={{ x: -160, opacity: 0 }}
                  animate={{ x: -20, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2.8,
                    delay: i * 1.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-0 w-11 h-14 bg-white/10 border border-white/20 rounded-lg flex flex-col gap-1.5 p-2 items-start z-10"
                >
                  <div className="w-full h-0.5 bg-white/30 rounded" />
                  <div className="w-2/3 h-0.5 bg-white/20 rounded" />
                </motion.div>
              ))}

              {/* ÇIKIŞ YAPAN DOSYALAR */}
              {[0, 1].map((i) => (
                <motion.div
                  key={`out-${i}`}
                  initial={{ x: 20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 160, opacity: [0, 1, 0], scale: 1 }}
                  transition={{
                    duration: 2.8,
                    delay: i * 1.4 + 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute right-0 w-11 h-14 bg-[#7c3aed] rounded-lg shadow-lg flex items-center justify-center border border-white/20 z-10"
                >
                  <HiSparkles className="text-white w-5 h-5" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
