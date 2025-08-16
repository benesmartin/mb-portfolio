import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Instagram,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [errors, setErrors] = useState({});

  const EMAIL = "hi@martinben.es";

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const input = document.createElement("input");
        input.value = EMAIL;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const serverKeyMap = {
    "Invalid email": "contact.err.emailBad",
    "Unknown or invalid email domain": "contact.err.domainBad",
    "Domain has no MX records": "contact.err.mxMissing",
    "Message too long": "contact.err.msgLong",
    "Missing fields": "contact.err.missing",
    "Email failed": "contact.err.generic",
  };

  function validate(fields) {
    const e = {};
    if (!fields.name) e.name = t("contact.err.name");
    if (!fields.email) e.email = t("contact.err.emailReq");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = t("contact.err.emailBad");
    if (!fields.message) e.message = t("contact.err.msg");
    if (fields.message && fields.message.length > 5000)
      e.message = t("contact.err.msgLong");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  useEffect(() => {
    if (status === "success" || status === "error") {
      const id = setTimeout(() => {
        setStatus("idle");
        setServerMsg("");
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const payload = {
      name: String(data.name || "").trim(),
      email: String(data.email || "").trim(),
      message: String(data.message || "").trim(),
      hp: data.website || "",
    };

    if (!validate(payload)) return;

    try {
      setLoading(true);
      setStatus("loading");
      setServerMsg("");

      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        const key = serverKeyMap[json?.error] || "contact.err.generic";
        setStatus("error");
        setServerMsg(t(key));
        return;
      }

      form.reset();
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMsg(t("contact.err.generic"));
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "px-3 py-2 rounded-lg border-2 border-[#2e2e2e] bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00a8f1]";

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 mb-8 bg-[#1c1c1c73] p-6 rounded-xl text-white border-2 border-[#1c1c1c] backdrop-blur z-10 relative scroll-mt-[calc(env(safe-area-inset-top))]"
    >
      <h2 className="text-3xl font-bold mb-6 underline decoration-4 underline-offset-4 decoration-[#00a8f1]">
        {t("contact.title")}
      </h2>
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-[#1c1c1c] bg-white/5">
          <Mail size={18} className="text-[#00a8f1]" />
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-gray-200 hover:text-white transition-colors"
          >
            {EMAIL}
          </a>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={copyEmail}
            aria-live="polite"
            className="ml-1 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border-2 border-[#1c1c1c] bg-white/5 hover:bg-white/10 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#00a8f1]" />
                {t("contact.copied")}
              </>
            ) : (
              <>
                <Copy size={14} className="text-[#00a8f1]" />
                {t("contact.copy")}
              </>
            )}
          </motion.button>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-[#1c1c1c] bg-white/5">
          <MapPin size={18} className="text-[#00a8f1]" />
          <span className="text-sm text-gray-200">Teplice, CZ</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-[#1c1c1c] bg-white/5">
          <Clock size={18} className="text-[#00a8f1]" />
          <span className="text-sm text-gray-200">{t("contact.response")}</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <form
          onSubmit={onSubmit}
          className="md:col-span-2 rounded-xl border-2 border-[#1c1c1c] bg-white/5 p-4"
          noValidate
        >
          <h3 className="text-xl font-semibold mb-3">{t("contact.emailMe")}</h3>
          {status !== "idle" && (
            <div
              className={`mb-3 rounded-lg border-2 p-3 inline-flex items-start gap-2
                        ${
                          status === "success"
                            ? "border-[#1c1c1c] bg-emerald-500/10"
                            : status === "error"
                            ? "border-[#1c1c1c] bg-red-500/10"
                            : "border-[#1c1c1c] bg-white/5"
                        }`}
              role="status"
              aria-live="polite"
            >
              {status === "loading" && (
                <Loader2 size={18} className="animate-spin mt-0.5" />
              )}
              {status === "error" && (
                <AlertCircle size={18} className="text-red-400 mt-0.5" />
              )}
              {status === "success" && (
                <Check size={18} className="text-emerald-400 mt-0.5" />
              )}
              <span className="text-sm text-gray-200">
                {status === "loading" && t("contact.sending")}
                {status === "success" && t("contact.sent")}
                {status === "error" && (serverMsg || t("contact.err.generic"))}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-300">{t("contact.name")}</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                className={`${inputBase} ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder={t("contact.namePh")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                onInput={() => setErrors((p) => ({ ...p, name: undefined }))}
              />
              {errors.name && (
                <span id="err-name" className="text-xs text-red-400">
                  {errors.name}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-300">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className={`${inputBase} ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                onInput={() => setErrors((p) => ({ ...p, email: undefined }))}
              />
              {errors.email && (
                <span id="err-email" className="text-xs text-red-400">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <label className="mt-3 block">
            <span className="text-sm text-gray-300">
              {t("contact.message")}
            </span>
            <textarea
              name="message"
              rows={5}
              className={`${inputBase} mt-1 w-full ${
                errors.message ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder={t("contact.messagePh")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
              onInput={() => setErrors((p) => ({ ...p, message: undefined }))}
            />
            {errors.message && (
              <span id="err-message" className="text-xs text-red-400">
                {errors.message}
              </span>
            )}
          </label>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#1c1c1c] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} className="text-[#00a8f1]" />
            )}
            {t("contact.send")}
          </motion.button>
        </form>
        <div className="rounded-xl border-2 border-[#1c1c1c] bg-white/5 p-5">
          <h3 className="text-xl font-semibold mb-3">
            {t("contact.elsewhere")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              {
                href: "https://github.com/benesmartin",
                label: "GitHub",
                Icon: Github,
              },
              {
                href: "https://www.linkedin.com/in/martinbenes790/",
                label: "LinkedIn",
                Icon: Linkedin,
              },
              {
                href: "https://instagram.com/martinbenes05",
                label: "Instagram",
                Icon: Instagram,
              },
            ].map(({ href, label, Icon }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.03 * i }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-[#1c1c1c] bg-white/5 hover:bg-white/10 transition-colors"
                style={{ minHeight: 44 }}
              >
                <Icon size={18} className="text-[#00a8f1]" aria-hidden />
                <span className="text-sm">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
