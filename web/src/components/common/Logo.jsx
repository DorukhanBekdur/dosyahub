import logoPng from "../../assets/logo.png";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-5",
    md: "h-7",
    lg: "h-10",
    xl: "h-12",
  };
  const h = sizes[size] ?? sizes.md;

  return (
    <img
      src={logoPng}
      alt="DosyaHub logo"
      className={`${h} w-auto ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
