'use client'

import { useEffect, useState } from "react"
import Spinner from "./shared/Spinner"
import Cookies from "js-cookie"
import { formatAmount } from "@/utils/formatAmount"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services"
import { getTotalBalance } from "../services/api/branches"

export default function TotalBalanceItem(): JSX.Element {
  const [totals, setTotals] = useState<string>()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)

  useEffect(() => {
    setStatus(pendingRequest)
    const branchId = Cookies.get('branchId')
    if (branchId) {
      getTotalBalance(parseInt(branchId)).then((result) => {
        setTotals(formatAmount(result.totals))
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }

  }, [])

  return (
    <div className="flex flex-row p-4 border border-mp-strong-gray rounded justify-center items-center m-6">
      {
        status.onError 
          ? <p>No fue posible obtener el saldo en caja</p>
          : status.onLoading ? <Spinner bgBlank/>  
          : (
              <>
                <p className="text-sm text-center text-mp-dark">Saldo en caja:</p>
                <input value={totals} readOnly className="text-sm text-center text-mp-blue font-bold"/>
              </>
            )
      }
    </div>
  )
}