import axios from "axios"
import { authOptions, endPoints } from ".."
import { RecordingLossExpiration } from "./expirationLosses"

export interface Promotion {
  id?: number
  promotionName: string
  branchId: number
  /** yyyy-MM-dd. Set by the API to today when omitted on creation. */
  creationDate?: string
  /** yyyy-MM-dd */
  promotionEndDate: string
  active?: boolean
  items?: PromotionItem[]
}

export interface PromotionItem {
  id?: number
  key: string
  description?: string
  quantity: number
  normalPrice: number
  promotionPrice: number
  purchasePrice: number
  promotionId: number
  /** yyyy-MM-dd */
  expirationDate: string
}

export type CreatePromotion = Pick<Promotion, 'promotionName' | 'branchId' | 'promotionEndDate'>
export type CreatePromotionItem = Omit<PromotionItem, 'id'>

/** Loss the API will record when the promotion closes: what is left at purchase price. */
export const estimatedLoss = (items: PromotionItem[] = []): number =>
  items.reduce((acc, item) => acc + item.quantity * item.purchasePrice, 0)

export const createPromotion = async (promotion: CreatePromotion) => {
  const { data } = await axios.post<Promotion>(endPoints.promotions.create, promotion, authOptions())

  return data
}

export const getPromotion = async (promotionId: number) => {
  const { data } = await axios.get<Promotion>(endPoints.promotions.getById(promotionId), authOptions())

  return data
}

/** Active promotions of a branch, soonest to end first, with their items. */
export const getActivePromotions = async (branchId: number) => {
  const { data } = await axios.get<Promotion[]>(endPoints.promotions.getActiveByBranch(branchId), authOptions())

  return data
}

/**
 * Deactivates the promotion and records, for its branch, the expiration loss of the
 * items left (quantity x purchasePrice). The API allows it once per promotion.
 */
export const closePromotion = async (promotionId: number) => {
  const { data } = await axios.post<RecordingLossExpiration>(endPoints.promotions.close(promotionId), null, authOptions())

  return data
}

export const getPromotionItems = async (promotionId: number) => {
  const { data } = await axios.get<PromotionItem[]>(endPoints.promotionItems.getByPromotion(promotionId), authOptions())

  return data
}

export const addPromotionItem = async (item: CreatePromotionItem) => {
  const { data } = await axios.post<PromotionItem>(endPoints.promotionItems.create, item, authOptions())

  return data
}

/** All or nothing, at most 500 items. */
export const addPromotionItems = async (items: CreatePromotionItem[]) => {
  const { data } = await axios.post<PromotionItem[]>(endPoints.promotionItems.createBatch, items, authOptions())

  return data
}

/**
 * The only update this app makes to an item: lowering its quantity as units sell,
 * so the loss recorded at closing is what was actually left.
 */
export const sellPromotionItem = async (item: PromotionItem, soldUnits: number) => {
  if (!Number.isInteger(soldUnits) || soldUnits < 1 || soldUnits > item.quantity) {
    throw new Error(`Las unidades vendidas deben estar entre 1 y ${item.quantity}`)
  }

  const { data } = await axios.put<PromotionItem>(
    endPoints.promotionItems.byId(item.id!),
    { ...item, quantity: item.quantity - soldUnits },
    authOptions()
  )

  return data
}

export const deletePromotionItem = async (itemId: number) => {
  await axios.delete(endPoints.promotionItems.byId(itemId), authOptions())
}
