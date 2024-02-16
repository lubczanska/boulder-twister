import { useState } from "react";
import { Game, Limb, Color, limbSvgs } from "../util/types";
import { prettyPrint } from "../util/types";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { getLuma } from "../util/helper";

interface PlayProps {
  game: Game;
  onClose: (game: Game) => void;
}

const Play = ({ game, onClose }: PlayProps) => {
  const [color, setColor] = useState<Color | null>(null);
  const [limb, setLimb] = useState<Limb | null>(null);
  const [score, setScore] = useState(-1);
  const [newHighscore, setNewHighscore] = useState(false);
  const [dark, setDark] = useState(false);

  const { t } = useTranslation();

  const roll = () => {
    setScore(score + 1);
    const color = game.colors[Math.floor(Math.random() * game.colors.length)];

    if (getLuma(color.value) < 40) setDark(true);
    else setDark(false);

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

  const Icon = (limb: Limb, size: number) => {
    const Icon = limbSvgs[limb];
    return <Icon fill={dark ? "#ffffff" : "#000000"} size={"" + size} />;
  };

  return color && limb !== null ? (
    <div
      className="w-full h-dvh flex flex-col items-center"
      style={{ backgroundColor: color.value }}
    >
      <a
        onClick={roll}
        className={
          "w-full grow  flex flex-col " + (dark ? "text-white" : "text-black")
        }
      >
        <p className="text-6xl font-bold pt-10">{score}</p>
        <div className="w-full grow flex flex-col gap-4 justify-center items-center ">
          {Icon(limb, 250)}
          <p className="text-3xl font-bold">{t(prettyPrint[limb])}</p>
          <p>{t("on")}</p>
          <p className={"text-xl font-medium "}>{t(color.name)}</p>
        </div>
      </a>
      <div className="justify-self-end shrink py-8 w-full">
        <Button onClick={fail} label={t("stop")} />
      </div>
    </div>
  ) : (
    <div className="w-full h-dvh flex flex-col py-10 gap-4">
      <p
        className={
          "mt-10 mx-auto font-bold text-xl w-fit px-1 " +
          (newHighscore ? "bg-yellow-300" : "")
        }
      >
        highscore: {game.highscore}
      </p>
      <div className="flex flex-col items-center justify-center  gap-4 basis-1 grow ">
        <Button onClick={roll} label={t("start")} />
        <Button onClick={() => onClose(game)} label={t("end_game")} />
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
          {game.limbs.map((l) => Icon(l, 40))}
        </div>
      </div>
    </div>
  );
};

export default Play;
