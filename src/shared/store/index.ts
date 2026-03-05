// shared/store/index.ts
// 전역 UI 상태 Jotai Atom 모음
import { atom } from "jotai";

export const sidebarOpenAtom = atom<boolean>(false);
