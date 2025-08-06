import { Menu, Moon, X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    if (!localStorage.getItem("langSet")) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country_code === "CZ") {
            setLanguage("cs");
            localStorage.setItem("langSet", "true");
          }
        });
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language, i18n]);

  const nextLang = language === "en" ? "cs" : "en";
  const flagCode = nextLang === "en" ? "GB" : "CZ";
  return (
    <>
      <header className="z-10 relative cal-sans-regular mt-4 bg-[#1c1c1c73] p-2 rounded-xl text-white border-2 border-[#1c1c1c]">
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
          <ul className="md:flex hidden justify-evenly w-auto gap-x-8 mr-5 text-gray-100">
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
                href="#skills"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("skills")}
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
                onClick={() => setLanguage(nextLang)}
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
      </header>
      {isMobileNavOpen && (
        <div
          className="
            z-10 relative cal-sans-regular mt-4 bg-[#1c1c1c73] p-2 rounded-xl text-white border-2 border-[#1c1c1c]
            transition-all duration-300 ease-out
            animate-fadein
          "
          style={{
            animation: "fadeInScale 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <ul className="flex flex-col justify-center items-center w-auto gap-y-4 text-gray-100">
            <li>
              <a
                href="#home"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200 w-100"
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
                href="#skills"
                className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
              >
                {t("skills")}
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
                onClick={() => setLanguage(nextLang)}
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
