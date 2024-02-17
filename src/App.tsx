import React, { useEffect, useState } from "react";
import "./App.css";
import { Color, Game, Limb } from "./util/types";
import NewGame from "./components/NewGame";
import Play from "./components/Play";
import Button from "./components/Button";
import { useTranslation } from "react-i18next";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationPL from "./locales/pl/translation.json";
import LanguageSwitcher from "./components/LanguageSwitcher";

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedGame = localStorage.getItem("game");
    if (savedGame) {
      setGame(JSON.parse(savedGame));
    }
  }, []);

  const saveGame = async (newGame: Game) => {
    await setGame(newGame);
    localStorage.setItem("game", JSON.stringify(newGame));
  };

  const onNewGameSubmit = async (colors: Color[], limbs: Limb[]) => {
    await setGame({ colors: colors, limbs: limbs, highscore: 0 });
    setShowNew(false);
    if (game) {
      localStorage.setItem("game", JSON.stringify(game));
      console.log(game);
      setShowPlay(true);
    }
  };

  return (
    <React.Fragment>
      <div className={!showNew && !showPlay ? "w-dvh" : ""}>
        {!showNew && !showPlay && (
          <header className="pt-20 pb-20 font-bold">
            <h1 className="text-6xl">boulder</h1>
            <h2 className="text-4xl">twister</h2>
          </header>
        )}
        <main>
          {showNew && (
            <NewGame
              onSubmit={onNewGameSubmit}
              onClose={() => {
                setShowNew(false);
              }}
            />
          )}
          {showPlay && game && (
            <Play
              game={game}
              saveGame={(game) => {
                saveGame(game);
              }}
              onClose={() => setShowPlay(false)}
            />
          )}
          {!showPlay && !showNew && (
            <div className="w-full  flex flex-col gap-4 items-center justify-center mx-auto lg:w-1/2">
              <div className="w-full basis-1 grow">
                {game && (
                  <div className="w-full">
                    <Button
                      onClick={() => {
                        setShowPlay(true);
                      }}
                      label={t("continue")}
                    />
                  </div>
                )}
                <Button
                  onClick={() => setShowNew(true)}
                  label={t("new_game")}
                />
              </div>
              <LanguageSwitcher />
            </div>
          )}
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
