import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
} from "react-icons/hi";

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  const values = [
    {
      icon: <HiOutlineShieldCheck className="h-8 w-8 text-indigo-400" />,
      title: "Gizlilik Önceliğimizdir",
      desc: "Dosyalarınız işlem bittikten 15 dakika sonra sunucularımızdan tamamen silinir. Verileriniz asla saklanmaz veya paylaşılmaz.",
    },
    {
      icon: <HiOutlineLightningBolt className="h-8 w-8 text-purple-400" />,
      title: "Maksimum Hız",
      desc: "Karmaşık PDF işlemlerini saniyeler içinde tamamlamanız için optimize edilmiş bulut altyapısı kullanıyoruz.",
    },
    {
      icon: <HiOutlineGlobeAlt className="h-8 w-8 text-indigo-400" />,
      title: "Her Yerden Erişim",
      desc: "DosyaHub tamamen tarayıcı tabanlıdır. İster mobilde ister masaüstünde, hiçbir kurulum yapmadan kullanabilirsiniz.",
    },
    {
      icon: <HiOutlineHeart className="h-8 w-8 text-rose-400" />,
      title: "Tamamen Ücretsiz",
      desc: "Dijital araçlara erişimin demokratik olması gerektiğine inanıyoruz. Temel araçlarımızı herkes için ücretsiz sunuyoruz.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hakkımızda | DosyaHub - Hızlı ve Güvenli PDF Araçları</title>
        <meta
          name="description"
          content="DosyaHub'ın hikayesini, vizyonunu ve kullanıcı gizliliğine verdiği önemi keşfedin. %100 güvenli ve ücretsiz PDF araçları."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f0a1e] py-20 px-4 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Dosyalarınızı Yönetmenin <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                En Modern Yolu
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              DosyaHub, karmaşık dosya işlemlerini herkes için basit, hızlı ve
              tamamen güvenli hale getirmek amacıyla kuruldu.
            </p>
          </div>

          <div className="relative group rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-16 mb-20 overflow-hidden shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Hikayemiz</h2>
                <p className="text-zinc-400 leading-relaxed text-base">
                  Dijital dünyada belgelerle uğraşmak bazen bir yük haline
                  gelebilir. Program indirmekle uğraşmak veya dosya
                  güvenliğinden endişe etmek zorunda kalmamanız gerektiğine
                  inanıyoruz.
                </p>
                <p className="text-zinc-400 leading-relaxed text-base">
                  DosyaHub, bu sorunu çözmek için doğdu.{" "}
                  <span className="text-white font-medium underline underline-offset-4 decoration-indigo-500/50">
                    "Hızlı, Güvenli ve Basit"
                  </span>{" "}
                  mottosuyla yola çıkarak, en çok ihtiyaç duyulan PDF araçlarını
                  tek bir çatı altında topladık.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Dosya Sınırı", val: "50MB" },
                  { label: "Güvenli Bağlantı", val: "SSL" },
                  { label: "Gizlilik", val: "%100" },
                  { label: "Ücretsiz Araçlar", val: "0₺" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-3xl font-bold text-white block mb-1">
                      {stat.val}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center p-12 rounded-[2.5rem] bg-gradient-to-b from-indigo-500/10 to-transparent border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">
              Dosyalarınızı bizimle güvenle yönetmeye hazır mısınız?
            </h2>
            <Link
              to="/merge-pdf"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
            >
              İlk İşlemini Yap
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
