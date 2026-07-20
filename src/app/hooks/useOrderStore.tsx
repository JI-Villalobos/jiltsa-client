import { create } from "zustand"
import { Order } from "../services/api/orders"

type State = {
  order: Order
}

type Action = {
  setOrder: (order: State['order']) => void
}

export const useOrderStore = create<State & Action>((set) => ({
  order: {
    id: 0,
    branchId: 0,
    creationDate: '',
    estimatedCost: 0.0,
    isOpen: true,
    providerId: 0,
    realCost: 0.0,
    status: 1,
    items: []
  },
  setOrder: (order: Order) => set(() => ({ order: order }))
}))