export default function ThumbnailsGrid({
  pages,
  loading,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) {
  return (
    <div
      className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
                 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-zinc-900/50"
    >
      {loading && pages.length === 0 && (
        <p className="col-span-full text-sm text-zinc-500">
          Önizlemeler hazırlanıyor…
        </p>
      )}

      {pages.map((p, idx) => (
        <div
          key={p.id ?? idx}
          className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden 
                     cursor-grab active:cursor-grabbing hover:shadow-md transition"
          draggable
          onDragStart={(e) => onDragStart(idx, e)}
          onDragEnter={() => onDragEnter(idx)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          title={`Sayfa ${idx + 1}`}
        >
          <img
            src={p.thumbDataUrl}
            alt={`Sayfa ${idx + 1}`}
            className="w-full h-auto block select-none pointer-events-none"
          />
          <div className="absolute top-2 left-2 text-[11px] px-2 py-0.5 rounded-md bg-black/60 text-white">
            {idx + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
