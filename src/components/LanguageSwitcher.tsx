import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "pl" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="mt-20 border border-black text-black bg-white font-bold  m-1 py-2 px-5  rounded-full hover:bg-black hover:text-white"
      onClick={handleLanguageChange}
    >
      {i18n.language === "en" ? "english" : "polski"}
    </button>
  );
};

export default LanguageSwitcher;
