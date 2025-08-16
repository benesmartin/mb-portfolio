import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Github, GithubIcon, Instagram, Linkedin } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hero z-10 relative text-white w-full text-center cal-sans-regular mt-2 md:p-10 p-2 min-h-[60vh] flex items-center flex-col justify-center scroll-mt-[calc(env(safe-area-inset-top))]"
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
      <div className="mt-6 flex items-center gap-4 text-gray-300">
        <a
          href="https://github.com/benesmartin"
          className="hover:text-[#00a8f1] transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/martinbenes790/"
          className="hover:text-[#00a8f1] transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://instagram.com/martinbenes05"
          className="hover:text-[#00a8f1] transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={24} />
        </a>
      </div>
    </motion.section>
  );
};

export default Hero;
