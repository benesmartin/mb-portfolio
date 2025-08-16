import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 mb-8 bg-[#1c1c1c73] p-6 rounded-xl text-white border-2 border-[#1c1c1c] backdrop-blur z-10 relative scroll-mt-[calc(env(safe-area-inset-top))]"
    >
      <h2 className="text-3xl font-bold mb-6 underline decoration-4 underline-offset-4 decoration-[#00a8f1]">
        {t("about")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[256px_minmax(0,1fr)] gap-6 md:gap-10 items-start">
        <img
          src="/martin.png"
          alt="Martin Beneš"
          width={256}
          height={256}
          className="rounded-md border-2 border-[#1c1c1c] mx-auto md:mx-0"
          loading="lazy"
        />

        <div>
          <p className="text-lg text-gray-300 leading-relaxed">
            {t("about-paragraph")}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 border-[#1c1c1c] bg-white/5">
            <Sparkles size={18} className="shrink-0 text-[#00a8f1]" />
            <span className="text-sm text-gray-200">
              <span className="font-medium text-white">Fun fact:</span>{" "}
              {t("fun-fact")}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
