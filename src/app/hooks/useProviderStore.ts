import { create } from "zustand"
import { Provider } from "../services/api/providers"

type State = {
  provider: Provider[]
}

type Action = {
  setProviders: (providers: Provider[]) => void
}

export const useProviderStore = create<State & Action>((set) => ({
  provider: [],
  setProviders: (providers: Provider[]) => set(() => ({ provider: providers }))
}))
