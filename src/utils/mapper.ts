import { XLSXPurchaseItem } from "@/app/hooks/useXLSXOrderItemsStore";
import { uuidv4 } from "./xlsx-utils";

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