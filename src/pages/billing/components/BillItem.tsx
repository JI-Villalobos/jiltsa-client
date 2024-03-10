import { Bill } from "@/services/api/billing"
import DateFormat from "@/utils/DateFormat"
import { getBills, setBills } from "@/utils/appStorage"
import { formatAmount } from "@/utils/formatAmount"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  bill: Bill
}

export default function BillItem({ bill }: Props): JSX.Element {
  const [enabled, setEnabled] = useState(true)


  if (!bill) {
    return (
      <ol className="rounded border-s-4 border-mp-error p-4">
        <p className="mt-2 text-sm text-mp-gray-soft
        ">
          Un error causo que no pudieramos mostrarte esta factura
        </p>
      </ol>
    )
  }

  return (
    <ol className="flex flex-row w-8/12 bg-mp-gray-soft rounded h-8 items-center justify-between m-2" >
      <li className="text-xs text-mp-green px-2">{bill.branch}</li>
      <li className="text-xs text-mp-dark px-2">Folio: {bill.invoice}</li>
      <li className="text-xs text-mp-dark px-2">Fecha: {DateFormat(bill.date)}</li>
      <li className="text-xs text-mp-green px-2">Monto: {formatAmount(bill.amount)}</li>
    </ol>
  )
}