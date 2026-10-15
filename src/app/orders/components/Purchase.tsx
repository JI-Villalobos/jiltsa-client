'use client'

import Modal from "@/app/components/shared/Modal"
import { Order } from "@/app/services/api/orders"
import { useProviderStore } from "@/app/hooks/useProviderStore"
import { formatAmount } from "@/utils/formatAmount"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { BiCoinStack, BiLockAlt } from "react-icons/bi"
import { CloseOrderModal } from "./CloseOrderModal"

interface Props {
  order: Order
}

export const Purchase = ({ order }: Props) => {
  const { provider: providers } = useProviderStore()
  const provider = providers.find((item) => item.id === order.providerId)
  const [showCloseModal, setShowCloseModal] = useState(false)

  return (
    <div
      className="w-11/12 flex flex-row p-2 text-sm mt-2 items-center justify-center border border-mp-green/20 rounded 
                        border-opacity-20 shadow hover:cursor-pointer hover:bg-mp-soft-dark/5">
      <Link href={`/orders/${order.id}`} className="flex flex-row w-full justify-between">
        <p className="w-1/12 text-mp-dark">Orden: <span className="text-mp-green">{order.id}</span></p>
        <p className="w-4/12"><span className="text-mp-blue">{provider?.name ?? "-"}</span></p>
        <p className="w-2/12 text-mp-green">{order.creationDate}</p>
        <p className="w-2/12 text-mp-dark">Estimado: <span className="text-mp-green">{formatAmount(order.estimatedCost)}</span></p>
        <p className="w-2/12 text-mp-dark">Real: <span className="text-mp-green">{formatAmount(order.realCost)}</span></p>
        <div className={clsx(
          'w-1/12 flex justify-center',
          {
            'text-mp-dark': order.status === 1,
            'text-mp-green': order.status === 2,
            'text-mp-blue': order.status === 3
          }
        )}>
          <BiCoinStack size={25} />
        </div>
      </Link>
      {
        order.isOpen &&
        <button
          className="ml-2 text-mp-blue hover:text-mp-green"
          title="Cerrar orden"
          onClick={() => setShowCloseModal(true)}
        >
          <BiLockAlt size={22} />
        </button>
      }
      {
        showCloseModal &&
        <Modal onClose={() => setShowCloseModal(false)}>
          <CloseOrderModal order={order} />
        </Modal>
      }
    </div>
  )
}

//<DeleteOrderButton orderId={order.id} />