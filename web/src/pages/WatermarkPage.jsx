import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
  HiOutlineCloudUpload,
  HiDocumentText,
  HiOutlineDownload,
  HiOutlineX,
  HiOutlineShieldCheck,
} from "react-icons/hi";

export default function WatermarkPage() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("DosyaHub");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const FIXED_OPACITY = 0.45;
  const FIXED_ROTATION = 45;
  const FONT_SIZE = 60;

  useEffect(() => {
    if (file) {
      if (text.trim() === "") {
        showOriginalPdf();
      } else {
        generatePreview(false);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [file, text]);

  const showOriginalPdf = async () => {
    if (!file) return;
    const existingPdfBytes = await file.arrayBuffer();
    const blob = new Blob([existingPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
  };

  const generatePreview = async (isDownload = false) => {
    if (!file || !text) return;
    if (isDownload) setIsProcessing(true);

    try {
      const existingPdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      pdfDoc.registerFontkit(fontkit);
      const fontUrl = "/fonts/Roboto-Bold.ttf";
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
      const customFont = await pdfDoc.embedFont(fontBytes);

      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = customFont.widthOfTextAtSize(text, FONT_SIZE);
        const textHeight = customFont.heightAtSize(FONT_SIZE);

        const radians = (FIXED_ROTATION * Math.PI) / 180;
        const cos = Math.abs(Math.cos(radians));
        const sin = Math.abs(Math.sin(radians));

        const rotatedWidth = textWidth * cos + textHeight * sin;
        const rotatedHeight = textWidth * sin + textHeight * cos;

        page.drawText(text, {
          x: width / 2 - rotatedWidth / 2 + textHeight * sin,
          y: height / 2 - rotatedHeight / 2 + textHeight * cos,
          size: FONT_SIZE,
          font: customFont,
          color: rgb(0.85, 0.1, 0.1),
          opacity: FIXED_OPACITY,
          rotate: degrees(FIXED_ROTATION),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (isDownload) {
        const link = document.createElement("a");
        link.href = url;
        link.download = `watermarked-${file.name}`;
        link.click();
        setIsProcessing(false);
      } else {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(url);
      }
    } catch (error) {
      console.error("Hata:", error);
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          PDF Filigran Aracı | Belgelerinize Metin Filigranı Ekleyin - DosyaHub
        </title>
        <meta
          name="description"
          content="PDF dökümanlarınıza profesyonel ve güvenli bir şekilde metin filigranları ekleyerek belgelerinizin kopyalanmasını zorlaştırın ve telif haklarınızı koruyun."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f0a1e] py-20 px-4 relative overflow-hidden text-zinc-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
              PDF <span className="text-indigo-400">Filigranı</span>
            </h1>
            <p className="text-zinc-500 text-[16px]">
              PDF dökümanlarınıza profesyonel ve güvenli bir şekilde metin
              filigranları
            </p>
            <p className="text-zinc-500 text-[16px]">
              ekleyerek belgelerinizin kopyalanmasını zorlaştırın ve telif
              haklarınızı koruyun.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
                <div className="mb-8">
                  <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                    Filigran Metni
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-[#161127] border border-white/10 rounded-2xl p-4 text-white text-lg outline-none focus:border-indigo-400/50 transition-all shadow-inner"
                    placeholder="Metni buraya girin..."
                  />
                </div>

                {!file ? (
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 flex flex-col items-center group-hover:border-indigo-500/40 transition-all bg-white/[0.01]">
                      <HiOutlineCloudUpload className="w-16 h-16 text-indigo-400 mb-4 group-hover:rotate-12 transition-transform" />
                      <p className="text-white font-semibold">
                        PDF Dosyasını Buraya Sürükle
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between p-5 bg-[#161127] border border-white/10 rounded-2xl">
                      <div className="flex items-center gap-4 overflow-hidden text-left">
                        <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                          <HiDocumentText className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="truncate">
                          <p className="text-white text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-zinc-600 text-[10px]">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="p-2 hover:bg-white/10 rounded-full text-zinc-500 transition-colors cursor-pointer"
                      >
                        <HiOutlineX />
                      </button>
                    </div>

                    <button
                      onClick={() => generatePreview(true)}
                      disabled={isProcessing}
                      className="w-full bg-indigo-400 hover:bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer active:scale-[0.98]"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <HiOutlineDownload className="text-xl" />
                      )}
                      {isProcessing ? "Hazırlanıyor..." : "Şimdi İndir"}
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
                <HiOutlineShieldCheck className="text-indigo-400 text-2xl shrink-0" />
                <p className="text-zinc-500 text-[11px] leading-relaxed text-left">
                  <strong className="text-zinc-200 block mb-1 font-semibold uppercase tracking-widest text-[9px]">
                    Gizlilik ve Güvenlik
                  </strong>
                  Dosyalarınız tarayıcınızda yerel olarak işlenir. Hiçbir veri
                  sunucuya kaydedilmez.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px] shadow-2xl relative">
                <div className="px-6 py-4 border-b border-white/5 bg-[#161127] flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 text-zinc-400 text-[12px] font-bold uppercase tracking-[0.2em]">
                    Ön İzleme
                  </div>
                  <div className="flex gap-1.5 opacity-30">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex-1 bg-[#1a1a2e] flex items-center justify-center relative shadow-inner">
                  {previewUrl ? (
                    <iframe
                      src={`${previewUrl}#toolbar=0&navpanes=0&view=FitH`}
                      className="w-full h-full border-none"
                      title="PDF Ön İzleme"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-zinc-500 font-medium italic">
                        Dosya seçildiğinde ön izleme burada görünecektir !
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
