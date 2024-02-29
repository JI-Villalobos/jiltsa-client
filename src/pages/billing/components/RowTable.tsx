import { Bill } from "@/services/api/billing"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"

type Props = {
  bill: Bill
}

export default function RowTable({ bill }: Props): JSX.Element {
  return (
    <tr>
      <th className="px-4 py-2">
        <label htmlFor="SelectAll" className="sr-only">Select All</label>

        <input type="checkbox" id="SelectAll" className="size-5 rounded border-mp-soft-dark" disabled={bill.isPaid} checked={bill.isPaid}/>
      </th>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark">{bill.branch}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">{DateFormat(bill.date)}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-blue">{bill.invoice}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-green">{formatAmount(bill.amount)}</td>
      <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">{DateFormat(bill.limitPaymentDate)}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <a
          href="#"
          className="inline-block rounded bg-mp-dark px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark"
        >
          View
        </a>
      </td>
    </tr>
  )
}