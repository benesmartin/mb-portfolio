import { Moon } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

const Header = () => {
  return (
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
        <ul className="flex justify-evenly w-auto gap-x-8 mr-5 text-gray-100">
          <li>
            <a
              href="#home"
              className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-[#00a8f1] hover:cursor-pointer transition-all duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
        <ul className="flex justify-evenly items-center w-auto mr-5">
          <li>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:cursor-pointer transition-all duration-200">
              <Moon size={24} />
            </button>
          </li>
          <li>
            <span className="text-gray-300">|</span>
          </li>
          <li>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:scale-110 transition-all duration-200 hover:cursor-pointer">
              <ReactCountryFlag
                countryCode="GB"
                svg
                style={{ width: 32, height: 16 }}
              />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
