import {
  HiCheck,
  HiLockClosed,
  HiArrowTopRightOnSquare,
  HiMiniInformationCircle,
  HiPaintBrush,
} from "react-icons/hi2";

export default function InfoCard() {
  return (
    <aside className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      <h2 className="text-2xl font-semibold tracking-tight">
        Neden DosyaHub ?
      </h2>

      <ul className="mt-5 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/40">
            <HiCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </span>
          <div>
            <p className="font-medium">Hızlı ve Basit Kullanım</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Dosyalarınızı karmaşık adımlar olmadan saniyeler içinde işleyin.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-pink-100 dark:bg-pink-900/40">
            <HiPaintBrush className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          </span>
          <div>
            <p className="font-medium">Gelişmiş UI Tasarımı</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Modern, kullanıcı dostu ve sezgisel arayüz.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-sky-100 dark:bg-sky-900/40">
            <HiLockClosed className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </span>
          <div>
            <p className="font-medium">Gizlilik Öncelikli</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Dosyalar kısa süreli geçici depolanır.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-900/40">
            <HiArrowTopRightOnSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </span>
          <div>
            <p className="font-medium">Geliştirme Sürecinde Olanlar</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              PNG/JPG/WEBP, PDF merge/split, MP4→MP3
            </p>
          </div>
        </li>
      </ul>

      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <h3 className="font-medium flex items-center gap-2 underline">
          <HiMiniInformationCircle className="text-zinc-500 dark:text-zinc-400 w-5 h-5" />
          Hatırlatma
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Büyük dosyalarda yükleme süresi internet hızınıza bağlı değişebilir.
          Sorun yaşarsanız dosya boyutunu küçültmeyi deneyin.
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
        <span>Version: MVP-1</span>
        <span className="italic">Hızlı. Güvenli. Basit.</span>
      </div>
    </aside>
  );
}
