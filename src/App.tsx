import React, { useEffect, useState } from "react";
import "./App.css";
import { Color, Game, Language, Limb } from "./util/types";
import { prettyLanguage } from "./util/print";
import NewGame from "./components/NewGame";
import Play from "./components/Play";
import Button from "./components/Button";

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.en);

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

  const onSubmit = async (colors: Color[], limbs: Limb[]) => {
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
      {!showNew && !showPlay && (
        <header className="py-40 text-4xl font-bold">
          <h1 className="">boulder twister</h1>
        </header>
      )}
      <main className="h-screen">
        {showNew && (
          <NewGame
            onSubmit={onSubmit}
            onClose={() => {
              setShowNew(false);
            }}
          />
        )}
        {showPlay && game && (
          <Play
            game={game}
            onClose={(game) => {
              setShowPlay(false);
              saveGame(game);
            }}
          />
        )}
        {!showPlay && !showNew && (
          <div className="w-full  flex flex-col gap-4 items-center justify-center">
            <div className="w-full basis-1 grow">
              {game && (
                <div className="w-full">
                  <Button
                    onClick={() => {
                      setShowPlay(true);
                      console.log(game);
                    }}
                    label="continue"
                  />
                </div>
              )}
              <Button onClick={() => setShowNew(true)} label="new game" />
            </div>
            <button
              className="mt-20 border border-black text-black bg-white font-bold  m-1 py-2 px-5  rounded-full hover:bg-black hover:text-white"
              onClick={() =>
                language === Language.en
                  ? setLanguage(Language.pl)
                  : setLanguage(Language.en)
              }
            >
              {prettyLanguage[language]}
            </button>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
