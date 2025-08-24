import {
  HiSparkles,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import ContactCard from "./ContactCard";
import SocialIcon from "./SocialIcon";

export default function LeftPanel() {
  return (
    <aside className="flex flex-col h-full justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-900/50 bg-indigo-50/70 dark:bg-indigo-950/40 px-3 py-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-200">
          <HiSparkles className="h-4 w-4" />
          <span>Genellikle aynı gün yanıt</span>
        </div>

        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Bizimle İletişime Geçin
        </h1>
        <p className="mt-2 text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
          Sorularınız, iş birliği istekleriniz veya teknik konularla ilgili
          mesajlarınızı bekliyoruz. Formu gönderin, size dönüş yapalım.
        </p>

        <div className="mt-8 space-y-4">
          <ContactCard
            icon={<HiOutlineMail className="h-6 w-6" />}
            label="E-posta"
            value={
              <a
                href="mailto:destek@dosyahub.com?subject=DosyaHub%20Iletişim"
                className="text-indigo-600 dark:text-indigo-300 hover:underline"
              >
                destek@dosyahub.com
              </a>
            }
          />

          <ContactCard
            icon={<HiOutlineLocationMarker className="h-6 w-6" />}
            label="Adres"
            value={
              <a
                href="https://www.google.com/maps/place/İstanbul,+Türkiye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-300 hover:underline"
              >
                İstanbul, Türkiye
              </a>
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          Bize sosyal medyadan ulaşın
        </p>
        <div className="flex items-center gap-3">
          <SocialIcon href="https://instagram.com/dosyahub" label="Instagram">
            <FaInstagram className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon
            href="https://linkedin.com/company/dosyahub"
            label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
          </SocialIcon>
        </div>
      </div>
    </aside>
  );
}
