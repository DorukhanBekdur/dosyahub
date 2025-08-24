export default function FileInfo({ file, onReset }) {
  return (
    <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500 mb-1">Seçilen PDF</p>
          <p className="truncate font-medium">{file.name}</p>
          <p className="text-xs text-zinc-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs transition-colors cursor-pointer"
        >
          Değiştir
        </button>
      </div>
    </div>
  );
}
