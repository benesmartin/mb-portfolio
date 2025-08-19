import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved; // 'light' | 'dark'
    // fall back to OS preference:
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { theme, setTheme } = useTheme();

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
        className="sticky top-4 z-20 cal-sans-regular mt-4 bg-[var(--card)] p-2 rounded-xl text-[var(--text)] border-2 border-[var(--border)] frosted"
      >
        <nav className="flex items-center">
          <div className="flex items-center mr-auto">
            <img
              src="/logo.png"
              alt="Martin Beneš logo"
              width={48}
              className="rounded-md border-2 border-[var(--border)]"
            />
            <h1 className="ml-4 text-xl">Martin Beneš</h1>
          </div>
          <ul className="md:flex hidden justify-evenly w-auto gap-x-8 mr-5 text-[var(--muted-more)]">
            <li>
              <a
                href="#home"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
              >
                {t("home")}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
              >
                {t("about")}
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
              >
                {t("experience.title")}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
              >
                {t("projects.title")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
              >
                {t("contact.title")}
              </a>
            </li>
          </ul>
          <ul className="md:flex hidden justify-evenly items-center w-auto mr-2">
            <li>
              <button
                className="w-8 h-8 flex items-center justify-center text-[var(--muted-more)] hover:text-[var(--text)] transition-colors hover:cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={theme === "dark" ? t("lightMode") : t("darkMode")}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
            <li>
              <span className="text-[var(--muted)]">|</span>
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
            className="md:hidden w-8 h-8 flex items-center justify-center transition-transform duration-200 text-[var(--muted)]"
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
            bg-[var(--card)] p-2 rounded-xl text-[var(--text)]
            border-2 border-[var(--border)] frosted
          "
          style={{
            top: "calc(6.25rem + env(safe-area-inset-top))",
          }}
        >
          <ul className="flex flex-col justify-center items-center w-auto gap-y-4 text-[var(--muted-more)]">
            <li>
              <a
                href="#home"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200 w-100"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("home")}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("about")}
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("experience.title")}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("projects.title")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[var(--accent)] hover:cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {t("contact.title")}
              </a>
            </li>
          </ul>
          <ul className="flex justify-evenly items-center w-auto">
            <li>
              <button
                className="w-8 h-8 flex items-center justify-center text-[var(--muted-more)] hover:text-[var(--text)] transition-colors hover:cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={theme === "dark" ? t("lightMode") : t("darkMode")}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
            <li>
              <span className="text-[var(--muted)]">|</span>
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
