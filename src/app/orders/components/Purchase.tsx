'use client'

import { Order } from "@/app/services/api/orders"
import { Provider } from "@/app/services/api/providers"
import { formatAmount } from "@/utils/formatAmount"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiCoinStack } from "react-icons/bi"

interface Props {
  order: Order
}

export const Purchase = ({ order }: Props) => {
  const [provider, setProvider] = useState<Provider>()

  useEffect(() => {

  }, [])

  return (
    <div
      className="w-8/12 flex flex-row p-2 text-sm mt-2 items-center justify-center border border-mp-green/20 rounded 
                        border-opacity-20 shadow hover:cursor-pointer hover:bg-mp-soft-dark/5">
      <Link href={`/purchases/${order.id}`} className="flex flex-row w-full justify-between">
        <p className="w-1/12 text-mp-dark">Orden: <span className="text-mp-green">{order.id}</span></p>
        <p className="w-2/12">Proveedor: <span className="text-mp-blue">{/*provider.name*/}</span></p>
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

    </div>
  )
}

//<DeleteOrderButton orderId={order.id} />