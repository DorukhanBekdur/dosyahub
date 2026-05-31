import logoPng from "../../assets/logo.png";

export default function Logo({
  size = "md",
  className = "",
  priority = false,
}) {
  const sizes = {
    sm: "h-5",
    md: "h-7",
    nav: "h-8 sm:h-9",
    lg: "h-10",
    xl: "h-12",
  };
  const h = sizes[size] ?? sizes.md;

  return (
    <img
      src={logoPng}
      alt="DosyaHub"
      className={`${h} w-auto ${className}`}
      width={160}
      height={40}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
