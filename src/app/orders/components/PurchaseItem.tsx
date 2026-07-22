'use client'

import { OrderItem } from "@/app/services/api/orders"
import { formatAmount } from "@/utils/formatAmount"
import clsx from "clsx"
import { BiAlarm, BiEdit, BiSolidCheckCircle } from "react-icons/bi"

interface Props {
  item: OrderItem
}

export const PurchaseItem = ({ item }: Props) => {
  const left = item.requested - item.stocked

  const diff = () => {
    if (item.total === 0) {
      return 0
    }
    return item.total - item.budgeted
  }


  return (
    <div className="w-full p-1 grid grid-cols-20 gap-1 text-xs rounded shadow text-mp-dark items-center">
      <p className="col-span-6 overflow-hidden">{item.item}</p>
      <p className="col-span-1 overflow-hidden">{item.requested}</p>
      <p className="col-span-1 overflow-hidden">{item.stocked}</p>
      <p className={clsx(
        "col-span-1 overflow-hidden",
        {
          "text-red-600": left > 0
        }
      )}>
        {left < 0 ? 0 : left}
      </p>
      <p className="col-span-1 overflow-hidden">{formatAmount(item.price)}</p>
      <p className="col-span-2 overflow-hidden">{formatAmount(item.finalPrice)}</p>
      <p className="col-span-2 overflow-hidden">{formatAmount(item.budgeted)}</p>
      <p className="col-span-2 overflow-hidden">{formatAmount(item.total)}</p>
      <p className={clsx(
        "col-span-2 overflow-hidden",
        {
          "text-mp-green": diff() < 0,
          "text-mp-strong-red": diff() > 0
        }
      )}>{formatAmount(diff())}</p>
      <div className="col-span-1 overflow-hidden">
        {
          item.status == 2 ?
            <div className="flex flex-row text-mp-green">
              <BiSolidCheckCircle size={20} />
            </div>
            : item.status == 3 ?
              <div className="flex flex-row">
                <div className="flex flex-row  text-mp-green">
                  <BiSolidCheckCircle size={20} />
                </div>
                <div className="flex flex-row  text-mp-blue">
                  <BiSolidCheckCircle size={20} />
                </div>
              </div>
              :
              <div className="flex flex-row text-mp-soft-dark/25">
                <BiAlarm size={20} />
              </div>
        }
      </div>

      {/*
       <button
      //onClick={() => setShowModal(true)}
      >
        <BiEdit size={20} />
      </button>
        showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSupplyItemForm item={item} setShowModal={setShowModal} />
        </Modal>
      */}
    </div>
  )
}