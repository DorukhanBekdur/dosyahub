# 📂 FileForge – PDF Merge Tool

FileForge, kullanıcıların kolayca birden fazla PDF dosyasını tek bir dosya halinde birleştirebilmesini sağlayan, **React + Vite + Tailwind** (frontend) ve **Node.js + Express** (backend) tabanlı bir web uygulamasıdır.

## 🚀 Özellikler

- 📄 Birden fazla PDF dosyasını tek tıkla birleştirme
- ⚡ Hızlı ve kullanıcı dostu arayüz (TailwindCSS ile responsive tasarım)
- 🔒 Dosyalar sunucuda geçici olarak tutulur, işlem tamamlandıktan sonra otomatik silinir
- 📱 Mobil uyumlu tasarım

## 🛠 Kullanılan Teknolojiler

**Frontend:**

- React (Vite)
- Tailwind CSS

**Backend:**

- Node.js
- Express
- pdf-lib (PDF dosyalarını birleştirme için)

## 📦 Kurulum ve Çalıştırma

### 1️⃣ Repoyu klonlayın

```bash
git clone https://github.com/dorukhanbekdur/fileforge.git
cd fileforge
```

```bash
cd server
pnpm install
pnpm dev   # API http://localhost:5001 üzerinde çalışır
```

```bash
cd ../web
pnpm install
pnpm dev   # Arayüz http://localhost:5173 üzerinde çalışır
```
