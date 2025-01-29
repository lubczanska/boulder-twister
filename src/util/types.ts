import LeftFoot from "../components/LeftFoot.tsx";
import RightFoot from "../components/RightFoot.tsx";
import LeftHand from "../components/LeftHand.tsx";
import RightHand from "../components/RightHand.tsx";

export interface Color {
  name: string;
  value: string;
}

export const baseColors: Color[] = [
  { name: "red", value: "#ff3838" },
  { name: "dark blue", value: "#5959ff" },
  { name: "light blue", value: "#67e8f9" },
  { name: "green", value: "#2ae881" },
  { name: "yellow", value: "#ffe601" },
  { name: "black", value: "#11111b" },
  { name: "white", value: "#e8e8e8" },
  { name: "pink", value: "#ff87ff" },
  { name: "purple", value: "#9563ff" },
  { name: "orange", value: "#ff8f40" },
  { name: "lime", value: "#beff6e" },
];

export interface GameInput {
  colors: Color[];
  limbs: Limb[];
}

export interface Game {
  colors: Color[];
  limbs: Limb[];
  highscore: number;
}

export enum Limb {
  LeftArm,
  RightArm,
  LeftLeg,
  RightLeg,
}

export enum Language {
  en, pl
}
export const limbs: Limb[] = [0, 1, 2, 3];

export const limbSvgs = [LeftHand, RightHand, LeftFoot, RightFoot];export const prettyPrint = [
  "left_hand",
  "right_hand",
  "left_foot",
  "right_foot",
];

