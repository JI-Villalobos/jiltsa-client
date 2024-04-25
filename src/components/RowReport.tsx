import { RequestStatus } from "@/services"
import { Accounting } from "@/services/api/accounts"
import { getSeller } from "@/services/api/sellers"
import DateFormat from "@/utils/DateFormat"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { RowData, formatRowData } from "@/utils/AccountingOperations"
import { useRouter } from "next/router"
import { Income } from "@/utils/variables"

type Props = {
  account: Accounting
}

const req: RequestStatus = {
  onLoading: false,
  onSuccess: false,
  onError: false
}

export default function RowReport({ account }: Props): JSX.Element {
  const [seller, setSeller] = useState<string>('')
  const [status, setStatus] = useState<RequestStatus>(req)
  const [rowData, setRowData] = useState<RowData>({
    otherIncomes: '-',
    incomes: '-',
    total: '-',
    expenses: '-'
  })
  const route = useRouter()

  useEffect(() => {
    setRowData(formatRowData(account))
    setStatus({
      ...req,
      onLoading: true
    })
    getSeller(account.sellerId).then((result) => {
      setSeller(result.fullName)
      setStatus({
        ...req,
        onLoading: false
      })
    }).catch(() => {
      setStatus({
        ...req,
        onError: true
      })
    })
  }, [])

  return (
    <tr className="text-center hover:bg-mp-strong-gray hover:cursor-pointer" onClick={() => route.push(`/account-details/${seller}/${account.id}`)}>
      <td className='whitespace-nowrap px-4 py-2 text-mp-dark font-coda'>{DateFormat(account.date!)}</td>
      <td className='whitespace-nowrap px-4 py-2 text-mp-dark font-coda'>
        {status.onLoading ? <Spinner /> : `${seller}`}
      </td>
      <td className='whitespace-nowrap px-4 py-2 text-mp-blue font-coda'>{rowData.otherIncomes}</td>
      <td className='whitespace-nowrap px-4 py-2 text-mp-blue font-coda'>{rowData.incomes}</td>
      <td className='whitespace-nowrap px-4 py-2 text-mp-blue font-coda'>{rowData.total}</td>
      <td className='whitespace-nowrap px-4 py-2 text-mp-blue font-coda'>{rowData.expenses}</td>
    </tr>
  )
}