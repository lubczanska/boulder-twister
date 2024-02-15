import LeftFoot from "./../assets/leftfoot.svg";
import RightFoot from "./../assets/right_foot.svg";
import LeftHand from "./../assets/left_hand.svg";
import RightHand from "./../assets/right_hand.svg";

export interface Color {
  name: string;
  value: string;
}

export const baseColors: Color[] = [
  { name: "red", value: "#dc2626" },
  { name: "dark blue", value: "#0284c7" },
  { name: "light blue", value: "#67e8f9" },
  { name: "green", value: "#16a34a" },
  { name: "yellow", value: "#facc15" },
  { name: "black", value: "#000000" },
  { name: "white", value: "#ffffff" },
  { name: "pink", value: "#ec4899" },
  { name: "purple", value: "#7c3aed" },
  { name: "orange", value: "#ea580c" },
  { name: "lime", value: "#a3e635" },
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

export const limbSvgs = [LeftHand, RightHand, LeftFoot, RightFoot];
