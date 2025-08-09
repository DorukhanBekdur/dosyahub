import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function FeatureCard({
  icon: Icon = HiOutlineDocumentText,
  title,
  desc,
  to = "#",
  soon = false,
  badgeColor = "from-indigo-500 to-purple-600",
}) {
  return (
    <Link
      to={to}
      className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-5 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition"
    >
      {soon && (
        <span className="absolute right-3 top-3 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          yakında
        </span>
      )}
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${badgeColor} text-white`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 font-medium">{title}</h3>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">{desc}</p>
    </Link>
  );
}
