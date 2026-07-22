import { XLSXPurchaseItem } from "@/app/hooks/useXLSXOrderItemsStore";
import { randomUUID } from "crypto";

export const mapToXLSXPurchaseItem = (row: any[]): XLSXPurchaseItem | undefined => {
  if (row[0] === 'ARTICULO') return undefined

  if (row.length === 5) {
    return {
      uuid: randomUUID.toString(),
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