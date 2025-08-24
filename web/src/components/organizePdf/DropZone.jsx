import { HiOutlineCloudUpload } from "react-icons/hi";

export default function DropZone({
  dropRef,
  onDrop,
  onDragOver,
  onDragLeave,
  inputRef,
  onPick,
}) {
  return (
    <div
      ref={dropRef}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className="relative mt-6 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-10 flex flex-col items-center justify-center text-center transition-all overflow-hidden
                 bg-gradient-to-b from-zinc-50/80 to-zinc-100/60 dark:from-zinc-800/40 dark:to-zinc-800/20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full blur-3xl bg-indigo-500/30"></div>
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full blur-3xl bg-purple-500/20"></div>
      </div>

      <HiOutlineCloudUpload className="h-12 w-12 text-indigo-500 opacity-80 animate-[float_3s_ease-in-out_infinite]" />
      <p className="mt-4 text-sm">
        PDF’i bu alana sürükleyip bırakın
        <br />
        <span className="text-zinc-500">veya</span>
      </p>

      <input
        ref={inputRef}
        id="organize-input"
        type="file"
        accept="application/pdf,.pdf"
        onChange={onPick}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-controls="organize-input"
        className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white
                   bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer"
      >
        PDF Yükle
      </button>

      <p className="mt-3 text-xs text-zinc-500">Yalnızca PDF • Maks 50MB</p>
      <style>{`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
    </div>
  );
}
