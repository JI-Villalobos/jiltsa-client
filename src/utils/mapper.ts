import { XLSXPurchaseItem } from "@/app/hooks/useXLSXOrderItemsStore";
import { XLSXPromotionItem } from "@/app/hooks/useXLSXPromotionItemsStore";
import { cellToISODate, PROMOTION_ITEM_HEADERS, uuidv4 } from "./xlsx-utils";
import { OrderItem } from "@/app/services/api/orders";
import { CreatePromotionItem } from "@/app/services/api/promotions";

export const mapToXLSXPurchaseItem = (row: any[]): XLSXPurchaseItem | undefined => {
  if (row[0] === 'ARTICULO') return undefined

  const uuid = uuidv4()

  if (row.length === 5) {
    return {
      uuid: uuid,
      item: row[0],
      requested: row[1],
      price: row[2],
      total: row[3],
      itemType: row[4]
    }
  }
}

export const mapPurchaseItems = (data: any[][]): XLSXPurchaseItem[] => {
  return data.map(d => mapToXLSXPurchaseItem(d)).filter((e): e is XLSXPurchaseItem => e != undefined)
}

const toOrderItem = (purchaseItem: XLSXPurchaseItem, orderId: number,) => {
  const orderItem: OrderItem = {
    orderId: orderId,
    item: purchaseItem.item,
    requested: purchaseItem.requested,
    price: purchaseItem.price,
    budgeted: purchaseItem.total,
    itemType: purchaseItem.itemType,
    stocked: 0,
    finalPrice: 0,
    total: 0,
    status: 1
  }

  return orderItem
}

export const orderItemListMapper = (items: XLSXPurchaseItem[], orderId: number,) => {
  let orderItems: OrderItem[] = []

  items.forEach((item) => orderItems.push(toOrderItem(item, orderId)))

  return orderItems;
}

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number(value.replace(/[$,\s]/g, ''))
  return NaN
}

/** Validates one xlsx row of the promotion template. Returns the reason it cannot be sent, if any. */
const promotionRowError = (item: XLSXPromotionItem): string | undefined => {
  if (!item.key) return 'Falta la clave'
  if (!Number.isInteger(item.quantity) || item.quantity < 0) return 'Cantidad inválida'
  if ([item.normalPrice, item.promotionPrice, item.purchasePrice].some((p) => Number.isNaN(p) || p < 0)) return 'Precio inválido'
  if (!item.expirationDate) return 'Caducidad inválida (usa AAAA-MM-DD)'
  return undefined
}

export const mapToXLSXPromotionItem = (row: any[]): XLSXPromotionItem | undefined => {
  if (row.length === 0 || row[0] === PROMOTION_ITEM_HEADERS[0]) return undefined
  // Skip rows that are completely empty (trailing rows in the sheet)
  if (row.every((cell) => cell === undefined || cell === null || String(cell).trim() === '')) return undefined

  const item: XLSXPromotionItem = {
    uuid: uuidv4(),
    key: String(row[0] ?? '').trim(),
    description: String(row[1] ?? '').trim(),
    quantity: toNumber(row[2]),
    normalPrice: toNumber(row[3]),
    promotionPrice: toNumber(row[4]),
    purchasePrice: toNumber(row[5]),
    expirationDate: cellToISODate(row[6]) ?? ''
  }

  return { ...item, error: promotionRowError(item) }
}

export const mapPromotionItems = (data: any[][]): XLSXPromotionItem[] =>
  data.map(mapToXLSXPromotionItem).filter((e): e is XLSXPromotionItem => e !== undefined)

export const promotionItemListMapper = (items: XLSXPromotionItem[], promotionId: number): CreatePromotionItem[] =>
  items.map((item) => ({
    promotionId,
    key: item.key,
    description: item.description || undefined,
    quantity: item.quantity,
    normalPrice: item.normalPrice,
    promotionPrice: item.promotionPrice,
    purchasePrice: item.purchasePrice,
    expirationDate: item.expirationDate
  }))
