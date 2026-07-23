'use client'

import { useXLSXOrderItemsStore } from "@/app/hooks/useXLSXOrderItemsStore"
import { failedRequest, initialStatus, pendingRequest } from "@/app/services"
import { Order, saveItems, updateOrder } from "@/app/services/api/orders"
import { formatAmount } from "@/utils/formatAmount"
import { orderItemListMapper } from "@/utils/mapper"
import { useState } from "react"
import { BiTrash } from "react-icons/bi"
import { LuLoaderCircle } from "react-icons/lu"

interface Props {
  order: Order
}

export const PurchaseItemsModal = ({ order }: Props) => {
  const [status, setStatus] = useState(initialStatus)
  const { items, deleteItem, setTotal } = useXLSXOrderItemsStore()

  const handleSubmitItems = async () => {
    setStatus(pendingRequest)
    const updatedTotal = items.reduce((acc, current) => acc + current.total, 0)
    await updateOrder({ ...order, estimatedCost: updatedTotal })

    const orderItems = orderItemListMapper(items, order.id!)
    await saveItems(orderItems)
      .then(() => {
        window.location.reload()
        setStatus(initialStatus)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }

  const handleDeleteItem = (uuid: string) => {
    deleteItem(uuid)
    setTotal()
  }

  return (
    <div className="flex flex-col items-center w-full p-1">
      <div className="w-full p-1 grid grid-cols-16 gap-1 text-xs rounded bg-gradient-to-r from-mp-green to-mp-blue text-mp-white">
        <p className="col-span-6">Artículo</p>
        <p className="col-span-2">Solicitado</p>
        <p className="col-span-2">Precio</p>
        <p className="col-span-2">Total</p>
        <p className="col-span-2">Tipo</p>
      </div>
      <div className="w-full flex flex-col items-center h-96 overflow-y-auto hover:overflow-y-scroll overscroll-contain scroll-smooth">
        {
          items.map((item) => (
            <div className="w-full p-1 grid grid-cols-16 gap-1 text-xs rounded shadow text-mp-dark items-center" key={item.uuid}>
              <p className="col-span-6">{item.item}</p>
              <p className="col-span-2 text-center">{item.requested}</p>
              <p className="col-span-2 ">{formatAmount(item.price)}</p>
              <p className="col-span-2">{formatAmount(item.total)}</p>
              <p className="col-span-2">{item.itemType}</p>
              <button
                className="col-span-1  text-mp-strong-red"
                onClick={() => handleDeleteItem(item.uuid)}
              >
                <BiTrash size={20} />
              </button>
            </div>
          ))
        }
      </div>
      <button
        className="flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-24 mt-2 mb-2 cursor-pointer"
        onClick={() => handleSubmitItems()}
      >
        {
          status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Registrar'
        }
      </button>
    </div>
  )
}