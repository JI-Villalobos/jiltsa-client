import { create } from "zustand"
import { CheckList } from "../services/api/checklist"

type State = {
  checkList: CheckList | undefined
}

type Action = {
  setCheckList: (checkList: CheckList) => void
}

export const useCheckListStore = create<State & Action>((set) => ({
  checkList: undefined,
  setCheckList: (checkList: CheckList) => set(() => ({ checkList }))
}))