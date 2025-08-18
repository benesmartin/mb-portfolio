import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LastCommitDate = () => {
  const [date, setDate] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("https://api.github.com/repos/benesmartin/mb-portfolio/commits")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const lastCommitDate = data[0].commit.author.date;
          setDate(new Date(lastCommitDate).toLocaleDateString());
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <a
      href="https://github.com/benesmartin/mb-portfolio/commits"
      target="_blank"
      rel="noopener noreferrer"
      className="*:hover:text-[#00a8f1] *:duration-200"
    >
      <div className="text-gray-400 text-xs mt-2 flex items-center">
        <Github size={16} className="inline mr-1" /> {t("last_commit_date")}:{" "}
        {date || t("loading")}
      </div>
    </a>
  );
};

export default LastCommitDate;
