import { create } from "zustand"

/** A promotion item read from an xlsx, kept in memory until the user confirms the batch. */
export interface XLSXPromotionItem {
  uuid: string
  key: string
  description: string
  quantity: number
  normalPrice: number
  promotionPrice: number
  purchasePrice: number
  /** yyyy-MM-dd, or '' when the cell could not be read as a date */
  expirationDate: string
  /** Why the row cannot be sent as is; undefined when the row is valid */
  error?: string
}

type State = {
  items: XLSXPromotionItem[]
}

type Action = {
  deleteItem: (uuid: string) => void
  setItems: (items: XLSXPromotionItem[]) => void
  clear: () => void
}

export const useXLSXPromotionItemsStore = create<State & Action>((set) => ({
  items: [],
  deleteItem: (uuid: string) => set((state) => ({
    items: state.items.filter((item) => item.uuid !== uuid)
  })),
  setItems: (items: XLSXPromotionItem[]) => set(() => ({ items })),
  clear: () => set(() => ({ items: [] }))
}))
