import React, { useEffect, useState } from "react";
import "./App.css";
import { Color, Game, Limb } from "./types";
import NewGame from "./components/NewGame";
import Play from "./components/Play";

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showPlay, setShowPlay] = useState(false);

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
    }
  };

  return (
    <React.Fragment>
      {!showNew && !showPlay && (
        <header className="py-40 text-2xl">
          <h1 className="">Climbing Twister</h1>
        </header>
      )}
      <main>
        {showNew && (
          <NewGame onSubmit={onSubmit} onClose={() => setShowNew(false)} />
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
            {game && (
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowPlay(true);
                    console.log(game);
                  }}
                >
                  CONTINUE
                </button>
              </div>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => setShowNew(true)}
            >
              NEW GAME
            </button>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
