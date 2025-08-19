import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Github, Globe, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "necromancers-mystery",
    titleKey: "projects.items.nm.title",
    descKey: "projects.items.nm.desc",
    img: "/projects/nm-preview.png",
    year: 2023,
    tags: ["HTML/CSS/JS", "Pixel-art", "Vanilla JS"],
    links: {
      demo: "https://nm.martinben.es",
      code: "https://github.com/benesmartin/tbd",
    },
    featured: true,
  },
  {
    id: "wmb-pay",
    titleKey: "projects.items.wmb-pay.title",
    descKey: "projects.items.wmb-pay.desc",
    img: "/projects/wmb-pay-preview.png",
    year: 2025,
    tags: ["React", "Tailwind", "UX", "QR"],
    links: {
      demo: "https://pay.wmb.cz",
      code: "https://github.com/benesmartin/tbd",
    },
  },
  {
    id: "pokemon-sandstone",
    titleKey: "projects.items.pokemon.title",
    descKey: "projects.items.pokemon.desc",
    img: "/projects/pkmn-preview.png",
    year: 2024,
    tags: ["Unity", "C#", "2.5D", "RPG"],
    links: {
      code: "https://github.com/benesmartin/pokemon-sandstone",
    },
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.06, staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.4 },
  },
  exit: { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.25 } },
};

const Projects = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 mb-8 bg-[var(--card)] p-6 rounded-xl text-[var(--text)] border-2 border-[var(--border)] backdrop-blur z-10 relative scroll-mt-[calc(env(safe-area-inset-top))]"
    >
      <h2 className="text-3xl font-bold mb-6 underline decoration-4 underline-offset-4 decoration-[var(--accent)]">
        {t("projects.title")}
      </h2>

      <motion.div
        role="list"
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((p) => (
            <motion.article
              role="listitem"
              key={p.id}
              variants={item}
              exit="exit"
              layout
              className="rounded-xl border-2 border-[var(--border)] bg-[var(--bg)] overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={p.img}
                  alt={t(p.titleKey)}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                {p.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)]/90 px-2 py-0.5 text-xs font-medium text-white">
                    {t("projects.featured")}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold">{t(p.titleKey)}</h3>
                <h4 className="text-sm text-[var(--muted-more)]">{p.year}</h4>
                <p className="text-sm text-[var(--muted)]">{t(p.descKey)}</p>

                <div className="mt-1 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[var(--muted)] px-2 py-1 rounded-md border-2 border-[var(--border)] bg-[var(--bg)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex gap-2">
                  {p.links.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-hover)]/80 transition-colors"
                      aria-label={t("projects.viewDemo")}
                    >
                      <Globe size={16} className="text-[var(--accent)]" />
                      <span className="text-sm">{t("projects.view-demo")}</span>
                    </a>
                  )}
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-hover)]/80 transition-colors"
                      aria-label={t("projects.viewCode")}
                    >
                      <Github size={16} className="text-[var(--accent)]" />
                      <span className="text-sm">{t("projects.view-code")}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 text-center text-[var(--text)]">
        <a
          href="https://github.com/benesmartin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-hover)]/80 transition-colors"
        >
          <ExternalLink size={16} className="text-[var(--accent)]" />
          {t("projects.more-on-github")}
        </a>
      </div>
    </motion.section>
  );
};

export default Projects;
