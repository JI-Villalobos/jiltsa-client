'use client'

import DateFormat from "@/utils/DateFormat"
import { useEffect, useState } from "react"
import Spinner from "./shared/Spinner"
import { RowData, formatRowData } from "@/utils/AccountingOperations"
import { Accounting } from "../services/api/accounts"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services"
import { getSeller } from "../services/api/sellers"
import { useRouter } from "next/navigation"
import Modal from "./shared/Modal"
import { AccountDetailModal } from "./shared/AccountDetailModal"

type Props = {
  account: Accounting
}

export default function RowReport({ account }: Props): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  const [seller, setSeller] = useState<string>('')
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [rowData, setRowData] = useState<RowData>({
    otherIncomes: '-',
    incomes: '-',
    total: '-',
    expenses: '-'
  })
  const route = useRouter()

  useEffect(() => {
    setRowData(formatRowData(account))
    setStatus(pendingRequest)
    getSeller(account.sellerId).then((result) => {
      setSeller(result.fullName)
      setStatus(successfullRequest)
    }).catch(() => {
      setStatus(failedRequest)
    })
  }, [])

  return (
    <>
      <tr className="text-center hover:bg-mp-strong-gray hover:cursor-pointer" onClick={() => setShowModal(true)}>
        <td className='whitespace-nowrap px-4 py-2 text-mp-soft-dark text-sm'>{DateFormat(account.date!)}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-dark text-sm'>
          {status.onLoading ? <Spinner /> : `${seller}`}
        </td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-sm'>{rowData.otherIncomes}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-sm'>{rowData.incomes}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-green text-sm'>{rowData.total}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-sm'>{rowData.expenses}</td>
      </tr>
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <AccountDetailModal accounting={account} seller={seller}/>
        </Modal>
      }
    </>
  )
}