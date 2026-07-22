import { XLSXPurchaseItem } from "@/app/hooks/useXLSXOrderItemsStore";
import { uuidv4 } from "./xlsx-utils";
import { OrderItem } from "@/app/services/api/orders";

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
