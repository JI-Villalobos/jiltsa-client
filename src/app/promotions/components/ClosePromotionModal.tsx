'use client'

import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { RecordingLossExpiration } from "@/app/services/api/expirationLosses"
import { closePromotion, estimatedLoss, Promotion } from "@/app/services/api/promotions"
import { formatAmount } from "@/utils/formatAmount"
import { useState } from "react"
import { LuLoaderCircle, LuTriangleAlert } from "react-icons/lu"

const CLOSE_ERROR = 'No fue posible cerrar la promoción, inténtalo más tarde'

interface Props {
  promotion: Promotion
  /** Called once the API closed the promotion and recorded its loss. */
  onClosed: (loss: RecordingLossExpiration) => void
}

export const ClosePromotionModal = ({ promotion, onClosed }: Props) => {
  const [status, setStatus] = useState(initialStatus)
  const [loss, setLoss] = useState<RecordingLossExpiration>()
  const items = promotion.items ?? []
  const unitsLeft = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleClose = async () => {
    setStatus(pendingRequest)
    await closePromotion(promotion.id!)
      .then((recorded) => {
        setLoss(recorded)
        setStatus(initialStatus)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, CLOSE_ERROR))
      })
  }

  if (loss) {
    return (
      <div className="w-10/12 flex flex-col items-center justify-center pb-4 gap-2 text-center">
        <h2 className="text-mp-green text-lg">Promoción cerrada</h2>
        <p className="text-sm text-mp-dark">Se registró la pérdida por caducidad #{loss.id}</p>
        <p className="text-2xl text-mp-strong-red">{formatAmount(loss.totalLoss ?? 0)}</p>
        <button
          className="mt-2 text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-32"
          onClick={() => onClosed(loss)}
        >
          Aceptar
        </button>
      </div>
    )
  }

  return (
    <div className="w-10/12 flex flex-col items-center justify-center pb-4 gap-2">
      <h2 className="text-mp-blue text-lg">Cerrar promoción</h2>
      <p className="text-sm text-mp-dark text-center">{promotion.promotionName}</p>
      <div className="w-full rounded border-s-4 border-mp-warning bg-mp-warning/40 p-3 text-xs text-mp-dark flex flex-row gap-2">
        <LuTriangleAlert className="shrink-0 text-mp-strong-red" size={18} />
        <p>
          Al cerrar se desactiva la promoción y se registra como pérdida por caducidad el valor
          a precio de compra de los artículos que quedaron. Esta acción no se puede deshacer.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full text-sm mt-2">
        <p className="text-mp-dark">Artículos restantes</p>
        <p className="text-right text-mp-blue">{unitsLeft}</p>
        <p className="text-mp-dark">Pérdida estimada</p>
        <p className="text-right text-mp-strong-red">{formatAmount(estimatedLoss(items))}</p>
      </div>
      <button
        className="mt-2 flex items-center justify-center text-mp-white bg-mp-strong-red rounded p-2 w-40 disabled:opacity-50"
        onClick={handleClose}
        disabled={status.onLoading}
      >
        {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Cerrar y registrar'}
      </button>
      {status.onError && <p className="text-center text-sm text-mp-error">{status.message ?? CLOSE_ERROR}</p>}
    </div>
  )
}
