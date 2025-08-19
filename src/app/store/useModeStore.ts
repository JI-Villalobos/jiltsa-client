import { Mode } from "@/services/api/pagination"
import { create } from "zustand"


export type ModeState = {
  mode: Mode
}

export type ModeAction = {
  changeFetchMode: (mode: ModeState['mode']) => void 
}

export const useModeStore = create<ModeState & ModeAction>((set) => ({
  mode: Mode.PENDING,
  changeFetchMode: (mode) => set(() => ({ mode: mode }))
}))

