import { Bill } from "@/services/api/billing"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"
import Link from "next/link"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

type Props = {
  bill: Bill
  bills: Bill[]
  setSelectedBills: Dispatch<SetStateAction<Bill[]>>
}

export default function RowTable({ bill, setSelectedBills, bills }: Props): JSX.Element {
  const [checked, setChecked] = useState(bill.isPaid)

  const handleSelectedBill = () => {
    if (!checked) {
      const updatedList = bills
      if (!bill.isPaid) {
        updatedList.push(bill)
      }
      setSelectedBills(updatedList)
    } else {
      const index = bills.indexOf(bill)
      const b = bills.splice(index, 1)
      setSelectedBills(b)
    }
  }

  return (
    <tr>
      <th className="px-4 py-2">
        <label htmlFor="SelectAll" className="sr-only">Select All</label>

        <input
          type="checkbox"
          id="SelectAll"
          className="size-5 rounded border-mp-soft-dark"
          disabled={bill.isPaid}
          defaultChecked={bill.isPaid}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setChecked(!checked)
            handleSelectedBill()
          }} />
      </th>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark">{bill.branch}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">{DateFormat(bill.date)}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-blue">{bill.invoice}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-green">{formatAmount(bill.amount)}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">{DateFormat(bill.limitPaymentDate)}</td>
      {
        bill.isActive ? (<td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">Pendiente</td>)
        : (<td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">{DateFormat(bill.receptionDate)}</td>)
      }
      <td className="whitespace-nowrap px-4 py-2">
        <Link
          href={`/bill/${bill.id}`}
          className={
            bill.isActive ? 'inline-block rounded bg-mp-dark px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark'
              : 'inline-block rounded bg-mp-green px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-light-green'
          }
        >
          Ver
        </Link>
      </td>
    </tr>
  )
}