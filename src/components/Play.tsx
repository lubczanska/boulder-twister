import { useState } from "react";
import { Game, Limb, Color, prettyPrint } from "../types";

interface PlayProps {
  game: Game;
  onClose: (game: Game) => void;
}

const Play = ({ game, onClose }: PlayProps) => {
  const [color, setColor] = useState<Color | null>(null);
  const [limb, setLimb] = useState<Limb | null>(null);
const [score, setScore] = useState(0)

  const roll = () => {
    setScore(score + 1);
    const color = game.colors[Math.floor(Math.random() * game.colors.length)];
    const limb = game.limbs[Math.floor(Math.random() * game.limbs.length)];
    setColor(color);
    setLimb(limb);
  };

  const fail = () => {
    if (score > game.highscore)
        game.highscore = score
    setScore(0)
    setColor(null);
    setLimb(null);
  }
  return color && limb !== null ? (
    <div
      className="w-full h-screen flex flex-col gap-4 justify-center items-center"
      style={{ backgroundColor: color.value }}
    >
      <p className="text-2xl text-black">
        {prettyPrint[limb]} on {color.name}
      </p>
      <button className="btn btn-xl" onClick={roll}>
        ROLL
      </button>
      <button className="btn btn-xl" onClick={fail}>
        STOP
      </button>
    </div>
  ) : (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <p>HIGHSCORE: {game.highscore}</p>
      <button className="btn" onClick={roll}>
        START
      </button>
      <button className="btn" onClick={() => onClose(game)}>
        END GAME
      </button>
    </div>
  );
};

export default Play;
