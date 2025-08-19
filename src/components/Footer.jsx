import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import LastCommitDate from "./LastCommitDate";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-16 mb-6 bg-[var(--card)] border-2 border-[var(--border)] rounded-xl text-[var(--muted)] backdrop-blur p-3"
    >
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
        <div className="mr-auto text-sm">
          © 2021-{year} <span className="text-[var(--text)]">Martin Beneš</span>
          <br />
          <LastCommitDate />
        </div>

        <a
          href="#home"
          className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border-2 border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-hover)]/80 transition-colors"
        >
          <ArrowUp size={16} className="text-[var(--accent)]" aria-hidden />
          <span className="text-[var(--text)]">{t("footer.backToTop")}</span>
        </a>
      </div>
    </motion.footer>
  );
}
