'use client'

import Layout from "@/app/layouts/Layout"
import Skeleton from "@/app/components/Skeleton"
import Error from "@/app/components/shared/Error"
import { failedRequest, initialStatus, pendingRequest } from "@/app/services"
import { getOrder, Order } from "@/app/services/api/orders"
import { formatAmount } from "@/utils/formatAmount"
import { use, useEffect, useState } from "react"
import { LuFolder } from "react-icons/lu"
import { generateTemplate, ORDER_ITEM_SCHEMA } from "@/utils/xlsx-utils"
import { PurchaseItem } from "../components/PurchaseItem"

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
      <div className="w-10/12 flex flex-col justify-center items-center py-4">
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
        {
          order && order.items.length == 0 &&
          <div className="flex flex-col items-center justify-center mt-6 w-8/12">
            <p className="text-mp-soft-dark">No hay elementos</p>
            <button
              className="text-mp-green underline text-sm p-2 hover:text-mp-light-green"
              onClick={() => generateTemplate(ORDER_ITEM_SCHEMA)}
            >
              Descargar Plantilla
            </button>
            <div className="relative h-48 w-8/12 rounded-lg border-dashed border-2 border-mp-dark/25 bg-mp-dark/5
                            flex justify-center items-center"
            >

              <div className="absolute">

                <div className="flex flex-col items-center">
                  <LuFolder size={60} className="text-mp-dark/25" />
                  <span className="block text-mp-dark/25 font-normal">Agrega tu orden de compra</span>
                </div>
              </div>

              <input
                type="file"
                className="h-full w-full opacity-0" name="" accept=".xlsx"
                onChange={(e) => {
                  const files = e.target.files
                  if (!files || files.length === 0) return

                  //setFile(files[0])

                }}
              />
            </div>
          </div>
        }
        {
          order && order.items.length > 0 &&
          <div className="mt-6">
            <div className="w-full p-1 grid grid-cols-20 gap-1 text-xs rounded bg-gradient-to-r from-mp-green to-mp-blue text-mp-white">
              <p className="col-span-6 overflow-hidden">Artículo</p>
              <p className="col-span-1 overflow-hidden">Sol.</p>
              <p className="col-span-1 overflow-hidden">Surt.</p>
              <p className="col-span-1 overflow-hidden">Faltan</p>
              <p className="col-span-1 overflow-hidden">Precio</p>
              <p className="col-span-2 overflow-hidden">Precio final</p>
              <p className="col-span-2 overflow-hidden">Total</p>
              <p className="col-span-2 overflow-hidden">Tot Real</p>
              <p className="col-span-2 overflow-hidden">Dif.</p>
              <p className="col-span-2 overflow-hidden">Estatus</p>
            </div>
            {
              order?.items.map((item) => <PurchaseItem item={item} key={item.id} />)
            }
          </div>
        }
      </div>
    </Layout>
  )
}