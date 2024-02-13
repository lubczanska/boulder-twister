import { useRef, useState } from "react";
import { baseColors, Color, Limb, limbs, prettyPrint } from "../types";

interface NewGameProps {
  onSubmit: (colors: Color[], limbs: Limb[]) => void;
  onClose: () => void;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  value: HTMLInputElement;
}
interface AddColorFormElement extends HTMLFormElement {
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
    <div className="w-2/3 mx-auto">
      {/* modal */}
      <dialog id="show_expense_modal" className="modal" ref={addColorRef}>
        <div className="modal-box">
          <form
            id="dialog"
            method="dialog"
            onSubmit={addColor}
            className="flex flex-col gap-1 items-center"
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                if (addColorRef.current) addColorRef.current.close();
              }}
            >
              ✕
            </button>
            <input
              id="name"
              className="input input-bordered"
              placeholder="name"
            />
            <input id="value" type="color" />
            <button className="btn">Add</button>
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
            setError("No limbs selected :(");
          }
        }}
      >
        {error && <div>{error}</div>}
        {next ? (
          <div className="flex flex-col">
            <label className="py-5 flex gap-1">
              Which limbs do you want to use?
            </label>
            {limbs.map((limb, index) => (
              <a
                key={index}
                className=" basis-1/3"
                onClick={() => handleCheck(index, "limb")}
              >
                {selectedLimb[index] ? (
                  <div className="card bg-primary hover:bg-base-300">
                    <div className="card-body">
                      <p>{prettyPrint[limb]}</p>
                    </div>
                  </div>
                ) : (
                  <div className="card hover:bg-base-300">
                    <div className="card-body">
                      <p>{prettyPrint[limb]}</p>
                    </div>
                  </div>
                )}
              </a>
            ))}
            <button
              type="submit"
              form="gameForm"
              className="btn btn-primary my-8"
            >
              START
            </button>
          </div>
        ) : (
          <div className="flex flex-col join join-vertical gap-4">
            <label className="py-10 text-xl">
              What colors can you see on the wall?
            </label>
            {colors.map((color, index) => (
              <div
                key={index}
                className="join-item flex justify-between items-center"
              >
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  defaultChecked={selected[index]}
                  onChange={() => handleCheck(index, "color")}
                />
                <p>
                  {color.name} 
                </p>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color.value }}
                ></div>
              </div>
            ))}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  if (addColorRef.current) addColorRef.current.showModal();
                }}
              >
                Add color
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (selected.filter((v) => v == true).length) {
                    setError(null);
                    setNext(true);
                  } else {
                    setError("No colors selected :(");
                  }
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewGame;
