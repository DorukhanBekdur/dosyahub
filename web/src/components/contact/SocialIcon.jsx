export default function SocialIcon({ href, label, children, ...props }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-indigo-300/70 dark:hover:border-indigo-800/70 transition"
    >
      {children}
    </a>
  );
}
