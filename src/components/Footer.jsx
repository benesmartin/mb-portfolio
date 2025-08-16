import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-16 mb-6 bg-[#1c1c1c73] border-2 border-[#1c1c1c] rounded-xl text-gray-300 backdrop-blur p-3"
    >
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
        <div className="mr-auto text-sm">
          © 2021-{year} <span className="text-white">Martin Beneš</span>
        </div>

        <a
          href="#home"
          className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border-2 border-[#1c1c1c] bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowUp size={16} className="text-[#00a8f1]" aria-hidden />
          <span>{t("footer.backToTop")}</span>
        </a>
      </div>
    </motion.footer>
  );
}
