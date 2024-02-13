export interface Color {
  name: string;
  value: string;
}

export const baseColors: Color[] = [
  { name: "Red", value: "#dc2626" },
  { name: "DarkBlue", value: "#0284c7" },
  { name: "LightBlue", value: "#67e8f9" },
  { name: "Green", value: "#16a34a" },
  { name: "Yellow", value: "#facc15" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Pink", value: "#ec4899" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Orange", value: "#ea580c" },
  { name: "Lime", value: "#a3e635" },
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
  RightArm,
  LeftArm,
  RightLeg,
  LeftLeg,
}

export const limbs : Limb[] = [0,1,2,3];

export const prettyPrint = ["Rigth hand", "Left Hand", "Right foot", "Left foot"]
