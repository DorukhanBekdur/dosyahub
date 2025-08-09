export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-6xl px-4 h-14 text-xs text-zinc-500 flex items-center justify-between">
        <span>Hızlı, Güvenli ve Basit — DosyaHub</span>
        <span>
          © {new Date().getFullYear()} DosyaHub — by{" "}
          <a
            href="https://github.com/DorukhanBekdur"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            Dorukhan Bekdur
          </a>
        </span>
      </div>
    </footer>
  );
}
