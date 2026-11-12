'use client'

import Modal from "@/app/components/shared/Modal"
import { estimatedLoss, Promotion } from "@/app/services/api/promotions"
import { formatAmount } from "@/utils/formatAmount"
import Link from "next/link"
import { useState } from "react"
import { BiLockAlt } from "react-icons/bi"
import { ClosePromotionModal } from "./ClosePromotionModal"

interface Props {
  promotion: Promotion
  onClosed: () => void
}

export const PromotionCard = ({ promotion, onClosed }: Props) => {
  const [showCloseModal, setShowCloseModal] = useState(false)
  const items = promotion.items ?? []
  const unitsLeft = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="w-11/12 flex flex-row p-2 text-sm mt-2 items-center justify-center border border-mp-green/20 rounded shadow hover:bg-mp-soft-dark/5">
      <Link href={`/promotions/${promotion.id}`} className="flex flex-row w-full items-center justify-between gap-2">
        <p className="w-1/12 text-mp-dark">#<span className="text-mp-green">{promotion.id}</span></p>
        <p className="w-4/12 text-mp-blue truncate" title={promotion.promotionName}>{promotion.promotionName}</p>
        <p className="w-2/12 text-mp-dark">Termina: <span className="text-mp-green">{promotion.promotionEndDate}</span></p>
        <p className="w-2/12 text-mp-dark">Artículos: <span className="text-mp-green">{items.length}</span> <span className="text-xs text-mp-soft-dark">({unitsLeft} u.)</span></p>
        <p className="w-2/12 text-mp-dark">Pérdida est.: <span className="text-mp-strong-red">{formatAmount(estimatedLoss(items))}</span></p>
      </Link>
      {promotion.active && (
        <button
          className="ml-2 text-mp-blue hover:text-mp-green"
          title="Cerrar promoción"
          onClick={() => setShowCloseModal(true)}
        >
          <BiLockAlt size={22} />
        </button>
      )}
      {showCloseModal && (
        <Modal onClose={() => setShowCloseModal(false)}>
          <ClosePromotionModal promotion={promotion} onClosed={() => { setShowCloseModal(false); onClosed() }} />
        </Modal>
      )}
    </div>
  )
}
