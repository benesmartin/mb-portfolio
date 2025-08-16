import { Menu, Moon, X } from "lucide-react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const nextLang = lang === "en" ? "cs" : "en";
  const flagCode = nextLang === "en" ? "GB" : "CZ";
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-4 z-20 cal-sans-regular mt-4 bg-[#1c1c1c73] p-2 rounded-xl text-white border-2 border-[#1c1c1c] frosted"
      >
        <nav className="flex items-center">
          <div className="flex items-center mr-auto">
            <img
              src="/logo.png"
              alt="Martin Beneš logo"
              width={48}
              className="rounded-md border-2 border-[#1c1c1c]"
            />
            <h1 className="ml-4 text-xl">Martin Beneš</h1>
          </div>
          <ul className="md:flex hidden justify-evenly w-auto gap-x-8 mr-5 text-gray-100 ">
            <li>
              <a
                href="#home"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("home")}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("about")}
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("experience")}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("projects")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("contact")}
              </a>
            </li>
          </ul>
          <ul className="md:flex hidden justify-evenly items-center w-auto mr-2">
            <li>
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:cursor-pointer transition-all duration-200">
                <Moon size={24} />
              </button>
            </li>
            <li>
              <span className="text-gray-300">|</span>
            </li>
            <li>
              <button
                className="w-8 h-8 flex items-center justify-center rounded hover:scale-110 transition-all duration-200 hover:cursor-pointer"
                onClick={() => {
                  i18n.changeLanguage(nextLang);
                  localStorage.setItem("lang", nextLang);
                }}
                title={
                  nextLang === "en"
                    ? "Switch to English"
                    : "Přepnout do češtiny"
                }
              >
                <ReactCountryFlag
                  countryCode={flagCode}
                  svg
                  style={{ width: 32, height: 16 }}
                />
              </button>
            </li>
          </ul>
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center transition-transform duration-200 text-gray-400"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? (
              <X className="inline-block" size={28} />
            ) : (
              <Menu className="inline-block" size={28} />
            )}
          </button>
        </nav>
      </motion.header>
      {isMobileNavOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="
            fixed inset-x-4 md:hidden
            z-[100]
            cal-sans-regular
            bg-[#1c1c1c73] p-2 rounded-xl text-white
            border-2 border-[#1c1c1c] frosted
          "
          style={{
            top: "calc(6.25rem + env(safe-area-inset-top))",
          }}
        >
          <ul className="flex flex-col justify-center items-center w-auto gap-y-4 text-gray-100">
            <li>
              <a
                href="#home"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200 w-100"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("home")}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("about")}
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("experience")}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("projects")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("contact")}
              </a>
            </li>
          </ul>
          <ul className="flex justify-evenly items-center w-auto">
            <li>
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:cursor-pointer transition-all duration-200">
                <Moon size={24} />
              </button>
            </li>
            <li>
              <span className="text-gray-300">|</span>
            </li>
            <li>
              <button
                className="w-8 h-8 flex items-center justify-center rounded hover:scale-110 transition-all duration-200 hover:cursor-pointer"
                onClick={() => {
                  i18n.changeLanguage(nextLang);
                  localStorage.setItem("lang", nextLang);
                }}
                title={
                  nextLang === "en"
                    ? "Switch to English"
                    : "Přepnout do češtiny"
                }
              >
                <ReactCountryFlag
                  countryCode={flagCode}
                  svg
                  style={{ width: 32, height: 16 }}
                />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
