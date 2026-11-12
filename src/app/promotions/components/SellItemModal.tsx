'use client'

import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { PromotionItem, sellPromotionItem } from "@/app/services/api/promotions"
import { formatAmount } from "@/utils/formatAmount"
import { useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"

const SUBMIT_ERROR = 'No fue posible registrar la venta, inténtalo más tarde'

interface Props {
  item: PromotionItem
  onSold: (item: PromotionItem) => void
}

export const SellItemModal = ({ item, onSold }: Props) => {
  const [sold, setSold] = useState(1)
  const [status, setStatus] = useState(initialStatus)
  const valid = Number.isInteger(sold) && sold >= 1 && sold <= item.quantity
  const remaining = valid ? item.quantity - sold : item.quantity

  const handleSell = async () => {
    if (!valid) return
    setStatus(pendingRequest)
    await sellPromotionItem(item, sold)
      .then((updated) => {
        setStatus(initialStatus)
        onSold(updated)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, SUBMIT_ERROR))
      })
  }

  return (
    <div className="w-10/12 flex flex-col items-center justify-center pb-4 gap-2">
      <h2 className="text-mp-blue text-lg">Registrar venta</h2>
      <p className="text-sm text-mp-dark text-center">{item.key}{item.description ? ` · ${item.description}` : ''}</p>
      <p className="text-xs text-mp-soft-dark">Precio promoción: {formatAmount(item.promotionPrice)}</p>
      <label htmlFor="sold" className="text-sm text-mp-strong-gray mt-2">Unidades vendidas</label>
      <input
        id="sold"
        type="number"
        min={1}
        max={item.quantity}
        step={1}
        value={sold}
        onChange={(e) => setSold(e.target.valueAsNumber)}
        className="w-32 rounded-lg border border-mp-gray-soft p-2 text-sm text-center shadow-sm"
      />
      {!valid && <p className="text-xs text-mp-error">Ingresa entre 1 y {item.quantity}</p>}
      <div className="grid grid-cols-2 gap-x-4 text-sm mt-2">
        <p className="text-mp-dark">Disponibles</p>
        <p className="text-right text-mp-blue">{item.quantity}</p>
        <p className="text-mp-dark">Quedarán</p>
        <p className="text-right text-mp-green">{remaining}</p>
      </div>
      <button
        className="mt-2 flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-32 disabled:opacity-50"
        onClick={handleSell}
        disabled={!valid || status.onLoading}
      >
        {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Registrar'}
      </button>
      {status.onError && <p className="text-center text-sm text-mp-error">{status.message ?? SUBMIT_ERROR}</p>}
    </div>
  )
}
