import BackgroundOrbs from "../components/contact/BackgroundOrbs";
import LeftPanel from "../components/contact/LeftPanel";
import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <BackgroundOrbs />
      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="relative flex flex-col justify-between rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/70 p-6 md:p-8 shadow-sm">
          <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-purple-600 rounded-t-2xl" />
          <LeftPanel />
        </div>

        <div className="flex flex-col">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
