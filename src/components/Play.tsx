import { useState } from "react";
import { Game, Limb, Color, limbSvgs } from "../util/types";
import { prettyPrint } from "../util/print";

import Button from "./Button";

interface PlayProps {
  game: Game;
  onClose: (game: Game) => void;
}

const Play = ({ game, onClose }: PlayProps) => {
  const [color, setColor] = useState<Color | null>(null);
  const [limb, setLimb] = useState<Limb | null>(null);
  const [score, setScore] = useState(-1);
  const [newHighscore, setNewHighscore] = useState(false);

  const roll = () => {
    setScore(score + 1);
    const color = game.colors[Math.floor(Math.random() * game.colors.length)];
    const limb = game.limbs[Math.floor(Math.random() * game.limbs.length)];
    setColor(color);
    setLimb(limb);
  };

  const fail = () => {
    if (score > game.highscore) {
      game.highscore = score;
      setNewHighscore(true);
    } else setNewHighscore(false);
    setScore(-1);
    setColor(null);
    setLimb(null);
  };
  return color && limb !== null ? (
    <div
      className="w-full h-screen flex flex-col items-center"
      style={{ backgroundColor: color.value }}
    >
      <a onClick={roll} className="w-full grow  flex flex-col">
        <p className="text-6xl font-bold pt-20 text-black">{score}</p>
        <div className="w-full grow flex flex-col gap-4 justify-center items-center">
          <img src={limbSvgs[limb]} alt="SVG" className="w-48" />

          <p className="text-3xl font-bold text-black">{prettyPrint[limb]}</p>
          <p>on</p>
          <p className="text-xl font-medium text-black">{color.name}</p>
        </div>
      </a>
      <div className="justify-self-end shrink py-8 w-full">
        <Button onClick={fail} label="stop" />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex flex-col py-10 gap-4">
      <p
        className={
          "mt-10 mx-auto font-bold text-xl w-fit px-1 " +
          (newHighscore ? "bg-yellow-300" : "")
        }
      >
        highscore: {game.highscore}
      </p>
      <div className="flex flex-col items-center justify-center  gap-4 basis-1 grow">
        <Button onClick={roll} label="start" />
        <Button onClick={() => onClose(game)} label="end game" />
      </div>
      <div className="w-full basis-1/5">
        <div className="py-2 mx-5 flex gap-1 justify-center flex-wrap">
          {game.colors.map((c) => (
            <div
              key={c.name}
              className="w-6 h-6 border-black border rounded-full"
              style={{ backgroundColor: c.value }}
            ></div>
          ))}
        </div>
        <div className="py-2 flex gap-2 justify-center">
          {game.limbs.map((l) => (
            <img src={limbSvgs[l]} className="w-10" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Play;
