import { Bill } from "@/services/api/billing"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  bill: Bill
  bills: Bill[]
  setSelectedBills: Dispatch<SetStateAction<Bill[]>>
  selectedAmount: number
  setSelectedAmount: Dispatch<SetStateAction<number>>
}

const DISABLED = 1
const ENABLED = 2

export default function RowTable({ bill, setSelectedBills, bills, setSelectedAmount, selectedAmount }: Props): JSX.Element {
  const [action, setAction] = useState(DISABLED)

  
  const selectBill = () => {
    if (action == DISABLED) {
      bills.push(bill)
      setAction(ENABLED)
      setSelectedAmount(selectedAmount + bill.amount)
    } else {
      const index = bills.indexOf(bill)
      bills.splice(index, 1)
      setAction(DISABLED)
      setSelectedAmount(selectedAmount - bill.amount)
    }
    setSelectedBills(bills)
  }

  return (
    <tr className="">
      {
        bill.isPaid ? (
          <td className="px-2 py-1 xl:py-2">
            <div className="w-4 h-4 rounded bg-mp-light-green"></div>
          </td>)
          : (<td className="py-1">
            <button 
              type="button" 
              disabled={bill.isPaid} 
              className={
              action == 1 ? 'w-4 h-4 border border-mp-dark rounded'
                : 'w-4 h-4 bg-mp-blue rounded'
              }
              onClick={selectBill}
            ></button>
          </td>)
      }
      <td className="whitespace-nowrap px-2 py-1 xl:py-2 text-xs font-medium text-mp-soft-dark">{bill.branch}</td>
      <td className="whitespace-nowrap px-2 py-1 xl:py-2 text-xs text-mp-soft-dark">{DateFormat(bill.date)}</td>
      <td className="whitespace-nowrap px-2 py-1 xl:py-2 text-xs text-mp-blue">{bill.invoice}</td>
      <td className="whitespace-nowrap px-2 py-1 xl:py-2 text-xs text-mp-green">{formatAmount(bill.amount)}</td>
      <td className="whitespace-nowrap px-2 py-1 xl:py-2 text-xs text-mp-soft-dark">{DateFormat(bill.limitPaymentDate)}</td>
      {
        bill.isActive ? (<td className="whitespace-nowrap px-2 py-1 text-mp-soft-dark">Pendiente</td>)
          : (<td className="whitespace-nowrap px-2 py-1 xl:py- text-xs text-mp-soft-dark">{DateFormat(bill.receptionDate)}</td>)
      }
      <td className="whitespace-nowrap px-2 py-1 xl:py-2">
        <Link
          href={`/bill/${bill.id}`}
          className={
            bill.isActive ? 'inline-block rounded bg-mp-dark px-2 py-1 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark'
              : 'inline-block rounded bg-mp-green px-2 py-1 text-xs font-medium text-mp-gray-soft hover:bg-mp-light-green'
          }
        >
          Ver
        </Link>
      </td>
    </tr>
  )
}
