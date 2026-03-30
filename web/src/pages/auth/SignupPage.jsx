import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiArrowRight,
  HiShieldCheck,
} from "react-icons/hi";
import Field from "../../components/contact/Field";
import { setSession } from "../../lib/authSession";

const CANONICAL = "https://www.dosyahub.com/signup";

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Ad soyad zorunludur.");
      return;
    }
    const trimmed = email.trim();
    if (!trimmed) {
      setError("E-posta zorunludur.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Geçerli bir e-posta girin.");
      return;
    }
    if (password.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      return;
    }
    if (password !== confirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (!acceptTerms) {
      setError("Devam etmek için kullanım şartlarını kabul etmelisiniz.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSession({
        email: trimmed,
        name: name.trim(),
        at: Date.now(),
      });
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Kayıt sırasında bir sorun oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-[calc(100dvh-1px)] bg-[#0f0a1e] py-16 md:py-24 px-4 overflow-hidden">
      <Helmet>
        <title>Kayıt Ol | DosyaHub</title>
        <meta
          name="description"
          content="DosyaHub'a kayıt olun; PDF araçları ve gelecek özellikler."
        />
        <link rel="canonical" href={CANONICAL} />
      </Helmet>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
        <div className="absolute top-20 -right-10 w-80 h-80 bg-violet-600/12 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 -left-10 w-72 h-72 bg-indigo-600/12 blur-[110px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          <div className="relative flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-12 shadow-2xl overflow-hidden order-2 lg:order-1">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                <HiShieldCheck className="h-4 w-4" />
                <span className="uppercase tracking-wider text-[10px]">
                  Ücretsiz başlayın
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Dakikalar içinde hazır olun
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                Kayıt olduktan sonra oturum bilginiz tarayıcıda saklanır;
                gerçek e-posta doğrulama ve sunucu kaydı entegrasyonu
                tamamlandığında hesabınız kalıcı hale gelir.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="flex gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  Tüm PDF araçları şimdilik üyeliksiz kullanılabilir.
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  Gizlilik politikamız veri işleme esaslarını açıklar.
                </li>
              </ul>
              <Link
                to="/privacy"
                className="inline-block text-sm text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Gizlilik politikası →
              </Link>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-2xl overflow-hidden group order-1 lg:order-2"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Hesap oluştur</h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Zaten üye misiniz?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                    state={location.state}
                  >
                    Giriş yap
                  </Link>
                </p>
              </div>

              <Field label="Ad Soyad" htmlFor="signup-name">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <HiOutlineUser className="h-5 w-5" />
                  </span>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 pl-12 pr-4 py-3.5 bg-white/[0.04] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
              </Field>

              <Field label="E-posta" htmlFor="signup-email">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <HiOutlineMail className="h-5 w-5" />
                  </span>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 pl-12 pr-4 py-3.5 bg-white/[0.04] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                    placeholder="ornek@mail.com"
                  />
                </div>
              </Field>

              <Field label="Şifre" htmlFor="signup-password">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <HiOutlineLockClosed className="h-5 w-5" />
                  </span>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 pl-12 pr-4 py-3.5 bg-white/[0.04] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                    placeholder="En az 8 karakter"
                  />
                </div>
              </Field>

              <Field label="Şifre tekrar" htmlFor="signup-confirm">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <HiOutlineLockClosed className="h-5 w-5" />
                  </span>
                  <input
                    id="signup-confirm"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 pl-12 pr-4 py-3.5 bg-white/[0.04] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
              </Field>

              <label className="flex gap-3 cursor-pointer text-sm text-zinc-400 leading-snug">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/30 shrink-0"
                />
                <span>
                  <Link
                    to="/terms"
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Kullanım şartlarını
                  </Link>{" "}
                  okudum ve kabul ediyorum.
                </span>
              </label>

              {error && (
                <div className="rounded-2xl bg-rose-500/10 border border-rose-500/25 px-4 py-3 text-rose-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              >
                {loading ? "Hesap oluşturuluyor…" : "Kayıt ol"}
                {!loading && <HiArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
