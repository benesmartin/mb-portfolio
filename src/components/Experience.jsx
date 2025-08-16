import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Briefcase,
  ServerCog,
  MonitorSpeaker,
  Code,
  FileText,
  Brain,
  Wrench,
  MessageSquareText,
  Puzzle,
  Users,
  HeartHandshake,
  Focus,
  Shuffle,
  Atom,
  Server,
  Database,
  Code2,
} from "lucide-react";

export default function Experience() {
  const { t } = useTranslation();
  const [active, setActive] = useState("work");
  const buckets = [
    {
      icon: Atom,
      group: t("experience.buckets.frontend.group"),
      basics: [
        "HTML5",
        "CSS3 (Flexbox, Grid)",
        t("experience.buckets.frontend.basics.responsive"),
        "JavaScript",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Motion (motion/react)",
        "React Router",
        "i18next (react-i18next)",
        t("experience.buckets.frontend.basics.http"),
      ],
      plus: ["Bootstrap"],
    },
    {
      icon: Code2,
      group: t("experience.buckets.programming-languages.group"),
      basics: ["Python", "PHP", "Java", "C#"],
      plus: [],
    },
    {
      icon: Database,
      group: t("experience.buckets.databases.group"),
      basics: ["SQL (DDL/DML)", "PostgreSQL"],
      plus: ["MySQL/MariaDB", "Redis", "Supabase"],
    },
    {
      icon: Server,
      group: t("experience.buckets.backend.group"),
      basics: ["Node.js", "Express/Fastify", "Git/Github", "Docker"],
      plus: [
        "Nginx",
        "Linux & shell",
        "Self-hosting",
        "Cloudflare Tunnel",
        "Tailscale",
      ],
    },
  ];

  const hardBuckets = buckets.map((b) => ({
    ...b,
    items: [...(b.basics ?? []), ...(b.plus ?? [])],
  }));
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 mb-8 bg-[#1c1c1c73] p-6 rounded-xl text-white border-2 border-[#1c1c1c] backdrop-blur z-10 relative scroll-mt-[calc(env(safe-area-inset-top))]"
    >
      <h2 className="text-3xl font-bold mb-6 underline decoration-4 underline-offset-4 decoration-[#00a8f1]">
        {t("experience.title")}
      </h2>

      <div
        role="group"
        aria-label={t("experience-tabs-label", {
          defaultValue: "Experience sections",
        })}
        className="
          flex flex-wrap justify-center gap-2 p-1
          rounded-xl border-2 border-[#1c1c1c] bg-white/5
        "
      >
        {[
          { key: "work", label: t("experience.tabs.work"), Icon: Briefcase },
          { key: "soft", label: t("experience.tabs.soft"), Icon: Brain },
          { key: "hard", label: t("experience.tabs.hard"), Icon: Wrench },
        ].map(({ key, label, Icon }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(key)}
              className={`min-h-[44px] px-4 py-2 rounded-lg outline-none transition-all cursor-pointer
          ${
            selected
              ? "text-white bg-white/10 border-2 border-[#1c1c1c]"
              : "text-gray-300 hover:text-white border-2 border-transparent"
          }`}
            >
              <span className="inline-flex items-center gap-2">
                <Icon size={18} />
                <span>{label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div
          id="panel-work"
          role="tabpanel"
          aria-labelledby="tab-work"
          hidden={active !== "work"}
        >
          <ol className="relative border-l-2 border-white/15 ml-3 space-y-8">
            {[
              {
                company: "UJEP, CIT",
                link: "https://cit.ujep.cz",
                icon: ServerCog,
                active: true,
                period: t("experience.work.1.period"),
                title: t("experience.work.1.title"),
                desc: t("experience.work.1.desc"),
              },
              {
                company: "FK Teplice",
                link: "https://www.fkteplice.cz",
                icon: MonitorSpeaker,
                active: true,
                period: t("experience.work.2.period"),
                title: t("experience.work.2.title"),
                desc: t("experience.work.2.desc"),
              },
              {
                company: "Intellmaps",
                link: "https://intellmaps.com",
                icon: Code,
                active: false,
                period: t("experience.work.3.period"),
                title: t("experience.work.3.title"),
                desc: t("experience.work.3.desc"),
              },
              {
                company: "JenAkcie",
                link: "https://www.jenakcie.cz",
                icon: FileText,
                active: false,
                period: t("experience.work.4.period"),
                title: t("experience.work.4.title"),
                desc: t("experience.work.4.desc"),
              },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: idx * 0.05,
                }}
                className="ml-4"
              >
                <span className="absolute -left-[9px] mt-1.5 h-4 w-4">
                  {item.active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-green-500/50 motion-safe:animate-ping"
                    />
                  )}
                  <span
                    className={`relative block h-4 w-4 rounded-full border-2 border-[#1c1c1c] ${
                      item.active ? "bg-green-500" : "bg-red-500/50"
                    }`}
                  />
                </span>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  {(() => {
                    const Icon = item.icon ?? Briefcase;
                    return (
                      <Icon size={16} className="shrink-0 text-[#00a8f1]" />
                    );
                  })()}
                  <span>{item.period}</span>
                </div>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>

                <h4 className="text-sm font-semibold text-gray-200">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00a8f1] transition-colors duration-200"
                  >
                    {item.company}
                  </a>
                </h4>
                <p className="mt-1 text-gray-300">{item.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div
          id="panel-soft"
          role="tabpanel"
          aria-labelledby="tab-soft"
          hidden={active !== "soft"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            {[
              {
                icon: MessageSquareText,
                title: t("experience.soft.communication.label"),
                proof: t("experience.soft.communication.proof"),
              },
              {
                icon: Puzzle,
                title: t("experience.soft.problem-solving.label"),
                proof: t("experience.soft.problem-solving.proof"),
              },
              {
                icon: Users,
                title: t("experience.soft.teamwork.label"),
                proof: t("experience.soft.teamwork.proof"),
              },
              {
                icon: HeartHandshake,
                title: t("experience.soft.empathy.label"),
                proof: t("experience.soft.empathy.proof"),
              },
              {
                icon: Focus,
                title: t("experience.soft.focus.label"),
                proof: t("experience.soft.focus.proof"),
              },
              {
                icon: Shuffle,
                title: t("experience.soft.adaptability.label"),
                proof: t("experience.soft.adaptability.proof"),
              },
            ].map(({ icon: Icon, title, proof }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: i * 0.04,
                }}
                className="rounded-xl border-2 border-[#1c1c1c] bg-white/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <Icon
                    size={20}
                    absoluteStrokeWidth={true}
                    className="mt-0.5 text-[#00a8f1] shrink-0"
                    aria-hidden
                  />
                  <div>
                    <div className="text-gray-100 font-medium">{title}</div>
                    <p className="text-sm text-gray-300 mt-1">{proof}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="panel-hard" role="tabpanel" hidden={active !== "hard"}>
          <div className="space-y-5">
            {hardBuckets.map((bucket, bi) => (
              <motion.div
                key={bucket.group}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: bi * 0.05,
                }}
                className="rounded-xl border-2 border-[#1c1c1c] bg-white/5 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <bucket.icon
                    size={18}
                    className="text-[#00a8f1]"
                    aria-hidden
                  />
                  <div className="text-gray-200 font-semibold">
                    {bucket.group}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {bucket.items.map((label) => (
                    <span
                      key={label}
                      className="text-sm text-gray-200 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[#1c1c1c] bg-white/5 whitespace-nowrap"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
