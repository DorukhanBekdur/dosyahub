import { HiDownload } from "react-icons/hi";

export default function DownloadBar({
  canBuild,
  building,
  onBuild,
  downloadUrl,
  downloadName,
}) {
  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={onBuild}
        disabled={!canBuild || building}
        className="flex-1 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                   bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                   hover:shadow-md active:scale-[0.99] cursor-pointer"
      >
        {building ? "Oluşturuluyor…" : "Yeni PDF’i İndir"}
      </button>

      {downloadUrl && !building && (
        <a
          href={downloadUrl}
          download={downloadName}
          className="px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-600 text-white hover:bg-emerald-700 text-sm transition-colors inline-flex items-center gap-2"
        >
          <HiDownload className="text-lg" />
          İndir
        </a>
      )}
    </div>
  );
}
