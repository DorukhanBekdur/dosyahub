import { HiOutlineDocumentText } from "react-icons/hi";

export default function Logo() {
  return (
    <a
      href="/"
      className="flex items-center gap-2"
      aria-label="DosyaHub ana sayfa"
    >
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
        <HiOutlineDocumentText className="h-4 w-4" />
      </div>

      <span className="font-semibold tracking-tight text-lg">
        Dosya
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          Hub
        </span>
      </span>
    </a>
  );
}
