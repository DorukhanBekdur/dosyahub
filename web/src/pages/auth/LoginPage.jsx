import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiArrowRight,
  HiShieldCheck,
} from "react-icons/hi";
import Field from "../../components/contact/Field";

const CANONICAL = "https://www.dosyahub.com/login";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !password) {
      setError("E-posta ve şifre zorunludur.");
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

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      if (remember) {
        sessionStorage.setItem(
          "dosyahub_session",
          JSON.stringify({ email: trimmed, at: Date.now() })
        );
      } else {
        sessionStorage.removeItem("dosyahub_session");
      }
      navigate(from, { replace: true });
    } catch {
      setError("Giriş sırasında bir sorun oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-[calc(100dvh-1px)] bg-[#0f0a1e] py-16 md:py-24 px-4 overflow-hidden">
      <Helmet>
        <title>Giriş Yap | DosyaHub</title>
        <meta
          name="description"
          content="DosyaHub hesabınıza giriş yapın; PDF araçlarına erişin."
        />
        <link rel="canonical" href={CANONICAL} />
      </Helmet>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
        <div className="absolute top-24 -left-16 w-80 h-80 bg-indigo-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-24 -right-16 w-80 h-80 bg-purple-600/15 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          <div className="relative flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/20">
                <HiShieldCheck className="h-4 w-4" />
                <span className="uppercase tracking-wider text-[10px]">
                  Güvenli oturum
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Tekrar hoş geldiniz
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                Hesabınızla tercihlerinizi senkronize edin ve yakında eklenecek
                üyelik avantajlarından haberdar olun. PDF işlemleri şimdilik
                üyeliksiz de kullanılabilir.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="flex gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  Şifreleriniz tarayıcı dışına gönderilmez (önizleme oturumu).
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  API bağlandığında aynı form gerçek kimlik doğrulamaya
                  yönlenecektir.
                </li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-2xl overflow-hidden group"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Giriş yap</h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Hesabın yok mu?{" "}
                  <Link
                    to="/signup"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                    state={location.state}
                  >
                    Kayıt ol
                  </Link>
                </p>
              </div>

              <Field label="E-posta" htmlFor="login-email">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <HiOutlineMail className="h-5 w-5" />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 pl-12 pr-4 py-3.5 bg-white/[0.04] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                    placeholder="ornek@mail.com"
                  />
                </div>
              </Field>

              <Field label="Şifre" htmlFor="login-password">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <HiOutlineLockClosed className="h-5 w-5" />
                  </span>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 pl-12 pr-4 py-3.5 bg-white/[0.04] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 cursor-pointer text-zinc-400">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/30"
                  />
                  Beni hatırla
                </label>
                <Link
                  to="/contact"
                  className="text-zinc-500 hover:text-indigo-300 transition-colors"
                >
                  Yardım / erişim sorunu
                </Link>
              </div>

              {error && (
                <div className="rounded-2xl bg-rose-500/10 border border-rose-500/25 px-4 py-3 text-rose-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              >
                {loading ? "Giriş yapılıyor…" : "Giriş yap"}
                {!loading && <HiArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
