import { useCallback, useRef, useState } from "react";
import { HiOutlineCloudUpload, HiDownload } from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { PDFDocument } from "pdf-lib";

const A4 = { w: 595.28, h: 841.89 };
const mmToPt = (mm) => (mm * 72) / 25.4;
const MAX_FILES = 3;

export default function ImagesToPdfCard() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loadingThumbs, setLoadingThumbs] = useState(false);
  const [building, setBuilding] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const isImage = (f) =>
    f && (f.type?.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(f.name));
  const isHeic = (f) =>
    /heic|heif$/i.test(f.name) || /heic|heif/i.test(f.type || "");

  const resetAll = () => {
    files.forEach((x) => x.srcUrl && URL.revokeObjectURL(x.srcUrl));
    setFiles([]);
    setError("");
    setDownloadUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const onFiles = async (filesLike) => {
    const list = Array.from(filesLike || []);
    if (!list.length) return;

    setError("");
    setDownloadUrl("");

    if (files.length >= MAX_FILES) {
      if (inputRef.current) inputRef.current.value = "";
      setError(`En fazla ${MAX_FILES} görsel ekleyebilirsiniz.`);
      return;
    }

    const remaining = MAX_FILES - files.length;

    const existingKeys = new Set(files.map((f) => `${f.name}__${f.size}`));
    const filtered = [];
    for (const f of list) {
      if (!isImage(f)) {
        setError("Yalnızca PNG/JPG/WEBP yükleyin.");
        continue;
      }
      if (isHeic(f)) {
        setError("HEIC/HEIF desteği yok. Lütfen JPG/PNG/WEBP yükleyin.");
        continue;
      }
      if (f.size > 25 * 1024 * 1024) {
        setError("Her görsel için maksimum 25MB.");
        continue;
      }
      const key = `${f.name}__${f.size}`;
      if (existingKeys.has(key)) continue;
      filtered.push(f);
    }

    if (!filtered.length) {
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const willTake = filtered.slice(0, remaining);
    const skippedCount = filtered.length - willTake.length;
    if (skippedCount > 0) {
      setError(`Toplam limit ${MAX_FILES}. ${skippedCount} görsel eklenmedi.`);
    }

    await makeThumbs(willTake);

    if (inputRef.current) inputRef.current.value = "";
  };

  const makeThumbs = async (fileList) => {
    setLoadingThumbs(true);
    try {
      const out = [];
      for (const f of fileList) {
        const srcUrl = URL.createObjectURL(f);
        const img = await loadImage(srcUrl);
        const { thumb, naturalW, naturalH } = makeThumb(img, 280);
        out.push({
          id: crypto.randomUUID(),
          name: f.name,
          size: f.size,
          srcUrl,
          w: naturalW,
          h: naturalH,
          thumb,
        });
      }
      setFiles((prev) => [...prev, ...out]);
    } catch (e) {
      console.error(e);
      setError("Önizlemeler oluşturulamadı.");
    } finally {
      setLoadingThumbs(false);
    }
  };

  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = url;
    });

  const makeThumb = (img, targetW) => {
    const scale = Math.min(1, targetW / img.naturalWidth);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    c.width = w;
    c.height = h;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const thumb = c.toDataURL("image/jpeg", 0.7);
    return { thumb, naturalW: img.naturalWidth, naturalH: img.naturalHeight };
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onFiles(e.dataTransfer.files);
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("ring-2", "ring-indigo-500");
  }, []);
  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);

  const eventHasFiles = (e) =>
    e?.dataTransfer && Array.from(e.dataTransfer.types || []).includes("Files");

  const onGridDrop = (e) => {
    if (!eventHasFiles(e)) return;
    e.preventDefault();
    e.stopPropagation();
    onFiles(e.dataTransfer.files);
  };
  const onGridDragOver = (e) => {
    if (!eventHasFiles(e)) return;
    e.preventDefault();
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const handleDragStart = (pos) => {
    dragItem.current = pos;
  };
  const handleDragEnter = (pos) => {
    dragOverItem.current = pos;
  };
  const handleDragEnd = () => {
    const from = dragItem.current,
      to = dragOverItem.current;
    if (from == null || to == null || from === to) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }
    setFiles((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // PDF oluşturma kısmı (otomatik A4 yönü ayarı + 10mm margin verdim + sığdır özelliği kullandım)
  // PDF oluşturma: hafif kenar boşluklu tam sayfa
  const buildPdf = async () => {
    if (files.length === 0) return setError("Lütfen en az bir görsel ekleyin.");
    setError("");
    setBuilding(true);
    setDownloadUrl("");

    // Hafif boşluk: 5mm
    const marginPt = mmToPt(5);
    const jpegQuality = 0.9;

    try {
      const doc = await PDFDocument.create();

      for (const it of files) {
        const isLandscape = it.w >= it.h;
        const pageW = isLandscape ? A4.h : A4.w;
        const pageH = isLandscape ? A4.w : A4.h;

        const page = doc.addPage([pageW, pageH]);

        // Kullanılabilir alan (boşluklu)
        const availW = Math.max(1, pageW - marginPt * 2);
        const availH = Math.max(1, pageH - marginPt * 2);

        // px → pt dönüşümü (96dpi varsayımı)
        const imgPtW = it.w * 0.75;
        const imgPtH = it.h * 0.75;

        // Artık 1 ile sınır yok → gerekirse büyüt
        const scale = Math.min(availW / imgPtW, availH / imgPtH);
        const drawW = imgPtW * scale;
        const drawH = imgPtH * scale;

        const x = (pageW - drawW) / 2;
        const y = (pageH - drawH) / 2;

        // Raster boyutlarını çizim boyutuna göre ayarla
        const targetPxW = Math.max(1, Math.round(drawW / 0.75));
        const targetPxH = Math.max(1, Math.round(drawH / 0.75));

        const jpgBytes = await rasterToJpegBytes(
          it.srcUrl,
          targetPxW,
          targetPxH,
          jpegQuality
        );
        const jpg = await doc.embedJpg(jpgBytes);

        page.drawImage(jpg, { x, y, width: drawW, height: drawH });
      }

      const pdfBytes = await doc.save();
      const url = URL.createObjectURL(
        new Blob([pdfBytes], { type: "application/pdf" })
      );
      setDownloadUrl(url);
    } catch (e) {
      console.error(e);
      setError(
        "PDF oluşturulamadı. Görseller çok büyük olabilir (bellek sınırı)."
      );
    } finally {
      setBuilding(false);
    }
  };

  const rasterToJpegBytes = (srcUrl, w, h, quality = 0.85) =>
    new Promise(async (resolve, reject) => {
      try {
        const img = await loadImage(srcUrl);
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        c.width = w;
        c.height = h;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        c.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Canvas blob null"));
            blob.arrayBuffer().then((ab) => resolve(new Uint8Array(ab)));
          },
          "image/jpeg",
          quality
        );
      } catch (err) {
        reject(err);
      }
    });

  return (
    <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
      <h1 className="text-3xl font-semibold tracking-tight">Görsel → PDF</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        Görselleri yükleyin, <strong>sürükle-bırak</strong> ile sıralayın ve tek
        tıkla PDF’e dönüştürün.
      </p>

      {/* İlk yükleme alanı */}
      {files.length === 0 && (
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
            Görselleri bu alana sürükleyip bırakın
            <br />
            <span className="text-zinc-500">veya</span>
          </p>

          <input
            ref={inputRef}
            id="images-input"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(e) => e.target.files && onFiles(e.target.files)}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-controls="images-input"
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white
                       bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer"
          >
            Görsel Yükle
          </button>

          <p className="mt-3 text-xs text-zinc-500">
            PNG/JPG/JPEG/WEBP • Görsel başına maks 25MB
          </p>
          <style>{`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
        </div>
      )}

      {/* Dosyalar yüklendikten sonraki kısım*/}
      {files.length > 0 && (
        <>
          <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 mb-1">
                  Seçilen görseller ({files.length}/{MAX_FILES})
                </p>
                <p className="font-medium">{files.length} adet</p>
                <p className="text-xs text-zinc-500">
                  Sürükle-bırak ile sıralayabilir veya grid’e yeni görseller
                  bırakabilirsiniz.
                </p>
              </div>
              <button
                onClick={resetAll}
                className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs transition-colors cursor-pointer"
              >
                Değiştir
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-3">
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <HiArrowsUpDown className="w-5 h-5" />
            <span>
              Görselleri sürükleyip sıralayın; grid alanına bırakarak yeni
              görseller ekleyin (maks {MAX_FILES}).
            </span>
          </div>

          <div
            onDrop={onGridDrop}
            onDragOver={onGridDragOver}
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
                       rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-zinc-900/50"
          >
            {loadingThumbs && files.length === 0 && (
              <p className="col-span-full text-sm text-zinc-500">
                Önizlemeler hazırlanıyor…
              </p>
            )}

            {files.map((it, idx) => (
              <div
                key={it.id}
                className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden
                           cursor-grab active:cursor-grabbing hover:shadow-md transition"
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                title={`${idx + 1}. Görsel`}
              >
                <img
                  src={it.thumb}
                  alt={`${idx + 1}. Görsel`}
                  className="w-full h-auto block select-none pointer-events-none"
                />
                <div className="absolute top-2 left-2 text-[11px] px-2 py-0.5 rounded-md bg-black/60 text-white">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={buildPdf}
              disabled={building || files.length === 0}
              className="flex-1 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                         hover:shadow-md active:scale-[0.99] cursor-pointer"
            >
              {building ? "Oluşturuluyor…" : "Yeni PDF’i İndir"}
            </button>

            {downloadUrl && !building && (
              <a
                href={downloadUrl}
                download="images-to-pdf.pdf"
                className="px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-600 text-white hover:bg-emerald-700 text-sm transition-colors inline-flex items-center gap-2"
              >
                <HiDownload className="text-lg" />
                İndir
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}
