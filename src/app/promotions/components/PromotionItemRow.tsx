'use client'

import Modal from "@/app/components/shared/Modal"
import { PromotionItem } from "@/app/services/api/promotions"
import { formatAmount } from "@/utils/formatAmount"
import clsx from "clsx"
import { useState } from "react"
import { LuPackageMinus } from "react-icons/lu"
import { SellItemModal } from "./SellItemModal"

interface Props {
  item: PromotionItem
  active: boolean
  photos: number
  onSold: (item: PromotionItem) => void
}

export const PromotionItemRow = ({ item, active, photos, onSold }: Props) => {
  const [showSellModal, setShowSellModal] = useState(false)

  return (
    <div className="w-full p-1 grid grid-cols-20 gap-1 text-xs rounded shadow text-mp-dark items-center">
      <p className="col-span-2 truncate" title={item.key}>{item.key}</p>
      <p className="col-span-5 truncate" title={item.description}>{item.description ?? '—'}</p>
      <p className={clsx("col-span-1 text-center", { "text-mp-strong-red": item.quantity === 0 })}>{item.quantity}</p>
      <p className="col-span-2">{formatAmount(item.normalPrice)}</p>
      <p className="col-span-2 text-mp-green">{formatAmount(item.promotionPrice)}</p>
      <p className="col-span-2">{formatAmount(item.purchasePrice)}</p>
      <p className="col-span-2">{item.expirationDate}</p>
      <p className="col-span-2 text-mp-strong-red">{formatAmount(item.quantity * item.purchasePrice)}</p>
      <p className={clsx("col-span-1 text-center", photos === 0 ? "text-mp-soft-dark/50" : "text-mp-blue")}>{photos}</p>
      <div className="col-span-1 flex justify-center">
        {active && item.quantity > 0 && (
          <button className="text-mp-blue hover:text-mp-green" title="Registrar venta" onClick={() => setShowSellModal(true)}>
            <LuPackageMinus size={18} />
          </button>
        )}
      </div>
      {showSellModal && (
        <Modal onClose={() => setShowSellModal(false)}>
          <SellItemModal item={item} onSold={(updated) => { setShowSellModal(false); onSold(updated) }} />
        </Modal>
      )}
    </div>
  )
}
