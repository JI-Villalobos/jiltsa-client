'use client'

import Layout from "@/app/layouts/Layout"
import Skeleton from "@/app/components/Skeleton"
import Error from "@/app/components/shared/Error"
import { failedRequest, initialStatus, pendingRequest } from "@/app/services"
import { getOrder, Order } from "@/app/services/api/orders"
import { formatAmount } from "@/utils/formatAmount"
import { use, useEffect, useState } from "react"

export default function OrderId({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const [order, setOrder] = useState<Order>()
  const [status, setStatus] = useState(initialStatus)

  const { orderId } = use(params)

  useEffect(() => {
    setStatus(pendingRequest)
    getOrder(parseInt(orderId))
      .then((res) => {
        setOrder(res)
        setStatus(initialStatus)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }, [orderId])

  return (
    <Layout>
      <div className="w-10/12 flex flex-col justify-center items-center py-8">
        {status.onLoading && <Skeleton />}
        {status.onError && <Error />}
        {order && !status.onLoading && !status.onError && (
          <div className="w-full max-w-3xl rounded-2xl border border-mp-green/20 bg-white p-2 shadow-sm">
            <div className="flex items-center justify-between border-b border-mp-green/10 pb-2">
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="text-mp-dark">Orden</p>
                <h2 className="font-semibold text-mp-green">#{order.id}</h2>
              </div>
              <span className="rounded-full bg-mp-green/10 px-3 py-1 text-sm text-mp-green">
                {order.isOpen ? 'Abierta' : 'Cerrada'}
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="text-mp-dark">Proveedor: </p>
                <p className="text-mp-blue">{order.providerId}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="text-mp-dark">Fecha: </p>
                <p className="text-mp-dark">{order.creationDate}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="text-mp-dark">Estimado: </p>
                <p className="text-mp-green">{formatAmount(order.estimatedCost)}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="text-mp-dark">Real: </p>
                <p className="text-mp-green">{formatAmount(order.realCost)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}