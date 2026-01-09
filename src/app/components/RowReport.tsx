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
import { LuBadgeCheck } from "react-icons/lu"
import clsx from "clsx"


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
      <tr
        className={clsx(
          'text-center hover:bg-mp-strong-gray hover:cursor-pointer',
          {
            'bg-mp-white': account.id % 2 == 0
          }
        )}
        onClick={() => setShowModal(true)}
      >
        <td className='whitespace-nowrap px-4 py-2 text-mp-soft-dark text-xs'>{DateFormat(account.date!)}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-dark text-xs'>
          {status.onLoading ? <Spinner /> : `${seller}`}
        </td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-xs'>{rowData.otherIncomes}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-xs'>{rowData.incomes}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-green text-xs'>{rowData.total}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-xs'>{rowData.expenses}</td>
        <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-xs'><LuBadgeCheck className="text-mp-green ml-4" /></td>
      </tr>
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <AccountDetailModal accounting={account} seller={seller} />
        </Modal>
      }
    </>
  )
}