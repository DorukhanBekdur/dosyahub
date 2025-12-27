import {
  HiOutlineDocumentText,
  HiOutlineScale,
  HiOutlineExclamationCircle,
  HiOutlineBan,
} from "react-icons/hi";

export default function TermsPage() {
  const rules = [
    {
      icon: <HiOutlineScale className="h-6 w-6 text-indigo-400" />,
      title: "Yasal Kullanım",
      text: "DosyaHub aracılığıyla işlenen tüm içeriklerin yasal sorumluluğu kullanıcıya aittir. Telif hakkı ihlali içeren dosyaların işlenmesi yasaktır.",
    },
    {
      icon: <HiOutlineBan className="h-6 w-6 text-purple-400" />,
      title: "Kısıtlamalar",
      text: "Sistemin işleyişini bozmaya yönelik otomatik yazılım (bot), scraping veya aşırı yük bindirme girişimleri kesinlikle yasaktır.",
    },
    {
      icon: <HiOutlineExclamationCircle className="h-6 w-6 text-indigo-400" />,
      title: "Sorumluluk Reddi",
      text: "DosyaHub, ücretsiz bir hizmettir ve dosya işleme sırasında oluşabilecek veri kayıplarından veya kesintilerden sorumlu tutulamaz.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-40 -right-20 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            <HiOutlineDocumentText className="h-4 w-4" />
            DosyaHub Sözleşmesi
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Kullanım Şartları
          </h1>
          <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            DosyaHub hizmetlerini kullanarak aşağıdaki şartları kabul etmiş
            sayılırsınız. Lütfen platformumuzu kullanmadan önce bu maddeleri
            dikkatlice okuyunuz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {rules.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
            >
              <div className="mb-4">{r.icon}</div>
              <h3 className="text-white font-bold mb-2 text-sm">{r.title}</h3>
              <p className="text-zinc-500 text-[12px] leading-relaxed">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        <div className="relative group rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden text-sm md:text-base text-zinc-400 space-y-8 leading-relaxed">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              1. Hizmet Tanımı
            </h2>
            <p>
              DosyaHub; PDF birleştirme, sıkıştırma ve benzeri dosya yönetim
              araçlarını tarayıcı tabanlı olarak sunan bir platformdur.
              Hizmetler, mevcut haliyle (as-is) sunulur ve gelecekteki
              değişiklik hakları saklıdır.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              2. Kabul Edilebilir Kullanım
            </h2>
            <p>
              Kullanıcılar, sistemi kötüye kullanmayacaklarını taahhüt ederler.
              Bir dosya için belirlenen 50MB sınırının aşılması veya sunuculara
              aşırı yük bindirecek toplu işlemler yapılması hizmete erişimin
              engellenmesine neden olabilir.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              3. Fikri Mülkiyet
            </h2>
            <p>
              DosyaHub arayüzü, logoları ve yazılım altyapısı DosyaHub'a aittir.
              Kullanıcıların yüklediği dosyalar üzerinde DosyaHub herhangi bir
              hak iddia etmez; mülkiyet tamamen kullanıcıya aittir.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              4. Değişiklikler
            </h2>
            <p>
              Bu şartlar zaman zaman güncellenebilir. Platformu kullanmaya devam
              etmeniz, güncel şartları kabul ettiğiniz anlamına gelir.
            </p>
          </section>

          <section className="pt-6 border-t border-white/5 text-xs text-zinc-500 flex justify-between items-center">
            <span>Son güncelleme: 27 Aralık 2025</span>
            <span className="text-indigo-400 font-medium">Sürüm: 1.0.2</span>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm italic">
            Bu şartlar hakkında daha fazla bilgi almak için{" "}
            <a
              href="mailto:destek@dosyahub.com"
              className="text-purple-400 hover:underline"
            >
              destek ekibimizle
            </a>{" "}
            iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
