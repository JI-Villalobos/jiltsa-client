'use client'

import { useXLSXPromotionItemsStore } from "@/app/hooks/useXLSXPromotionItemsStore"
import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { addPromotionItems, PromotionItem } from "@/app/services/api/promotions"
import { formatAmount } from "@/utils/formatAmount"
import { promotionItemListMapper } from "@/utils/mapper"
import clsx from "clsx"
import { useState } from "react"
import { BiTrash } from "react-icons/bi"
import { LuLoaderCircle } from "react-icons/lu"

const SUBMIT_ERROR = 'No fue posible registrar los artículos, inténtalo más tarde'
const MAX_BATCH = 500

interface Props {
  promotionId: number
  onSaved: (items: PromotionItem[]) => void
}

export const PromotionItemsPreviewModal = ({ promotionId, onSaved }: Props) => {
  const [status, setStatus] = useState(initialStatus)
  const { items, deleteItem, clear } = useXLSXPromotionItemsStore()
  const invalid = items.filter((item) => item.error).length
  const canSubmit = items.length > 0 && invalid === 0 && items.length <= MAX_BATCH && !status.onLoading

  const handleSubmit = async () => {
    setStatus(pendingRequest)
    await addPromotionItems(promotionItemListMapper(items, promotionId))
      .then((saved) => {
        setStatus(initialStatus)
        clear()
        onSaved(saved)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, SUBMIT_ERROR))
      })
  }

  return (
    <div className="flex flex-col items-center w-full p-1">
      <div className="w-full p-1 grid grid-cols-16 gap-1 text-xs rounded bg-gradient-to-r from-mp-green to-mp-blue text-mp-white">
        <p className="col-span-2">Clave</p>
        <p className="col-span-4">Descripción</p>
        <p className="col-span-1 text-center">Cant.</p>
        <p className="col-span-2">Normal</p>
        <p className="col-span-2">Promo</p>
        <p className="col-span-2">Compra</p>
        <p className="col-span-2">Caducidad</p>
      </div>
      <div className="w-full flex flex-col items-center max-h-96 overflow-y-auto overscroll-contain scroll-smooth">
        {items.map((item) => (
          <div
            key={item.uuid}
            title={item.error}
            className={clsx(
              "w-full p-1 grid grid-cols-16 gap-1 text-xs rounded shadow items-center",
              item.error ? "bg-mp-soft-red text-mp-strong-red" : "text-mp-dark"
            )}
          >
            <p className="col-span-2 truncate">{item.key || '—'}</p>
            <p className="col-span-4 truncate">{item.description}</p>
            <p className="col-span-1 text-center">{Number.isNaN(item.quantity) ? '—' : item.quantity}</p>
            <p className="col-span-2">{Number.isNaN(item.normalPrice) ? '—' : formatAmount(item.normalPrice)}</p>
            <p className="col-span-2">{Number.isNaN(item.promotionPrice) ? '—' : formatAmount(item.promotionPrice)}</p>
            <p className="col-span-2">{Number.isNaN(item.purchasePrice) ? '—' : formatAmount(item.purchasePrice)}</p>
            <p className="col-span-2">{item.expirationDate || '—'}</p>
            <button className="col-span-1 text-mp-strong-red" onClick={() => deleteItem(item.uuid)} title="Quitar">
              <BiTrash size={18} />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-mp-soft-dark mt-2">
        {items.length} artículo{items.length === 1 ? '' : 's'}
        {invalid > 0 && <span className="text-mp-strong-red"> · {invalid} con errores: quítalos o corrige el archivo</span>}
        {items.length > MAX_BATCH && <span className="text-mp-strong-red"> · máximo {MAX_BATCH} por archivo</span>}
      </p>
      <button
        className="flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-24 mt-2 mb-2 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Registrar'}
      </button>
      {status.onError && <p className="text-center text-sm text-mp-error mb-2">{status.message ?? SUBMIT_ERROR}</p>}
    </div>
  )
}
