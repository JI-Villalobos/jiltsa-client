'use client'

import { useEffect, useState } from "react"
import Spinner from "./shared/Spinner"
import Cookies from "js-cookie"
import { formatAmount } from "@/utils/formatAmount"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services"
import { getTotalBalance } from "../services/api/branches"
import { useExpenseRegistryStore } from "../store/useExpenseRegistryStore"
import { useWithdrawalRegistryStore } from "../store/useWithdrawalRegistryStore"
import { LuWallet } from "react-icons/lu"
import Modal from "./shared/Modal"
import { CashSortingViewModal } from "../seller-home/components/CashSortingViewModal"

export default function TotalBalanceItem(): JSX.Element {
  const [totals, setTotals] = useState<number>()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [showCashSortingDetails, setShowCashSortingDetails] = useState(false)

  const { updateFlag } = useExpenseRegistryStore()
  const { updateFlag: updateWithdrawalFlag } = useWithdrawalRegistryStore()

  useEffect(() => {
    setStatus(pendingRequest)
    const branchId = Cookies.get('branchId')
    if (branchId) {
      getTotalBalance(parseInt(branchId)).then((result) => {
        setTotals(result.totals)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }

  }, [updateFlag, updateWithdrawalFlag])

  return (
    <div className="flex flex-row  justify-center items-center ml-1 mt-1">
      {
        status.onError
          ? <p>No fue posible obtener el saldo en caja</p>
          : status.onLoading ? <Spinner bgBlank />
            : (
              <>
                <button
                  onClick={() => setShowCashSortingDetails(true)}
                >
                  <LuWallet className="mr-1 text-mp-green" />
                </button>
                <p className="text-sm text-center text-mp-dark mr-1">Saldo en caja:</p>
                {
                  totals &&
                  <input value={formatAmount(totals)} readOnly className="text-sm text-center text-mp-blue font-bold bg-mp-white w-16" />
                }
              </>
            )
      }
      {
        showCashSortingDetails &&
        <Modal onClose={() => setShowCashSortingDetails(false)}>
          <CashSortingViewModal balance={totals} />
        </Modal>
      }
    </div>
  )
}