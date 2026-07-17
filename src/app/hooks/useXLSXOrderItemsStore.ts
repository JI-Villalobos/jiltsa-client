import { create } from "zustand"

export interface XLSXPurchaseItem {
  uuid: string
  item: string
  requested: number
  price: number
  total: number
  itemType: string
}

type State = {
  items: XLSXPurchaseItem[]
  total: number
}

type Action = {
  updateItem: (updatedItem: XLSXPurchaseItem) => void
  deleteItem: (uuid: string) => void
  addItem: (item: XLSXPurchaseItem) => void
  setItems: (items: XLSXPurchaseItem[]) => void
  setTotal: () => void
}

export const useXLSXOrderItemsStore = create<State & Action>((set) => ({
  items: [],
  total: 0,
  updateItem: (updateItem: XLSXPurchaseItem) => set((state) => ({
    items: state.items.map((item) => item.uuid === updateItem.uuid ? updateItem : item)
  })),
  deleteItem: (uuid: string) => set((state) => ({
    items: state.items.filter((item) => item.uuid != uuid)
  })),
  addItem: (item: XLSXPurchaseItem) => set((state) => ({
    items: [...state.items, item]
  })),
  setItems: (items: XLSXPurchaseItem[]) => set(() => ({ items: items })),
  setTotal: () => set((state) => ({
    total: state.items.reduce((acc, current) => acc + current.total, 0)
  }))
}))