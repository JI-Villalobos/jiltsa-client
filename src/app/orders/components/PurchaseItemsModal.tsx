'use client'

import { useXLSXOrderItemsStore } from "@/app/hooks/useXLSXOrderItemsStore"
import { formatAmount } from "@/utils/formatAmount"
import { BiEdit, BiTrash } from "react-icons/bi"


export const PurchaseItemsModal = () => {
  const { items } = useXLSXOrderItemsStore()

  const handleSubmitItems = async () => {

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
              //onClick={() => handleDeleteItem(item.uuid)}
              >
                <BiTrash size={20} />
              </button>
            </div>
          ))
        }
      </div>
      <button className="flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-24 mt-2 mb-2 cursor-pointer">
        Registrar
      </button>
    </div>
  )
}