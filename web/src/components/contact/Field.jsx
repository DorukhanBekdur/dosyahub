export default function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm">
      <span className="mb-1 inline-block font-medium text-zinc-800 dark:text-zinc-100">
        {label}
      </span>
      <div>{children}</div>
    </label>
  );
}
