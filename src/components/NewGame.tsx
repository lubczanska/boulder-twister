import { useRef, useState } from "react";
import { baseColors, Color, Limb, limbs, limbSvgs } from "../util/types";
import { prettyPrint } from "../util/print";

import Button from "./Button";
import { useTranslation } from "react-i18next";

interface NewGameProps {
  onSubmit: (colors: Color[], limbs: Limb[]) => void;
  onClose: () => void;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  value: HTMLInputElement;
}
export interface AddColorFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const NewGame = ({ onSubmit }: NewGameProps) => {
  const [error, setError] = useState<string | null>(null);
  const [colors, setColors] =
    useState<{ name: string; value: string }[]>(baseColors);
  const [selected, setSelected] = useState<boolean[]>(
    new Array(baseColors.length).fill(false)
  );
  const [selectedLimb, setSelectedLimb] = useState([true, true, true, true]);
  const [next, setNext] = useState(false);

  const { t } = useTranslation();
  const addColorRef = useRef<HTMLDialogElement | null>(null);

  const handleCheck = (index: number, select: string) => {
    if (select == "color") {
      const data = [...selected];
      data[index] = !data[index];
      setSelected(data);
    } else if (select == "limb") {
      const data = [...selectedLimb];
      data[index] = !data[index];
      setSelectedLimb(data);
    }
  };

  const addColor = (e: React.FormEvent<AddColorFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const value = e.currentTarget.elements.value.value;
    setColors([...colors, { name: name, value: value }]);
    setSelected([...selected, true]);
    if (addColorRef.current) addColorRef.current.close();
  };

  return (
    <div className="w-full px-5 mx-auto">
      {/* modal */}
      <dialog
        id="show_expense_modal"
        className="bg-white border border-black p-10 pb-5"
        ref={addColorRef}
      >
        <div className="">
          <form
            id="dialog"
            method="dialog"
            onSubmit={addColor}
            className="flex flex-col gap-1 items-center"
          >
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => {
                if (addColorRef.current) addColorRef.current.close();
              }}
            >
              ✕
            </button>
            <div className="flex justify-between gap-2 items-center py-2">
              <input id="name" className="border-none" placeholder={t("name")} />
              <input
                id="value"
                type="color"
                className="rounded-full w-8 h-8 border border-black"
              />
            </div>
            <button type="submit"> {t("add")} </button>
          </form>
        </div>
      </dialog>
      {/* modal end */}
      <form
        id="gameForm"
        onSubmit={(e) => {
          e.preventDefault();

          const newColors = colors.filter((_color, index) => selected[index]);
          const newLimbs = limbs.filter((_l, index) => selectedLimb[index]);
          if (newLimbs.length) {
            onSubmit(newColors, newLimbs);
          } else {
            setError(t("no_libs_error"));
          }
        }}
      >
        {error && (
          <div className="pt-4">
            <p className="mx-auto bg-red-400 font-bold w-fit px-1">{error}</p>
          </div>
        )}
        {next ? (
          <div className="flex flex-col w-full h-full p-5 items-center gap-10">
            <label className="mx-auto w-2/3 pt-5 pb-2 text-xl font-semibold">
              {t("limb_picker_title")}
            </label>
            <div className="flex flex-wrap items-center justify-center gap-3 basis-1 grow">
              {limbs.map((limb, index) => (
                <a
                  key={index}
                  className={
                    "basis-1/3 grow border border-black  py-5 font-bold h-1/2 flex flex-col items-center justify-center gap-10 " +
                    (selectedLimb[index]
                      ? " bg-black text-white"
                      : " bg-white text-black hover:bg-black hover:text-white")
                  }
                  onClick={() => handleCheck(index, "limb")}
                >
                  <p>{t(prettyPrint[limb])}</p>
                  <img
                    src={limbSvgs[limb]}
                    alt="SVG"
                    className={
                      "w-20 " + (selectedLimb[index] ? "bg-white" : "")
                    }
                  />
                </a>
              ))}
            </div>
            <button
              type="submit"
              form="gameForm"
              className="border border-black text-black bg-white font-bold text-lg m-1 py-2 px-10 w-2/3 rounded-full hover:bg-black hover:text-white"
            >
              {t("start")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <label className="mx-auto w-2/3 pt-5 pb-2 text-xl font-semibold">
              {t("color_picker_title")}
            </label>
            {colors.map((color, index) => (
              <div
                key={index}
                className="px-10 flex justify-between items-center"
              >
                <input
                  className="w-6 h-6 text-black bg-white border-black rounded-full"
                  type="checkbox"
                  defaultChecked={selected[index]}
                  onChange={() => handleCheck(index, "color")}
                />
                <p>{t(color.name)}</p>
                <div
                  className="w-6 h-6 border-black border rounded-full"
                  style={{ backgroundColor: color.value }}
                ></div>
              </div>
            ))}
            <div className="w-full pt-5">
              <Button
                type="button"
                onClick={() => {
                  if (addColorRef.current) addColorRef.current.showModal();
                }}
                label={t("add_color")}
              />
              <Button
                type="button"
                onClick={() => {
                  if (selected.filter((v) => v == true).length) {
                    setError(null);
                    setNext(true);
                  } else {
                    setError(t("no_colors_error"));
                  }
                }}
                label={t("next")}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewGame;
