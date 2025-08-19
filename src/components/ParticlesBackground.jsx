import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const getIsDark = () => {
  if (typeof window === "undefined") return true;
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (root.classList.contains("dark")) return true;
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [isDark, setIsDark] = useState(getIsDark());

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useEffect(() => {
    const apply = () => setIsDark(getIsDark());

    window.addEventListener("themechange", apply);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", apply);

    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("themechange", apply);
      mq.removeEventListener?.("change", apply);
      obs.disconnect();
    };
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        color: {
          value: isDark ? ["#ffffff", "#00a8f1"] : ["#334155", "#00a8f1"],
        },
        move: {
          direction: "none",
          enable: true,
          outModes: "out",
          random: false,
          speed: 2,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 80 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
        opacity: { value: isDark ? 0.4 : 0.35 },
      },
    }),
    [isDark]
  );

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        key={isDark ? "dark" : "light"}
      />
    </div>
  );
};

export default ParticlesBackground;
