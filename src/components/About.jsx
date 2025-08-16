import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 mb-8 p-6 rounded-xl text-white border-2 border-[#1c1c1c] bg-[#1c1c1c73] backdrop-blur"
    >
      <h2 className="text-3xl font-bold mb-6 underline decoration-4 underline-offset-4 decoration-[#00a8f1]">
        {t("about")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[256px_minmax(0,1fr)] gap-6 md:gap-10 items-start">
        <motion.img
          src="/martin.png"
          alt="Martin Beneš"
          width={256}
          height={256}
          className="rounded-md border-2 border-[#1c1c1c] mx-auto md:mx-0"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        />

        <div>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            {t("about-paragraph")}
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              scale: reduce ? 1 : 0.95,
              y: reduce ? 0 : 6,
            }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 border-[#1c1c1c] bg-white/5"
          >
            <Sparkles size={18} className="text-[#00a8f1]" />
            <span className="text-sm text-gray-200">
              <span className="font-medium text-white">Fun fact:</span>{" "}
              {t("fun-fact")}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
