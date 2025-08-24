export default function ContactCard({ icon, label, value, href }) {
  const Inner = (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 shadow-sm hover:shadow transition">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
        {icon}
      </div>
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {Inner}
    </a>
  ) : (
    <div>{Inner}</div>
  );
}
