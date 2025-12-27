import {
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineEyeOff,
  HiOutlineTrash,
} from "react-icons/hi";

export default function PrivacyPage() {
  const policies = [
    {
      icon: <HiOutlineLockClosed className="h-6 w-6 text-indigo-400" />,
      title: "Uçtan Uca Güvenlik",
      text: "Dosyalarınız sunucularımıza SSL (Secure Sockets Layer) şifrelemesi ile aktarılır. Bu, verilerinizin transfer sırasında üçüncü şahıslar tarafından okunmasını imkansız hale getirir.",
    },
    {
      icon: <HiOutlineTrash className="h-6 w-6 text-purple-400" />,
      title: "Otomatik Silme",
      text: "Yüklediğiniz dosyalar işlem tamamlandıktan sonra geçici olarak saklanır ve en geç 15 dakika içinde sistemimizden kalıcı olarak silinir. Dosyalarınızı manuel olarak silme seçeneği de sunulur.",
    },
    {
      icon: <HiOutlineEyeOff className="h-6 w-6 text-indigo-400" />,
      title: "Veri Gizliliği",
      text: "Dosyalarınızın içeriği hiçbir şekilde analiz edilmez, kopyalanmaz veya üçüncü taraflarla paylaşılmaz. Biz sadece bir araç sağlayıcıyız, verilerinizin sahibi sizsiniz.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <HiOutlineShieldCheck className="h-4 w-4" />
            Güvenlik Standartlarımız
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Gizlilik Politikası
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            DosyaHub olarak verilerinizin gizliliğine ve güvenliğine en yüksek
            önemi veriyoruz. Aşağıda, verilerinizin nasıl işlendiğine dair
            şeffaf bilgiler yer almaktadır.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {policies.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="mb-4">{p.icon}</div>
              <h3 className="text-white font-bold mb-2">{p.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="relative group rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden text-sm md:text-base text-zinc-400 space-y-8 leading-relaxed">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              1. Toplanan Veriler
            </h2>
            <p>
              DosyaHub, kayıt olmanıza gerek kalmadan hizmet veren bir
              platformdur. Dosya birleştirme, sıkıştırma veya dönüştürme
              işlemleri sırasında yüklediğiniz dosyalar sadece işlemin
              gerçekleştirilmesi amacıyla geçici olarak sunucularımızda
              barındırılır.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              2. Çerezler (Cookies)
            </h2>
            <p>
              Deneyiminizi iyileştirmek ve site trafiğini analiz etmek için
              temel çerezler kullanıyoruz. Bu çerezler kişisel kimlik
              bilgilerini içermez ve tarayıcı ayarlarınızdan dilediğiniz zaman
              devre dışı bırakılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">
              3. Üçüncü Taraf Bağlantıları
            </h2>
            <p>
              Sitemiz içerisinde GitHub veya sosyal medya hesaplarımıza
              yönlendiren bağlantılar bulunabilir. Bu sitelerin gizlilik
              politikalarından DosyaHub sorumlu değildir.
            </p>
          </section>

          <section className="pt-6 border-t border-white/5 text-xs text-zinc-500">
            <p>
              Son güncelleme: 27 Aralık 2025. DosyaHub, bu politikayı önceden
              haber vermeksizin güncelleme hakkını saklı tutar.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">
            Gizlilik hakkında sorularınız mı var?
            <a
              href="/iletisim"
              className="text-indigo-400 hover:text-indigo-300 ml-1 transition-colors underline underline-offset-4"
            >
              Bizimle iletişime geçin.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
