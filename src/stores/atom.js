import { atom } from "recoil";

export const projectIdState = atom({
  key: "projectIdState",
  default: "project1",
});

export const selectedDrawerState = atom({
  key: "selectedDrawerState",
  default: 0,
});
