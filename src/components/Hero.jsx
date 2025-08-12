import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const Hero = () => {
  const { t, i18n } = useTranslation();
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hero z-10 relative text-white w-full text-center cal-sans-regular mt-2 md:p-10 p-2 min-h-[60vh] flex items-center flex-col justify-center"
    >
      <h1 className="md:text-8xl text-6xl">
        Martin <span className="text-[#00a8f1]">Beneš</span>
      </h1>
      <p className="roboto-regular md:text-xl text-md mt-1 text-gray-300">
        {t("hero-sub")}
      </p>
      <div className="mt-8 w-full flex justify-center gap-4">
        <button
          className="
          bg-[#00a8f1]
            py-2 px-6 md:text-lg text-sm
            rounded-full
            font-medium
            hover:scale-105
            transition-all duration-300
            cursor-pointer
          "
        >
          {t("view-projects")}
        </button>

        <button
          className="
            border-2 border-[#00a8f1]
            py-2 px-6 md:text-lg text-sm
            rounded-full
            font-medium
            hover:bg-[#00a8f1] hover:text-white
            transition-all duration-300
            cursor-pointer
          "
        >
          {t("download-cv")}
        </button>
      </div>
    </motion.section>
  );
};

export default Hero;
