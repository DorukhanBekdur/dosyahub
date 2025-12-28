import LeftPanel from "../../components/contact/LeftPanel";
import ContactForm from "../../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen bg-[#0f0a1e] py-20 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-2xl overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <LeftPanel />
            </div>
          </div>

          <div className="flex flex-col">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
