export default function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );
}
